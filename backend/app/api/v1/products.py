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
from app.api.v1.auth import get_current_user
from app.models.user import User

router = APIRouter()

# Создаем папку для загрузок, если её нет
UPLOAD_DIR = "uploads/products"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=ProductList)
async def get_products(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    # current_user: User = Depends(get_current_user)  # Temporarily disabled
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
async def get_product(product_id: int, db: Session = Depends(get_db)):
    """Получить продукт по ID"""
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Продукт не найден"
        )
    return product

@router.post("/", response_model=ProductSchema, status_code=status.HTTP_201_CREATED)
async def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    # current_user: User = Depends(get_current_user)  # Temporarily disabled
):
    """Создать новый продукт"""
    # Преобразуем features в JSON строку
    features_json = json.dumps(product.features) if product.features else None
    specifications_json = json.dumps(product.specifications.dict()) if product.specifications else None
    detailed_json = json.dumps(product.detailed.dict()) if product.detailed else None
    images_json = json.dumps(product.images) if product.images else None
    videos_json = json.dumps(product.videos) if product.videos else None
    
    db_product = Product(
        name=product.name,
        category=product.category,
        description=product.description,
        features=features_json,
        image_path=product.image_path,
        images=images_json,
        videos=videos_json,
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
async def update_product(
    product_id: int,
    product_update: ProductUpdate,
    db: Session = Depends(get_db),
    # current_user: User = Depends(get_current_user)  # Temporarily disabled
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
async def delete_product(
    product_id: int, 
    db: Session = Depends(get_db),
    # current_user: User = Depends(get_current_user)  # Temporarily disabled
):
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
async def upload_product_image(
    file: UploadFile = File(...),
    # current_user: User = Depends(get_current_user)  # Temporarily disabled
):
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
async def upload_multiple_product_images(
    files: List[UploadFile] = File(...),
    # current_user: User = Depends(get_current_user)  # Temporarily disabled
):
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

@router.post("/upload-multiple-videos")
async def upload_multiple_product_videos(
    files: List[UploadFile] = File(...),
    # current_user: User = Depends(get_current_user)  # Temporarily disabled
):
    """Загрузить несколько видео для продукта"""
    uploaded_files = []
    
    for file in files:
        # Проверяем тип файла
        if not file.content_type.startswith('video/'):
            continue  # Пропускаем не-видео файлы
        
        # Проверяем размер файла (максимум 100MB для видео)
        if file.size and file.size > 100 * 1024 * 1024:
            continue  # Пропускаем слишком большие файлы
        
        # Генерируем уникальное имя файла
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"video_{timestamp}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        # Сохраняем файл
        try:
            with open(file_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)
            
            uploaded_files.append({
                "filename": filename,
                "file_path": file_path,
                "url": f"/uploads/products/{filename}"
            })
        except Exception as e:
            print(f"Ошибка при сохранении видео {file.filename}: {e}")
            continue
    
    return {"uploaded_files": uploaded_files, "count": len(uploaded_files)}

@router.get("/categories/list")
async def get_product_categories(db: Session = Depends(get_db)):
    """Получить список всех категорий продуктов"""
    categories = db.query(Product.category).distinct().all()
    return [category[0] for category in categories]

@router.post("/with-files", response_model=ProductSchema)
async def create_product_with_files(
    name: str = Form(...),
    category: str = Form(...),
    description: Optional[str] = Form(None),
    features: Optional[str] = Form(None),  # JSON строка
    specifications: Optional[str] = Form(None),  # JSON строка
    detailed: Optional[str] = Form(None),  # JSON строка
    price: Optional[float] = Form(None),
    status: str = Form("active"),
    main_image: Optional[UploadFile] = File(None),
    gallery_images: Optional[List[UploadFile]] = File(None),
    db: Session = Depends(get_db),
    # current_user: User = Depends(get_current_user)  # Temporarily disabled
):
    """Создать новый продукт с файлами"""
    import shutil
    
    print(f"🔧 CREATE PRODUCT: {name}")
    print(f"📁 Main image: {main_image.filename if main_image else 'None'}")
    print(f"🖼️ Gallery images: {[img.filename for img in gallery_images] if gallery_images else 'None'}")
    
    # Сохраняем главное изображение
    image_path = None
    if main_image:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"main_{timestamp}_{main_image.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(main_image.file, buffer)
        
        image_path = f"uploads/products/{filename}"
        print(f"✅ Main image saved: {image_path}")
    
    # Сохраняем изображения галереи
    images_list = []
    if gallery_images:
        for i, image in enumerate(gallery_images):
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"gallery_{i}_{timestamp}_{image.filename}"
            file_path = os.path.join(UPLOAD_DIR, filename)
            
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
            
            images_list.append(f"uploads/products/{filename}")
        print(f"✅ Gallery images saved: {images_list}")
    
    # Обрабатываем JSON поля
    features_list = []
    if features:
        try:
            features_list = json.loads(features)
        except:
            features_list = []
    
    specifications_dict = {}
    if specifications:
        try:
            specifications_dict = json.loads(specifications)
        except:
            specifications_dict = {}
    
    detailed_dict = {}
    if detailed:
        try:
            detailed_dict = json.loads(detailed)
        except:
            detailed_dict = {}
    
    # Создаем продукт
    db_product = Product(
        name=name,
        category=category,
        description=description,
        features=json.dumps(features_list),
        image_path=image_path,
        images=json.dumps(images_list),
        specifications=json.dumps(specifications_dict),
        detailed=json.dumps(detailed_dict),
        price=price,
        status=status
    )
    
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    
    print(f"🎉 Product created successfully: {db_product.id}")
    return db_product

@router.put("/{product_id}/with-files", response_model=ProductSchema)
async def update_product_with_files(
    product_id: int,
    name: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    features: Optional[str] = Form(None),  # JSON строка
    specifications: Optional[str] = Form(None),  # JSON строка
    detailed: Optional[str] = Form(None),  # JSON строка
    price: Optional[float] = Form(None),
    status: Optional[str] = Form(None),
    main_image: Optional[UploadFile] = File(None),
    gallery_images: Optional[List[UploadFile]] = File(None),
    db: Session = Depends(get_db),
    # current_user: User = Depends(get_current_user)  # Temporarily disabled
):
    """Обновить продукт с файлами"""
    import shutil
    
    print(f"🔧 UPDATE PRODUCT {product_id}")
    print(f"📁 Main image: {main_image.filename if main_image else 'None'}")
    print(f"🖼️ Gallery images: {[img.filename for img in gallery_images] if gallery_images else 'None'}")
    
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Продукт не найден"
        )
    
    # Обновляем текстовые поля
    if name is not None:
        db_product.name = name
    if category is not None:
        db_product.category = category
    if description is not None:
        db_product.description = description
    if price is not None:
        db_product.price = price
    if status is not None:
        db_product.status = status
    
    # Обрабатываем features
    if features is not None:
        try:
            features_list = json.loads(features) if features else []
            db_product.features = json.dumps(features_list)
        except:
            db_product.features = json.dumps([])
    
    # Обрабатываем specifications
    if specifications is not None:
        try:
            specifications_dict = json.loads(specifications) if specifications else {}
            db_product.specifications = json.dumps(specifications_dict)
        except:
            db_product.specifications = json.dumps({})
    
    # Обрабатываем detailed
    if detailed is not None:
        try:
            detailed_dict = json.loads(detailed) if detailed else {}
            db_product.detailed = json.dumps(detailed_dict)
        except:
            db_product.detailed = json.dumps({})
    
    # Обрабатываем главное изображение
    if main_image:
        # Удаляем старое изображение если есть
        if db_product.image_path and os.path.exists(db_product.image_path):
            os.remove(db_product.image_path)
        
        # Сохраняем новое изображение
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"main_{product_id}_{timestamp}_{main_image.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(main_image.file, buffer)
        
        db_product.image_path = f"uploads/products/{filename}"
        print(f"✅ Main image updated: {db_product.image_path}")
    
    # Обрабатываем изображения галереи
    if gallery_images:
        # Удаляем старые изображения галереи если есть
        if db_product.images:
            try:
                old_images = json.loads(db_product.images)
                for image_path in old_images:
                    if os.path.exists(image_path):
                        os.remove(image_path)
            except:
                pass
        
        # Сохраняем новые изображения
        images_list = []
        for i, image in enumerate(gallery_images):
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"gallery_{product_id}_{i}_{timestamp}_{image.filename}"
            file_path = os.path.join(UPLOAD_DIR, filename)
            
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
            
            images_list.append(f"uploads/products/{filename}")
        
        db_product.images = json.dumps(images_list)
        print(f"✅ Gallery images updated: {images_list}")
    
    db_product.updated_at = datetime.now()
    db.commit()
    db.refresh(db_product)
    
    print(f"🎉 Product {product_id} updated successfully!")
    return db_product

