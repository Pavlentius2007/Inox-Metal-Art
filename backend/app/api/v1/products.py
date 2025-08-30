from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import json
import os
from datetime import datetime

from app.core.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate, Product as ProductSchema, ProductList
from app.core.config import settings

router = APIRouter()

# Создаем папку для загрузок, если её нет
UPLOAD_DIR = "uploads/products"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=ProductList)
def get_products(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Получить список продуктов с фильтрацией"""
    query = db.query(Product)
    
    if category:
        query = query.filter(Product.category == category)
    if status:
        query = query.filter(Product.status == status)
    
    total = query.count()
    products = query.offset(skip).limit(limit).all()
    
    return ProductList(
        products=products,
        total=total,
        page=skip // limit + 1,
        size=limit
    )

@router.get("/{product_id}", response_model=ProductSchema)
def get_product(product_id: int, db: Session = Depends(get_db)):
    """Получить продукт по ID"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Продукт не найден"
        )
    return product

@router.post("/", response_model=ProductSchema, status_code=status.HTTP_201_CREATED)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    """Создать новый продукт"""
    # Преобразуем features в JSON строку
    features_json = json.dumps(product.features) if product.features else None
    specifications_json = json.dumps(product.specifications.dict()) if product.specifications else None
    detailed_json = json.dumps(product.detailed.dict()) if product.detailed else None
    images_json = json.dumps(product.images) if product.images else None
    
    db_product = Product(
        name=product.name,
        category=product.category,
        description=product.description,
        features=features_json,
        image_path=product.image_path,
        images=images_json,
        specifications=specifications_json,
        detailed=detailed_json,
        price=product.price,
        status=product.status
    )
    
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    return db_product

@router.put("/{product_id}", response_model=ProductSchema)
def update_product(
    product_id: int,
    product_update: ProductUpdate,
    db: Session = Depends(get_db)
):
    """Обновить продукт"""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Продукт не найден"
        )
    
    update_data = product_update.dict(exclude_unset=True)
    
    # Обрабатываем JSON поля отдельно
    if "features" in update_data:
        update_data["features"] = json.dumps(update_data["features"])
    if "specifications" in update_data:
        update_data["specifications"] = json.dumps(update_data["specifications"].dict())
    if "detailed" in update_data:
        update_data["detailed"] = json.dumps(update_data["detailed"].dict())
    if "images" in update_data:
        update_data["images"] = json.dumps(update_data["images"])
    
    for field, value in update_data.items():
        setattr(db_product, field, value)
    
    db_product.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_product)
    
    return db_product

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, db: Session = Depends(get_db)):
    """Удалить продукт"""
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Продукт не найден"
        )
    
    # Удаляем изображения, если они есть
    if db_product.image_path and os.path.exists(db_product.image_path):
        try:
            os.remove(db_product.image_path)
        except OSError:
            pass  # Игнорируем ошибки при удалении файла
    
    if db_product.images:
        try:
            images = json.loads(db_product.images)
            for image_path in images:
                if os.path.exists(image_path):
                    try:
                        os.remove(image_path)
                    except OSError:
                        pass
        except (json.JSONDecodeError, TypeError):
            pass
    
    db.delete(db_product)
    db.commit()

@router.post("/upload-image")
async def upload_product_image(file: UploadFile = File(...)):
    """Загрузить изображение для продукта"""
    # Проверяем тип файла
    if not file.content_type.startswith('image/'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Файл должен быть изображением"
        )
    
    # Проверяем размер файла (максимум 10MB)
    if file.size and file.size > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Размер файла не должен превышать 10MB"
        )
    
    # Генерируем уникальное имя файла
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"product_{timestamp}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    # Сохраняем файл
    try:
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Ошибка при сохранении файла: {str(e)}"
        )
    
    return {"file_path": file_path, "filename": filename, "url": f"/uploads/products/{filename}"}

@router.post("/upload-multiple-images")
async def upload_multiple_product_images(files: List[UploadFile] = File(...)):
    """Загрузить несколько изображений для продукта"""
    uploaded_files = []
    
    for file in files:
        # Проверяем тип файла
        if not file.content_type.startswith('image/'):
            continue  # Пропускаем не-изображения
        
        # Проверяем размер файла (максимум 10MB)
        if file.size and file.size > 10 * 1024 * 1024:
            continue  # Пропускаем слишком большие файлы
        
        # Генерируем уникальное имя файла
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"product_{timestamp}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        # Сохраняем файл
        try:
            with open(file_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)
            
            uploaded_files.append({
                "file_path": file_path,
                "filename": filename,
                "url": f"/uploads/products/{filename}"
            })
        except Exception as e:
            continue  # Пропускаем файлы с ошибками
    
    return {"uploaded_files": uploaded_files, "count": len(uploaded_files)}

@router.get("/categories/list")
def get_product_categories(db: Session = Depends(get_db)):
    """Получить список всех категорий продуктов"""
    categories = db.query(Product.category).distinct().all()
    return [category[0] for category in categories]

