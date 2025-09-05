#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class Specifications(BaseModel):
    """Технические характеристики продукта"""
    type: Optional[str] = None
    thickness: Optional[str] = None
    hardness: Optional[str] = None
    colors: Optional[List[str]] = []
    scratch_resistance: Optional[str] = None
    effect: Optional[str] = None
    maintenance: Optional[str] = None
    eco: Optional[str] = None
    roughness: Optional[str] = None
    quality: Optional[str] = None
    reflection: Optional[str] = None
    texture: Optional[str] = None

class Detailed(BaseModel):
    """Детальная информация о продукте"""
    technology: Optional[str] = None
    types: Optional[List[str]] = []
    colors: Optional[List[str]] = []
    testing: Optional[str] = None
    quality: Optional[str] = None
    experience: Optional[str] = None
    benefits: Optional[List[str]] = []
    applications: Optional[List[str]] = []
    features: Optional[List[str]] = []

class ProductBase(BaseModel):
    """Базовая схема продукта"""
    name: str = Field(..., min_length=1, max_length=255)
    category: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    features: Optional[List[str]] = []
    image_path: Optional[str] = None  # Основное изображение
    images: Optional[List[str]] = []  # Дополнительные изображения
    videos: Optional[List[str]] = []  # Видео файлы
    specifications: Optional[Specifications] = None
    detailed: Optional[Detailed] = None
    price: Optional[float] = None
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
    images: Optional[List[str]] = None
    videos: Optional[List[str]] = None
    specifications: Optional[Specifications] = None
    detailed: Optional[Detailed] = None
    price: Optional[float] = None
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
