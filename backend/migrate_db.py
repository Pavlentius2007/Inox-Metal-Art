#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from app.core.database import engine
from sqlalchemy import text

def migrate_database():
    try:
        print("Мигрируем базу данных...")
        
        with engine.connect() as conn:
            # Проверяем, есть ли колонка videos
            result = conn.execute(text("PRAGMA table_info(products)"))
            columns = [row[1] for row in result]  # row[1] - это имя колонки
            print(f"Существующие колонки: {columns}")
            
            if 'videos' not in columns:
                print("Добавляем колонку videos...")
                conn.execute(text("ALTER TABLE products ADD COLUMN videos TEXT"))
                conn.commit()
                print("✅ Колонка videos добавлена")
            else:
                print("✅ Колонка videos уже существует")
                
            # Проверяем другие колонки
            required_columns = ['features', 'images', 'specifications', 'detailed']
            for col in required_columns:
                if col not in columns:
                    print(f"Добавляем колонку {col}...")
                    conn.execute(text(f"ALTER TABLE products ADD COLUMN {col} TEXT"))
                    conn.commit()
                    print(f"✅ Колонка {col} добавлена")
                else:
                    print(f"✅ Колонка {col} уже существует")
                    
        print("🎉 Миграция завершена!")
        
    except Exception as e:
        print(f"❌ Ошибка миграции: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    migrate_database()

