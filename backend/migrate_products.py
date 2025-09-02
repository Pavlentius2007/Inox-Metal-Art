#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Скрипт для миграции базы данных продуктов на новую схему
Добавляет новые поля: specifications, detailed, price, images
"""

import sqlite3
import json
import os
from datetime import datetime

def migrate_products_database():
    """Мигрирует базу данных продуктов на новую схему"""
    
    # Путь к базе данных
    db_path = "inoxmetalart.db"
    
    if not os.path.exists(db_path):
        print(f"База данных {db_path} не найдена!")
        return
    
    # Подключаемся к базе данных
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        print("Начинаем миграцию базы данных продуктов...")
        
        # Проверяем текущую структуру таблицы
        cursor.execute("PRAGMA table_info(products)")
        columns = [column[1] for column in cursor.fetchall()]
        print(f"Текущие колонки: {columns}")
        
        # Добавляем новые колонки, если их нет
        new_columns = [
            ("specifications", "TEXT"),
            ("detailed", "TEXT"),
            ("price", "REAL"),
            ("images", "TEXT")
        ]
        
        for column_name, column_type in new_columns:
            if column_name not in columns:
                print(f"Добавляем колонку {column_name} типа {column_type}")
                cursor.execute(f"ALTER TABLE products ADD COLUMN {column_name} {column_type}")
            else:
                print(f"Колонка {column_name} уже существует")
        
        # Обновляем существующие записи, добавляя значения по умолчанию
        print("Обновляем существующие записи...")
        
        # Получаем все продукты
        cursor.execute("SELECT id, name, category, description, features, image_path, status FROM products")
        products = cursor.fetchall()
        
        for product in products:
            product_id, name, category, description, features, image_path, status = product
            
            # Создаем базовые значения для новых полей
            specifications = {
                "type": "PVD покрытие",
                "thickness": "",
                "hardness": "",
                "colors": [],
                "scratch_resistance": "",
                "effect": "",
                "maintenance": "",
                "eco": "",
                "roughness": "",
                "quality": "",
                "reflection": "",
                "texture": ""
            }
            
            detailed = {
                "technology": "Физическое осаждение из паровой фазы",
                "types": [],
                "colors": [],
                "testing": "",
                "quality": "",
                "experience": "",
                "benefits": [],
                "applications": [],
                "features": []
            }
            
            # Обновляем запись
            cursor.execute("""
                UPDATE products 
                SET specifications = ?, detailed = ?, price = ?, images = ?
                WHERE id = ?
            """, (
                json.dumps(specifications, ensure_ascii=False),
                json.dumps(detailed, ensure_ascii=False),
                0.0,  # Цена по умолчанию
                json.dumps([], ensure_ascii=False),  # Пустой массив изображений
                product_id
            ))
            
            print(f"Обновлен продукт: {name}")
        
        # Сохраняем изменения
        conn.commit()
        print("Миграция завершена успешно!")
        
        # Проверяем результат
        cursor.execute("PRAGMA table_info(products)")
        final_columns = [column[1] for column in cursor.fetchall()]
        print(f"Финальные колонки: {final_columns}")
        
        # Показываем пример обновленной записи
        cursor.execute("SELECT id, name, specifications, detailed, price, images FROM products LIMIT 1")
        sample = cursor.fetchone()
        if sample:
            print(f"\nПример обновленной записи:")
            print(f"ID: {sample[0]}")
            print(f"Название: {sample[1]}")
            print(f"Specifications: {json.loads(sample[2]) if sample[2] else 'None'}")
            print(f"Detailed: {json.loads(sample[3]) if sample[3] else 'None'}")
            print(f"Цена: {sample[4]}")
            print(f"Изображения: {json.loads(sample[5]) if sample[5] else 'None'}")
        
    except Exception as e:
        print(f"Ошибка при миграции: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate_products_database()



