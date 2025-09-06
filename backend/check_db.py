#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from app.core.database import engine
from sqlalchemy import text

def check_database():
    try:
        with engine.connect() as conn:
            # Проверяем таблицы
            result = conn.execute(text("SELECT name FROM sqlite_master WHERE type='table'"))
            tables = [row[0] for row in result]
            print("Таблицы в базе данных:", tables)
            
            # Проверяем таблицу products
            if 'products' in tables:
                result = conn.execute(text("SELECT COUNT(*) FROM products"))
                count = result.scalar()
                print(f"Количество продуктов в базе: {count}")
                
                if count > 0:
                    result = conn.execute(text("SELECT id, name, category FROM products LIMIT 5"))
                    products = result.fetchall()
                    print("Первые 5 продуктов:")
                    for product in products:
                        print(f"  ID: {product[0]}, Name: {product[1]}, Category: {product[2]}")
            else:
                print("Таблица products не найдена!")
                
    except Exception as e:
        print(f"Ошибка при проверке базы данных: {e}")

if __name__ == "__main__":
    check_database()