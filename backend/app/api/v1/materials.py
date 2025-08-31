from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import shutil
from datetime import datetime
import json
import math

from app.core.database import get_db
from app.models.material import Material
from app.schemas.material import MaterialCreate, MaterialUpdate, Material as MaterialSchema, MaterialList, MaterialCategory
from app.api.v1.auth import get_current_user
from app.models.user import User

router = APIRouter()

# Настройки для загрузки файлов
UPLOAD_DIR = "uploads/materials"
ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png', '.zip', '.rar'}

# Создаем директорию для загрузок, если её нет
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_file_extension(filename: str) -> str:
    return os.path.splitext(filename)[1].lower()

def is_allowed_file(filename: str) -> bool:
    return get_file_extension(filename) in ALLOWED_EXTENSIONS

def format_file_size(size_bytes: int) -> str:
    if size_bytes == 0:
        return "0 Bytes"
    size_names = ["Bytes", "KB", "MB", "GB"]
    i = int(math.floor(math.log(size_bytes, 1024)))
    p = math.pow(1024, i)
    s = round(size_bytes / p, 2)
    return f"{s} {size_names[i]}"

@router.get("/", response_model=MaterialList)
def get_materials(
    skip: int = 0,
    limit: int = 100,
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Получить список материалов с фильтрацией по категории"""
    query = db.query(Material).filter(Material.is_active == True)
    
    if category and category != 'all':
        query = query.filter(Material.category == category)
    
    total = query.count()
    materials = query.offset(skip).limit(limit).all()
    
    return MaterialList(materials=materials, total=total)

@router.get("/categories", response_model=List[MaterialCategory])
def get_material_categories(db: Session = Depends(get_db)):
    """Получить список категорий материалов с количеством"""
    categories = db.query(Material.category).filter(Material.is_active == True).distinct().all()
    
    result = []
    for cat in categories:
        count = db.query(Material).filter(
            Material.category == cat.category,
            Material.is_active == True
        ).count()
        
        result.append(MaterialCategory(
            id=cat.category,
            name=cat.category.replace('_', ' ').title(),
            count=count
        ))
    
    return result

@router.get("/{material_id}", response_model=MaterialSchema)
def get_material(material_id: int, db: Session = Depends(get_db)):
    """Получить материал по ID"""
    material = db.query(Material).filter(Material.id == material_id).first()
    if not material:
        raise HTTPException(status_code=404, detail="Материал не найден")
    return material

@router.post("/", response_model=MaterialSchema)
def create_material(
    name: str = Form(...),
    description: Optional[str] = Form(None),
    category: str = Form(...),
    tags: Optional[str] = Form(None),
    sort_order: int = Form(0),
    is_featured: bool = Form(False),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Создать новый материал с загрузкой файла"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="Файл не выбран")
    
    if not is_allowed_file(file.filename):
        raise HTTPException(
            status_code=400, 
            detail=f"Неподдерживаемый тип файла. Разрешены: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Сохраняем файл
    file_extension = get_file_extension(file.filename)
    safe_filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{name.replace(' ', '_')}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, safe_filename)
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка сохранения файла: {str(e)}")
    
    # Получаем размер файла
    file_size = os.path.getsize(file_path)
    file_size_str = format_file_size(file_size)
    
    # Парсим теги
    tags_list = []
    if tags:
        try:
            tags_list = json.loads(tags) if tags.startswith('[') else [tags]
        except:
            tags_list = [tags]
    
    # Создаем материал
    material_data = MaterialCreate(
        name=name,
        description=description,
        category=category,
        file_type=file_extension[1:].upper(),  # Убираем точку
        file_size=file_size_str,
        file_path=file_path,
        tags=tags_list,
        sort_order=sort_order,
        is_featured=is_featured
    )
    
    db_material = Material(**material_data.dict())
    db.add(db_material)
    db.commit()
    db.refresh(db_material)
    
    return db_material

@router.put("/{material_id}", response_model=MaterialSchema)
def update_material(
    material_id: int,
    material_update: MaterialUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Обновить материал"""
    db_material = db.query(Material).filter(Material.id == material_id).first()
    if not db_material:
        raise HTTPException(status_code=404, detail="Материал не найден")
    
    update_data = material_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_material, field, value)
    
    db.commit()
    db.refresh(db_material)
    return db_material

@router.delete("/{material_id}")
def delete_material(
    material_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Удалить материал"""
    db_material = db.query(Material).filter(Material.id == material_id).first()
    if not db_material:
        raise HTTPException(status_code=404, detail="Материал не найден")
    
    # Удаляем файл
    if os.path.exists(db_material.file_path):
        try:
            os.remove(db_material.file_path)
        except Exception as e:
            print(f"Ошибка удаления файла: {e}")
    
    db.delete(db_material)
    db.commit()
    
    return {"message": "Материал успешно удален"}

@router.post("/{material_id}/download")
def download_material(material_id: int, db: Session = Depends(get_db)):
    """Увеличить счетчик скачиваний"""
    db_material = db.query(Material).filter(Material.id == material_id).first()
    if not db_material:
        raise HTTPException(status_code=404, detail="Материал не найден")
    
    db_material.downloads += 1
    db.commit()
    
    return {"message": "Счетчик скачиваний обновлен"}

@router.post("/upload-file")
def upload_material_file(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    """Загрузить файл материала (для обновления существующего)"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="Файл не выбран")
    
    if not is_allowed_file(file.filename):
        raise HTTPException(
            status_code=400, 
            detail=f"Неподдерживаемый тип файла. Разрешены: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    # Сохраняем файл
    file_extension = get_file_extension(file.filename)
    safe_filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, safe_filename)
    
    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка сохранения файла: {str(e)}")
    
    # Получаем размер файла
    file_size = os.path.getsize(file_path)
    file_size_str = format_file_size(file_size)
    
    return {
        "filename": safe_filename,
        "file_path": file_path,
        "file_size": file_size_str,
        "file_type": file_extension[1:].upper()
    }
