from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime
import json
import os
import shutil

from app.core.database import get_db
from app.models.application import Application
from app.schemas.application import ApplicationCreate, ApplicationUpdate, Application as ApplicationSchema, ApplicationList
from app.api.v1.auth import get_current_user
from app.models.user import User

router = APIRouter()

# Настройки для загрузки файлов
UPLOAD_DIR = "uploads/applications"
ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png', '.zip', '.rar', '.dwg', '.dxf'}

# Создаем директорию для загрузок, если её нет
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_file_extension(filename: str) -> str:
    return os.path.splitext(filename)[1].lower()

def is_allowed_file(filename: str) -> bool:
    return get_file_extension(filename) in ALLOWED_EXTENSIONS

@router.post("/", response_model=ApplicationSchema)
def create_application(
    company_name: str = Form(...),
    contact_person: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    country: str = Form(...),
    city: str = Form(...),
    product_type: str = Form(...),
    quantity: str = Form(...),
    application: str = Form(...),
    deadline: Optional[str] = Form(None),
    additional_info: Optional[str] = Form(None),
    files: Optional[List[UploadFile]] = File(None),
    db: Session = Depends(get_db)
):
    """Создать новую заявку с файлами"""
    print(f"📝 Получена заявка: {company_name} - {contact_person} - {email}")
    try:
        # Создаем заявку
        application_data = {
            "company_name": company_name,
            "contact_person": contact_person,
            "email": email,
            "phone": phone,
            "country": country,
            "city": city,
            "product_type": product_type,
            "quantity": quantity,
            "application": application,
            "deadline": deadline,
            "additional_info": additional_info,
            "file_paths": "[]"
        }
        
        db_application = Application(**application_data)
        db.add(db_application)
        db.commit()
        db.refresh(db_application)
        
        # Обрабатываем загруженные файлы
        file_paths = []
        if files:
            for file in files:
                if file.filename and is_allowed_file(file.filename):
                    # Создаем уникальное имя файла
                    file_extension = get_file_extension(file.filename)
                    safe_filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{db_application.id}_{file.filename.replace(' ', '_')}"
                    file_path = os.path.join(UPLOAD_DIR, safe_filename)
                    
                    # Сохраняем файл
                    with open(file_path, "wb") as buffer:
                        shutil.copyfileobj(file.file, buffer)
                    
                    file_paths.append(file_path)
        
        # Обновляем пути к файлам в БД
        if file_paths:
            db_application.file_paths = json.dumps(file_paths)
            db.commit()
            db.refresh(db_application)
        
        print(f"✅ Заявка успешно создана в БД: ID {db_application.id}")
        return db_application
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Ошибка создания заявки: {str(e)}")

@router.get("/", response_model=ApplicationList)
def get_applications(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Получить список заявок (только для авторизованных пользователей)"""
    total = db.query(Application).count()
    applications = db.query(Application).offset(skip).limit(limit).all()
    
    return ApplicationList(applications=applications, total=total)

@router.get("/{application_id}", response_model=ApplicationSchema)
def get_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Получить заявку по ID (только для авторизованных пользователей)"""
    application = db.query(Application).filter(Application.id == application_id).first()
    if not application:
        raise HTTPException(status_code=404, detail="Заявка не найдена")
    return application

@router.put("/{application_id}", response_model=ApplicationSchema)
def update_application(
    application_id: int,
    application_update: ApplicationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Обновить заявку (только для авторизованных пользователей)"""
    db_application = db.query(Application).filter(Application.id == application_id).first()
    if not db_application:
        raise HTTPException(status_code=404, detail="Заявка не найдена")
    
    update_data = application_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_application, field, value)
    
    db_application.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_application)
    return db_application

@router.delete("/{application_id}")
def delete_application(
    application_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Удалить заявку (только для авторизованных пользователей)"""
    db_application = db.query(Application).filter(Application.id == application_id).first()
    if not db_application:
        raise HTTPException(status_code=404, detail="Заявка не найдена")
    
    db.delete(db_application)
    db.commit()
    return {"message": "Заявка успешно удалена"}

