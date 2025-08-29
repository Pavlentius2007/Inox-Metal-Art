from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class GalleryBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    category: str = Field(..., min_length=1, max_length=100)
    color: Optional[str] = Field(None, max_length=100)
    finish: Optional[str] = Field(None, max_length=100)
    features: Optional[List[str]] = []
    status: str = Field(default="active", pattern="^(active|inactive)$")
    sort_order: int = Field(default=0, ge=0)

class GalleryCreate(GalleryBase):
    pass

class GalleryUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    color: Optional[str] = Field(None, max_length=100)
    finish: Optional[str] = Field(None, max_length=100)
    features: Optional[List[str]] = None
    status: Optional[str] = Field(None, pattern="^(active|inactive)$")
    sort_order: Optional[int] = Field(None, ge=0)

class Gallery(GalleryBase):
    id: int
    image_path: Optional[str] = None
    thumbnail_path: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class GalleryList(BaseModel):
    galleries: List[Gallery]
    total: int
    page: int
    size: int

class GalleryCategory(BaseModel):
    name: str
    count: int
