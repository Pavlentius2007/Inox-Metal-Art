from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.core.database import Base
from app.models.product import JSONString

class Material(Base):
    __tablename__ = "materials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=False, index=True)
    file_type = Column(String(50), nullable=False)
    file_size = Column(String(50), nullable=False)
    file_path = Column(String(500), nullable=False)
    download_url = Column(String(500), nullable=True)
    tags = Column(JSONString, nullable=True)  # Список тегов
    upload_date = Column(DateTime(timezone=True), server_default=func.now())
    downloads = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    sort_order = Column(Integer, default=0)
    is_featured = Column(Boolean, default=False)
