from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
import os
import shutil
from datetime import datetime

from app.core.database import get_db
from app.models.project import Project as ProjectModel
from app.schemas.project import ProjectCreate, ProjectUpdate, Project, ProjectList, ProjectCategory
from app.api.v1.auth import get_current_user
from app.models.user import User

router = APIRouter()

# Создаем папку для загрузок если её нет
UPLOAD_DIR = "uploads/projects"
GALLERY_DIR = "uploads/projects/gallery"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(GALLERY_DIR, exist_ok=True)

@router.get("/", response_model=ProjectList)
async def get_projects(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    category: Optional[str] = None,
    status: Optional[str] = None,
    featured: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    """Получить список проектов с пагинацией и фильтрацией"""
    query = db.query(ProjectModel)
    
    if category:
        query = query.filter(ProjectModel.category == category)
    
    if status:
        query = query.filter(ProjectModel.status == status)
    
    if featured is not None:
        query = query.filter(ProjectModel.is_featured == featured)
    
    total = query.count()
    projects = query.order_by(ProjectModel.sort_order, ProjectModel.created_at.desc()).offset(skip).limit(limit).all()
    
    return ProjectList(
        projects=projects,
        total=total,
        page=skip // limit + 1,
        size=limit
    )

@router.get("/categories", response_model=List[ProjectCategory])
async def get_project_categories(db: Session = Depends(get_db)):
    """Получить список категорий проектов с количеством элементов"""
    categories = db.query(
        ProjectModel.category,
        func.count(ProjectModel.id).label('count')
    ).filter(ProjectModel.status == "active").group_by(ProjectModel.category).all()
    
    return [ProjectCategory(name=cat.category, count=cat.count) for cat in categories]

@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: int, db: Session = Depends(get_db)):
    """Получить конкретный проект по ID"""
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Проект не найден")
    return project

@router.post("/", response_model=Project)
async def create_project(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    short_description: Optional[str] = Form(None),
    category: str = Form(...),
    client: Optional[str] = Form(None),
    location: Optional[str] = Form(None),
    area: Optional[str] = Form(None),
    completion_date: Optional[str] = Form(None),
    features: Optional[str] = Form(None),  # JSON строка
    technologies: Optional[str] = Form(None),  # JSON строка
    status: str = Form("active"),
    sort_order: int = Form(0),
    is_featured: bool = Form(False),
    main_image: Optional[UploadFile] = File(None),
    gallery_images: Optional[List[UploadFile]] = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Создать новый проект"""
    
    # Обрабатываем features и technologies
    features_list = []
    if features:
        try:
            import json
            features_list = json.loads(features)
        except:
            features_list = []
    
    technologies_list = []
    if technologies:
        try:
            import json
            technologies_list = json.loads(technologies)
        except:
            technologies_list = []
    
    # Сохраняем главное изображение
    main_image_path = None
    if main_image:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"main_{timestamp}_{main_image.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(main_image.file, buffer)
        
        main_image_path = f"uploads/projects/{filename}"
    
    # Сохраняем изображения галереи
    gallery_paths = []
    if gallery_images:
        for i, image in enumerate(gallery_images):
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"gallery_{i}_{timestamp}_{image.filename}"
            file_path = os.path.join(GALLERY_DIR, filename)
            
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
            
            gallery_paths.append(f"uploads/projects/gallery/{filename}")
    
    # Создаем проект
    project_data = {
        "title": title,
        "description": description,
        "short_description": short_description,
        "category": category,
        "client": client,
        "location": location,
        "area": area,
        "completion_date": completion_date,
        "features": features_list,
        "technologies": technologies_list,
        "status": status,
        "sort_order": sort_order,
        "is_featured": is_featured,
        "main_image_path": main_image_path,
        "gallery_images": gallery_paths
    }
    
    project = ProjectModel(**project_data)
    db.add(project)
    db.commit()
    db.refresh(project)
    
    return project

@router.put("/{project_id}", response_model=Project)
async def update_project(
    project_id: int,
    project_update: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Обновить проект"""
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Проект не найден")
    
    update_data = project_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(project, field, value)
    
    project.updated_at = datetime.now()
    db.commit()
    db.refresh(project)
    
    return project

@router.delete("/{project_id}")
async def delete_project(
    project_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Удалить проект"""
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Проект не найден")
    
    # Удаляем изображения если есть
    if project.main_image_path and os.path.exists(project.main_image_path):
        os.remove(project.main_image_path)
    
    if project.gallery_images:
        for image_path in project.gallery_images:
            if os.path.exists(image_path):
                os.remove(image_path)
    
    db.delete(project)
    db.commit()
    
    return {"message": "Проект удален"}

@router.post("/{project_id}/upload-main-image")
async def upload_project_main_image(
    project_id: int,
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Загрузить главное изображение для проекта"""
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Проект не найден")
    
    # Удаляем старое изображение если есть
    if project.main_image_path and os.path.exists(project.main_image_path):
        os.remove(project.main_image_path)
    
    # Сохраняем новое изображение
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"main_{project_id}_{timestamp}_{image.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)
    
    project.main_image_path = f"uploads/projects/{filename}"
    project.updated_at = datetime.now()
    db.commit()
    
    return {"message": "Главное изображение загружено", "image_path": project.main_image_path}

@router.post("/{project_id}/upload-gallery-images")
async def upload_project_gallery_images(
    project_id: int,
    images: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Загрузить изображения галереи для проекта"""
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Проект не найден")
    
    # Удаляем старые изображения галереи если есть
    if project.gallery_images:
        for image_path in project.gallery_images:
            if os.path.exists(image_path):
                os.remove(image_path)
    
    # Сохраняем новые изображения
    gallery_paths = []
    for i, image in enumerate(images):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"gallery_{project_id}_{i}_{timestamp}_{image.filename}"
        file_path = os.path.join(GALLERY_DIR, filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        
        gallery_paths.append(f"uploads/projects/gallery/{filename}")
    
    project.gallery_images = gallery_paths
    project.updated_at = datetime.now()
    db.commit()
    
    return {"message": f"Загружено {len(images)} изображений галереи", "gallery_paths": gallery_paths}
