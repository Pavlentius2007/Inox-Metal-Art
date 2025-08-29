#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ProductBase(BaseModel):
    """Базовая схема продукта"""
    name: str = Field(..., min_length=1, max_length=255)
    category: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    features: Optional[List[str]] = []
    image_path: Optional[str] = None
    status: str = Field(default="active", pattern="^(active|inactive)$")

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    """Схема для обновления продукта"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    category: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None
    features: Optional[List[str]] = None
    image_path: Optional[str] = None
    status: Optional[str] = Field(None, pattern="^(active|inactive)$")

class Product(ProductBase):
    """Полная схема продукта"""
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ProductList(BaseModel):
    """Схема для списка продуктов с пагинацией"""
    products: List[Product]
    total: int
    page: int
    size: int

class ProductCategory(BaseModel):
    """Схема для категории продукта"""
    name: str
    count: int
