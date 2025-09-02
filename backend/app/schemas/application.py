from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class ApplicationBase(BaseModel):
    company_name: str
    contact_person: str
    email: EmailStr
    phone: str
    country: str
    city: str
    product_type: str
    quantity: str
    application: str
    deadline: Optional[str] = None
    additional_info: Optional[str] = None
    file_paths: Optional[str] = None

class ApplicationCreate(ApplicationBase):
    pass

class ApplicationUpdate(BaseModel):
    company_name: Optional[str] = None
    contact_person: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    country: Optional[str] = None
    city: Optional[str] = None
    product_type: Optional[str] = None
    quantity: Optional[str] = None
    application: Optional[str] = None
    deadline: Optional[str] = None
    additional_info: Optional[str] = None
    is_processed: Optional[bool] = None

class Application(ApplicationBase):
    id: int
    is_processed: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class ApplicationList(BaseModel):
    applications: list[Application]
    total: int
