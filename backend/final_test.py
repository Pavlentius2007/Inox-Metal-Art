#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Финальный тест всех компонентов импорта материалов
"""

import os
import sys
from pathlib import Path

# Добавляем путь к модулям приложения
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_file_structure():
    """Тестирует структуру файлов"""
    print("🔍 Тестирую структуру файлов...")
    
    # Проверяем папку uploads/materials
    uploads_dir = Path("uploads/materials")
    if uploads_dir.exists():
        files = list(uploads_dir.glob("*"))
        print(f"✅ Папка uploads/materials существует: {len(files)} файлов")
        
        # Показываем первые 5 файлов
        for i, file in enumerate(files[:5]):
            print(f"  {i+1}. {file.name}")
    else:
        print("❌ Папка uploads/materials не найдена")
    
    # Проверяем папку Catalog
    catalog_dir = Path("../Catalog")
    if catalog_dir.exists():
        files = list(catalog_dir.glob("*"))
        print(f"✅ Папка Catalog существует: {len(files)} файлов")
    else:
        print("❌ Папка Catalog не найдена")

def test_database_connection():
    """Тестирует подключение к базе данных"""
    print("\n💾 Тестирую подключение к базе данных...")
    
    try:
        from app.core.database import SessionLocal, engine
        from app.models.material import Material
        
        # Создаем таблицы если их нет
        from app.core.database import Base
        Base.metadata.create_all(bind=engine)
        
        # Проверяем количество материалов
        db = SessionLocal()
        count = db.query(Material).count()
        print(f"✅ База данных доступна: {count} материалов")
        
        # Показываем категории
        categories = db.query(Material.category).distinct().all()
        print(f"📂 Категории: {[cat[0] for cat in categories]}")
        
        db.close()
        
    except ImportError as e:
        print(f"❌ Ошибка импорта: {e}")
    except Exception as e:
        print(f"❌ Ошибка базы данных: {e}")

def test_api_endpoints():
    """Тестирует API endpoints"""
    print("\n🌐 Тестирую API endpoints...")
    
    try:
        import requests
        
        # Тест основного endpoint
        response = requests.get("http://localhost:8000/api/v1/materials/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ API /materials/ работает: {data.get('total', 0)} материалов")
        else:
            print(f"❌ API /materials/ ошибка: {response.status_code}")
        
        # Тест категорий
        response = requests.get("http://localhost:8000/api/v1/materials/categories")
        if response.status_code == 200:
            categories = response.json()
            print(f"✅ API /categories работает: {len(categories)} категорий")
        else:
            print(f"❌ API /categories ошибка: {response.status_code}")
            
    except ImportError:
        print("⚠️ requests не установлен, пропускаю тест API")
    except requests.exceptions.ConnectionError:
        print("❌ Сервер не запущен. Запустите: python -m uvicorn app.main:app --reload")

def main():
    """Основная функция тестирования"""
    print("🧪 ФИНАЛЬНЫЙ ТЕСТ СИСТЕМЫ ИМПОРТА МАТЕРИАЛОВ")
    print("=" * 60)
    
    test_file_structure()
    test_database_connection()
    test_api_endpoints()
    
    print("\n" + "=" * 60)
    print("✅ Тестирование завершено!")
    print("\n📋 Следующие шаги:")
    print("1. Запустите сервер: python -m uvicorn app.main:app --reload")
    print("2. Откройте админ-панель: http://localhost:3000/admin/import-materials")
    print("3. Проверьте страницу материалов: http://localhost:3000/materials")

if __name__ == "__main__":
    main()


