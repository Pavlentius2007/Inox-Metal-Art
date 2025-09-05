from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float
from sqlalchemy.sql import func
from sqlalchemy.types import TypeDecorator, JSON
import json
from app.core.database import Base

class JSONString(TypeDecorator):
    """Кастомный тип для хранения JSON в виде строки"""
    impl = String
    
    def process_bind_param(self, value, dialect):
        if value is not None:
            if isinstance(value, (list, dict)):
                return json.dumps(value, ensure_ascii=False)
            return value
        return None
    
    def process_result_value(self, value, dialect):
        if value is not None:
            try:
                return json.loads(value)
            except (json.JSONDecodeError, TypeError):
                return {} if isinstance(value, str) and value.startswith('{') else []
        return {} if isinstance(value, str) and value.startswith('{') else []

class Product(Base):
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    category = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    features = Column(JSONString, nullable=True)  # Используем наш кастомный тип
    image_path = Column(String(500), nullable=True)  # Основное изображение
    images = Column(JSONString, nullable=True)  # Массив путей к дополнительным изображениям
    videos = Column(JSONString, nullable=True)  # Массив путей к видео файлам
    specifications = Column(JSONString, nullable=True)  # Технические характеристики
    detailed = Column(JSONString, nullable=True)  # Детальная информация
    price = Column(Float, nullable=True)  # Цена
    status = Column(String(20), default="active", index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
