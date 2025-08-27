from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from sqlalchemy.sql import func
from app.core.database import Base
import enum

class ProductType(str, enum.Enum):
    PLATES = "plates"           # Плиты
    TUBES = "tubes"            # Трубы
    PROFILES = "profiles"      # Профили
    COATINGS = "coatings"      # Покрытия
    OTHER = "other"            # Другое

class Application(Base):
    __tablename__ = "applications"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    company = Column(String(200), nullable=False)
    phone = Column(String(20), nullable=False)
    email = Column(String(100), nullable=False)
    product_type = Column(Enum(ProductType), nullable=False)
    description = Column(Text, nullable=False)
    file_paths = Column(Text)  # JSON строка с путями к файлам
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String(50), default="new")  # new, processed, completed

