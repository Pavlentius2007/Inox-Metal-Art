from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import json
import os
from datetime import datetime

from app.core.database import get_db
from app.models.application import Application, ProductType
from app.core.config import settings
from app.services.email_service import send_application_email

router = APIRouter()

@router.post("/applications/")
async def create_application(
    name: str = Form(...),
    company: str = Form(...),
    phone: str = Form(...),
    email: str = Form(...),
    product_type: ProductType = Form(...),
    description: str = Form(...),
    files: Optional[List[UploadFile]] = File(None),
    db: Session = Depends(get_db)
):
    """Создание новой заявки от клиента"""
    
    # Сохраняем заявку в БД
    application = Application(
        name=name,
        company=company,
        phone=phone,
        email=email,
        product_type=product_type,
        description=description,
        file_paths="[]"  # Пока пустой
    )
    
    db.add(application)
    db.commit()
    db.refresh(application)
    
    # Обрабатываем загруженные файлы
    file_paths = []
    if files:
        upload_dir = f"uploads/applications/{application.id}"
        os.makedirs(upload_dir, exist_ok=True)
        
        for file in files:
            if file.filename:
                file_path = f"{upload_dir}/{file.filename}"
                with open(file_path, "wb") as buffer:
                    content = await file.read()
                    buffer.write(content)
                file_paths.append(file_path)
        
        # Обновляем пути к файлам в БД
        application.file_paths = json.dumps(file_paths)
        db.commit()
    
    # Отправляем email уведомление
    try:
        await send_application_email(application, file_paths)
    except Exception as e:
        # Логируем ошибку, но не прерываем создание заявки
        print(f"Ошибка отправки email: {e}")
    
    return {
        "message": "Заявка успешно создана",
        "application_id": application.id,
        "status": "new"
    }

@router.get("/applications/")
def get_applications(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Получение списка заявок (для внутреннего использования)"""
    applications = db.query(Application).offset(skip).limit(limit).all()
    return applications

