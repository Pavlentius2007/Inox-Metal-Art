from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ProjectBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    short_description: Optional[str] = Field(None, max_length=500)
    category: str = Field(..., min_length=1, max_length=100)
    client: Optional[str] = Field(None, max_length=255)
    location: Optional[str] = Field(None, max_length=255)
    area: Optional[str] = Field(None, max_length=100)
    completion_date: Optional[str] = Field(None, max_length=100)
    features: Optional[List[str]] = []
    technologies: Optional[List[str]] = []
    status: str = Field(default="active", pattern="^(active|inactive)$")
    sort_order: int = Field(default=0, ge=0)
    is_featured: bool = Field(default=False)

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = None
    short_description: Optional[str] = Field(None, max_length=500)
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    client: Optional[str] = Field(None, max_length=255)
    location: Optional[str] = Field(None, max_length=255)
    area: Optional[str] = Field(None, max_length=100)
    completion_date: Optional[str] = Field(None, max_length=100)
    features: Optional[List[str]] = None
    technologies: Optional[List[str]] = None
    status: Optional[str] = Field(None, pattern="^(active|inactive)$")
    sort_order: Optional[int] = Field(None, ge=0)
    is_featured: Optional[bool] = None

class Project(ProjectBase):
    id: int
    main_image_path: Optional[str] = None
    gallery_images: Optional[List[str]] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProjectList(BaseModel):
    projects: List[Project]
    total: int
    page: int
    size: int

class ProjectCategory(BaseModel):
    name: str
    count: int




