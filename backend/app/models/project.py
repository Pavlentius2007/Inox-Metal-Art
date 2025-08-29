from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from sqlalchemy.types import TypeDecorator
import json
from app.core.database import Base

class JSONString(TypeDecorator):
    """Кастомный тип для хранения JSON в виде строки"""
    impl = String
    
    def process_bind_param(self, value, dialect):
        if value is not None:
            if isinstance(value, list):
                return json.dumps(value, ensure_ascii=False)
            return value
        return None
    
    def process_result_value(self, value, dialect):
        if value is not None:
            try:
                return json.loads(value)
            except (json.JSONDecodeError, TypeError):
                return []
        return []

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    short_description = Column(String(500), nullable=True)
    category = Column(String(100), nullable=False, index=True)  # Жилые, Коммерческие, Общественные
    client = Column(String(255), nullable=True)
    location = Column(String(255), nullable=True)
    area = Column(String(100), nullable=True)  # Площадь проекта
    completion_date = Column(String(100), nullable=True)  # Дата завершения
    main_image_path = Column(String(500), nullable=True)
    gallery_images = Column(JSONString, nullable=True)  # Массив путей к изображениям
    features = Column(JSONString, nullable=True)  # Особенности проекта
    technologies = Column(JSONString, nullable=True)  # Использованные технологии
    status = Column(String(20), default="active", index=True)  # active/inactive
    sort_order = Column(Integer, default=0)  # Порядок сортировки
    is_featured = Column(Boolean, default=False)  # Выделенный проект
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

