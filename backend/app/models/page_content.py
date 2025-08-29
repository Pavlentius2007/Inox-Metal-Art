from sqlalchemy import Column, Integer, String, Text, DateTime, func
from app.core.database import Base

class PageContent(Base):
    __tablename__ = "page_content"
    
    id = Column(Integer, primary_key=True, index=True)
    page_name = Column(String(100), nullable=False, unique=True, index=True)
    title = Column(String(255))
    content = Column(Text)
    meta_description = Column(Text)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    
    def __repr__(self):
        return f"<PageContent(id={self.id}, page_name='{self.page_name}')>"
