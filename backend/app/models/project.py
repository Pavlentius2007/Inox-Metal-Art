from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.core.database import Base

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    location = Column(String(200))  # Местоположение проекта
    client = Column(String(200))    # Клиент
    completion_date = Column(DateTime)
    category = Column(String(100))  # Экстерьер, интерьер, лифты
    main_image = Column(String(500))  # Главное фото
    gallery_images = Column(Text)   # JSON строка с путями к фото
    video_url = Column(String(500)) # Ссылка на видео
    is_featured = Column(Boolean, default=False)  # Выделенный проект
    created_at = Column(DateTime(timezone=True), server_default=func.now())

