from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.core.database import Base

class Certificate(Base):
    __tablename__ = "certificates"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text)
    issuer = Column(String(200))     # Кто выдал сертификат
    issue_date = Column(DateTime)    # Дата выдачи
    expiry_date = Column(DateTime)   # Дата окончания действия
    certificate_number = Column(String(100))  # Номер сертификата
    image_path = Column(String(500)) # Путь к изображению сертификата
    is_active = Column(Boolean, default=True)  # Активен ли сертификат
    category = Column(String(100))   # ISO, соответствие, награды
    created_at = Column(DateTime(timezone=True), server_default=func.now())

