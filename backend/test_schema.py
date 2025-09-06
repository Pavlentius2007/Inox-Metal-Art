#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from app.core.database import get_db
from app.models.product import Product
from app.schemas.product import Product as ProductSchema, ProductList
from sqlalchemy.orm import Session

def test_schema():
    try:
        print("Тестируем схему продуктов...")
        
        # Получаем сессию базы данных
        db = next(get_db())
        
        # Получаем первый продукт
        product = db.query(Product).first()
        if not product:
            print("❌ Продукты не найдены в базе данных")
            return
            
        print(f"✅ Найден продукт: {product.name}")
        print(f"   ID: {product.id}")
        print(f"   Category: {product.category}")
        print(f"   Features: {product.features}")
        print(f"   Images: {product.images}")
        
        # Пытаемся сериализовать в схему
        try:
            product_schema = ProductSchema.from_orm(product)
            print("✅ Продукт успешно сериализован в схему")
            print(f"   Schema features: {product_schema.features}")
            print(f"   Schema images: {product_schema.images}")
        except Exception as e:
            print(f"❌ Ошибка сериализации: {e}")
            import traceback
            traceback.print_exc()
            
        # Тестируем список продуктов
        try:
            products = db.query(Product).limit(5).all()
            product_list = ProductList(
                products=products,
                total=len(products),
                page=1,
                size=5
            )
            print("✅ Список продуктов успешно создан")
        except Exception as e:
            print(f"❌ Ошибка создания списка: {e}")
            import traceback
            traceback.print_exc()
            
    except Exception as e:
        print(f"❌ Общая ошибка: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_schema()

