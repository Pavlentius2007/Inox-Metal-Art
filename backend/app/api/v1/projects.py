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
    # current_user: User = Depends(get_current_user)  # Temporarily disabled for debugging - restore later!
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
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    short_description: Optional[str] = Form(None),
    category: Optional[str] = Form(None),
    client: Optional[str] = Form(None),
    location: Optional[str] = Form(None),
    area: Optional[str] = Form(None),
    completion_date: Optional[str] = Form(None),
    features: Optional[str] = Form(None),  # JSON строка
    technologies: Optional[str] = Form(None),  # JSON строка
    status: Optional[str] = Form(None),
    sort_order: Optional[int] = Form(None),
    is_featured: Optional[bool] = Form(None),
    main_image: Optional[UploadFile] = File(None),
    gallery_images: Optional[List[UploadFile]] = File(None),
    db: Session = Depends(get_db),
    # current_user: User = Depends(get_current_user)  # Temporarily disabled for debugging - restore later!
):
    """Обновить проект с возможностью загрузки файлов"""
    print(f"🔧 UPDATE PROJECT {project_id}: Received request")
    print(f"📁 Main image: {main_image.filename if main_image else 'None'}")
    print(f"🖼️ Gallery images: {[img.filename for img in gallery_images] if gallery_images else 'None'}")
    print(f"📝 Title: {title}")
    
    project = db.query(ProjectModel).filter(ProjectModel.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Проект не найден")
    
    # Обновляем текстовые поля
    if title is not None:
        project.title = title
    if description is not None:
        project.description = description
    if short_description is not None:
        project.short_description = short_description
    if category is not None:
        project.category = category
    if client is not None:
        project.client = client
    if location is not None:
        project.location = location
    if area is not None:
        project.area = area
    if completion_date is not None:
        project.completion_date = completion_date
    if status is not None:
        project.status = status
    if sort_order is not None:
        project.sort_order = sort_order
    if is_featured is not None:
        project.is_featured = is_featured
    
    # Обрабатываем features и technologies
    if features is not None:
        try:
            import json
            project.features = json.loads(features) if features else []
        except:
            project.features = []
    
    if technologies is not None:
        try:
            import json
            project.technologies = json.loads(technologies) if technologies else []
        except:
            project.technologies = []
    
    # Обрабатываем главное изображение
    if main_image:
        print(f"📁 Processing main image: {main_image.filename}")
        # Удаляем старое изображение если есть
        if project.main_image_path and os.path.exists(project.main_image_path):
            print(f"🗑️ Removing old main image: {project.main_image_path}")
            os.remove(project.main_image_path)
        
        # Сохраняем новое изображение
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"main_{project_id}_{timestamp}_{main_image.filename}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        print(f"💾 Saving main image to: {file_path}")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(main_image.file, buffer)
        
        project.main_image_path = f"uploads/projects/{filename}"
        print(f"✅ Main image saved: {project.main_image_path}")
    else:
        print("❌ No main image provided")
    
    # Обрабатываем изображения галереи
    if gallery_images:
        print(f"🖼️ Processing {len(gallery_images)} gallery images")
        # Удаляем старые изображения галереи если есть
        if project.gallery_images:
            print(f"🗑️ Removing old gallery images: {project.gallery_images}")
            for image_path in project.gallery_images:
                if os.path.exists(image_path):
                    os.remove(image_path)
        
        # Сохраняем новые изображения
        gallery_paths = []
        for i, image in enumerate(gallery_images):
            print(f"📁 Processing gallery image {i}: {image.filename}")
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"gallery_{project_id}_{i}_{timestamp}_{image.filename}"
            file_path = os.path.join(GALLERY_DIR, filename)
            
            print(f"💾 Saving gallery image to: {file_path}")
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)
            
            gallery_paths.append(f"uploads/projects/gallery/{filename}")
            print(f"✅ Gallery image {i} saved: {gallery_paths[-1]}")
        
        project.gallery_images = gallery_paths
        print(f"✅ All gallery images saved: {gallery_paths}")
    else:
        print("❌ No gallery images provided")
    
    project.updated_at = datetime.now()
    db.commit()
    db.refresh(project)
    
    print(f"🎉 Project {project_id} updated successfully!")
    print(f"📁 Final main_image_path: {project.main_image_path}")
    print(f"🖼️ Final gallery_images: {project.gallery_images}")
    
    return project

@router.delete("/{project_id}")
async def delete_project(
    project_id: int, 
    db: Session = Depends(get_db),
    # current_user: User = Depends(get_current_user)  # Temporarily disabled for debugging - restore later!
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
    # current_user: User = Depends(get_current_user)  # Temporarily disabled for debugging - restore later!
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
    # current_user: User = Depends(get_current_user)  # Temporarily disabled for debugging - restore later!
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
