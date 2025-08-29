#!/usr/bin/env python3
"""
Скрипт для инициализации базы данных Inox Metal Art
"""

import sqlite3
import os
from pathlib import Path

def init_database():
    """Инициализация базы данных"""
    
    # Путь к базе данных
    db_path = "inoxmetalart.db"
    
    # Создаем подключение к базе данных
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Читаем SQL схему
        schema_path = Path("database_schema.sql")
        if schema_path.exists():
            with open(schema_path, 'r', encoding='utf-8') as f:
                schema_sql = f.read()
            
            # Выполняем SQL команды
            cursor.executescript(schema_sql)
            conn.commit()
            print("✅ База данных успешно инициализирована")
            
            # Проверяем созданные таблицы
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = cursor.fetchall()
            print(f"📋 Созданные таблицы: {[table[0] for table in tables]}")
            
        else:
            print("❌ Файл database_schema.sql не найден")
            
    except Exception as e:
        print(f"❌ Ошибка при инициализации базы данных: {e}")
        conn.rollback()
        
    finally:
        conn.close()

if __name__ == "__main__":
    print("🚀 Инициализация базы данных Inox Metal Art...")
    init_database()

