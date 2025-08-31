from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
import os
import shutil
from datetime import datetime

from app.core.database import get_db
from app.models.gallery import Gallery as GalleryModel
from app.schemas.gallery import GalleryCreate, GalleryUpdate, Gallery, GalleryList, GalleryCategory
from app.api.v1.auth import get_current_user
from app.models.user import User

router = APIRouter()

# Создаем папку для загрузок если её нет
UPLOAD_DIR = "uploads/gallery"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=GalleryList)
async def get_galleries(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    category: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """Получить список элементов галереи с пагинацией и фильтрацией"""
    query = db.query(GalleryModel)
    
    if category:
        query = query.filter(GalleryModel.category == category)
    
    if status:
        query = query.filter(GalleryModel.status == status)
    
    total = query.count()
    galleries = query.order_by(GalleryModel.sort_order, GalleryModel.created_at.desc()).offset(skip).limit(limit).all()
    
    return GalleryList(
        galleries=galleries,
        total=total,
        page=skip // limit + 1,
        size=limit
    )

@router.get("/categories", response_model=List[GalleryCategory])
async def get_gallery_categories(db: Session = Depends(get_db)):
    """Получить список категорий галереи с количеством элементов"""
    categories = db.query(
        GalleryModel.category,
        func.count(GalleryModel.id).label('count')
    ).filter(GalleryModel.status == "active").group_by(GalleryModel.category).all()
    
    return [GalleryCategory(name=cat.category, count=cat.count) for cat in categories]

@router.get("/{gallery_id}", response_model=Gallery)
async def get_gallery(gallery_id: int, db: Session = Depends(get_db)):
    """Получить конкретный элемент галереи по ID"""
    gallery = db.query(GalleryModel).filter(GalleryModel.id == gallery_id).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Элемент галереи не найден")
    return gallery

@router.post("/", response_model=Gallery)
async def create_gallery(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    category: str = Form(...),
    color: Optional[str] = Form(None),
    finish: Optional[str] = Form(None),
    features: Optional[str] = Form(None),  # JSON строка
    status: str = Form("active"),
    sort_order: int = Form(0),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Создать новый элемент галереи"""
    
    # Обрабатываем features
    features_list = []
    if features:
        try:
            import json
            features_list = json.loads(features)
        except:
            features_list = []
    
    # Сохраняем изображение
    image_path = None
    if image:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{timestamp}_{image.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        
        image_path = f"uploads/gallery/{filename}"
    
    # Создаем элемент галереи
    gallery_data = {
        "title": title,
        "description": description,
        "category": category,
        "color": color,
        "finish": finish,
        "features": features_list,
        "status": status,
        "sort_order": sort_order,
        "image_path": image_path
    }
    
    gallery = GalleryModel(**gallery_data)
    db.add(gallery)
    db.commit()
    db.refresh(gallery)
    
    return gallery

@router.put("/{gallery_id}", response_model=Gallery)
async def update_gallery(
    gallery_id: int,
    gallery_update: GalleryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Обновить элемент галереи"""
    gallery = db.query(GalleryModel).filter(GalleryModel.id == gallery_id).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Элемент галереи не найден")
    
    update_data = gallery_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(gallery, field, value)
    
    gallery.updated_at = datetime.now()
    db.commit()
    db.refresh(gallery)
    
    return gallery

@router.delete("/{gallery_id}")
async def delete_gallery(
    gallery_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Удалить элемент галереи"""
    gallery = db.query(GalleryModel).filter(GalleryModel.id == gallery_id).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Элемент галереи не найден")
    
    # Удаляем изображение если есть
    if gallery.image_path and os.path.exists(gallery.image_path):
        os.remove(gallery.image_path)
    
    db.delete(gallery)
    db.commit()
    
    return {"message": "Элемент галереи удален"}

@router.post("/{gallery_id}/upload-image")
async def upload_gallery_image(
    gallery_id: int,
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Загрузить изображение для элемента галереи"""
    gallery = db.query(GalleryModel).filter(GalleryModel.id == gallery_id).first()
    if not gallery:
        raise HTTPException(status_code=404, detail="Элемент галереи не найден")
    
    # Удаляем старое изображение если есть
    if gallery.image_path and os.path.exists(gallery.image_path):
        os.remove(gallery.image_path)
    
    # Сохраняем новое изображение
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{gallery_id}_{timestamp}_{image.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    
    gallery.image_path = f"uploads/gallery/{filename}"
    gallery.updated_at = datetime.now()
    db.commit()
    
    return {"message": "Изображение загружено", "image_path": gallery.image_path}
