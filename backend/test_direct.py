#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import asyncio
from app.api.v1.products import get_products
from app.core.database import get_db
from fastapi import Request

async def test_products_direct():
    try:
        print("Тестируем API продуктов напрямую...")
        
        # Получаем сессию базы данных
        db = next(get_db())
        
        # Вызываем функцию напрямую
        result = await get_products(skip=0, limit=10, db=db)
        
        print(f"✅ API работает! Результат: {result}")
        print(f"   Количество продуктов: {result.total}")
        print(f"   Первый продукт: {result.products[0].name if result.products else 'Нет продуктов'}")
        
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_products_direct())
