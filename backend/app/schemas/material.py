from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class MaterialBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: str
    file_type: str
    file_size: str
    file_path: str
    download_url: Optional[str] = None
    tags: Optional[List[str]] = None
    is_active: bool = True
    sort_order: int = 0
    is_featured: bool = False

class MaterialCreate(MaterialBase):
    pass

class MaterialUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    file_type: Optional[str] = None
    file_size: Optional[str] = None
    file_path: Optional[str] = None
    download_url: Optional[str] = None
    tags: Optional[List[str]] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None
    is_featured: Optional[bool] = None

class Material(MaterialBase):
    id: int
    upload_date: datetime
    downloads: int

    class Config:
        from_attributes = True

class MaterialList(BaseModel):
    materials: List[Material]
    total: int

class MaterialCategory(BaseModel):
    id: str
    name: str
    count: int



