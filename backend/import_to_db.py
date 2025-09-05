#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Импорт материалов в базу данных
"""

import os
import sys
from pathlib import Path
from datetime import datetime

# Добавляем путь к модулям приложения
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from app.core.database import SessionLocal, engine
    from app.models.material import Material
    from app.core.database import Base
    print("Database imports OK")
except ImportError as e:
    print(f"Import error: {e}")
    sys.exit(1)

def get_file_size_mb(file_path):
    """Получает размер файла в МБ"""
    try:
        size_bytes = os.path.getsize(file_path)
        size_mb = size_bytes / (1024 * 1024)
        return f"{size_mb:.1f} MB"
    except:
        return "0 MB"

def get_file_type(file_path):
    """Определяет тип файла по расширению"""
    ext = Path(file_path).suffix.lower()
    if ext == '.pdf':
        return 'PDF'
    elif ext in ['.jpg', '.jpeg', '.png', '.gif']:
        return 'Image'
    elif ext in ['.doc', '.docx']:
        return 'Word'
    elif ext in ['.xls', '.xlsx']:
        return 'Excel'
    else:
        return 'Document'

def determine_category(file_name):
    """Определяет категорию материала по имени файла"""
    file_name_lower = file_name.lower()
    
    # Каталоги
    if any(word in file_name_lower for word in ['каталог', 'catalog', 'catalogue', 'decorative']):
        return 'catalogs'
    
    # Сертификаты
    if any(word in file_name_lower for word in ['iso', 'leed', 'rohs', 'certificate']):
        return 'certificates'
    
    # Технические характеристики
    if any(word in file_name_lower for word in ['spec', 'technical', 'material safety']):
        return 'specifications'
    
    # Применение
    if any(word in file_name_lower for word in ['interior', 'exterior', 'elevator', 'handrail']):
        return 'applications'
    
    # Дизайн
    if any(word in file_name_lower for word in ['design', 'art', 'pattern', 'texture']):
        return 'designs'
    
    # По умолчанию
    return 'other'

def generate_tags(file_name, category):
    """Генерирует теги на основе имени файла и категории"""
    tags = []
    
    # Добавляем категорию как тег
    tags.append(category)
    
    # Добавляем теги на основе имени файла
    file_name_lower = file_name.lower()
    
    if 'pdf' in file_name_lower:
        tags.append('PDF')
    if 'iso' in file_name_lower:
        tags.append('ISO')
    if 'pvd' in file_name_lower:
        tags.append('PVD')
    if 'stainless' in file_name_lower:
        tags.append('нержавеющая сталь')
    if 'elevator' in file_name_lower:
        tags.append('лифт')
    if 'interior' in file_name_lower:
        tags.append('интерьер')
    if 'exterior' in file_name_lower:
        tags.append('экстерьер')
    if 'rohs' in file_name_lower:
        tags.append('RoHS')
    if 'leed' in file_name_lower:
        tags.append('LEED')
    
    return tags

def generate_description(file_name):
    """Генерирует описание на основе имени файла"""
    file_name_lower = file_name.lower()
    
    if "каталог" in file_name_lower or "декоративная" in file_name_lower:
        return "Основной каталог декоративной нержавеющей стали с примерами отделок и применения"
    elif "iso" in file_name_lower:
        return "Сертификат качества ISO, подтверждающий соответствие международным стандартам"
    elif "rohs" in file_name_lower:
        return "Сертификат безопасности материалов RoHS, подтверждающий экологическую безопасность"
    elif "leed" in file_name_lower:
        return "Сертификат зеленого строительства LEED для экологичных проектов"
    elif "salt spray" in file_name_lower:
        return "Сертификат испытаний на коррозионную стойкость (солевой туман)"
    elif "anti" in file_name_lower and "microbial" in file_name_lower:
        return "Результаты испытаний антимикробных свойств покрытий"
    elif "elevator" in file_name_lower:
        return "Каталог решений для лифтового оборудования и декорирования кабин"
    elif "interior" in file_name_lower:
        return "Каталог решений для интерьерного применения декоративной нержавейки"
    elif "exterior" in file_name_lower:
        return "Каталог решений для наружного применения и фасадных систем"
    elif "handrail" in file_name_lower:
        return "Каталог декоративных поручней для лифтов и лестниц"
    else:
        return f"Техническая документация: {file_name}"

def scan_and_import():
    """Сканирует папку materials и импортирует в базу"""
    materials_dir = Path("uploads/materials")
    
    if not materials_dir.exists():
        print(f"Папка {materials_dir} не найдена!")
        return
    
    # Создаем таблицы если их нет
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Проверяем, есть ли уже материалы в базе
        existing_count = db.query(Material).count()
        if existing_count > 0:
            print(f"В базе уже есть {existing_count} материалов. Очищаем...")
            db.query(Material).delete()
            db.commit()
        
        # Сканируем файлы
        materials = []
        for file_path in materials_dir.glob("*"):
            if file_path.is_file():
                file_name = file_path.name
                relative_path = f"materials/{file_name}"
                
                # Определяем категорию и тип файла
                category = determine_category(file_name)
                file_type = get_file_type(relative_path)
                file_size = get_file_size_mb(file_path)
                
                # Генерируем описание и теги
                description = generate_description(file_name)
                tags = generate_tags(file_name, category)
                
                material_data = {
                    "name": file_name,
                    "description": description,
                    "category": category,
                    "file_type": file_type,
                    "file_size": file_size,
                    "file_path": relative_path,
                    "download_url": relative_path,
                    "tags": tags,
                    "is_active": True,
                    "sort_order": len(materials) + 1,
                    "is_featured": "каталог" in file_name.lower() or "декоративная" in file_name.lower()
                }
                
                materials.append(material_data)
                print(f"Найден файл: {file_name} -> {category}")
        
        # Добавляем в базу
        for material_data in materials:
            material = Material(
                name=material_data["name"],
                description=material_data["description"],
                category=material_data["category"],
                file_type=material_data["file_type"],
                file_size=material_data["file_size"],
                file_path=material_data["file_path"],
                download_url=material_data["download_url"],
                tags=material_data["tags"],
                is_active=material_data["is_active"],
                sort_order=material_data["sort_order"],
                is_featured=material_data["is_featured"],
                upload_date=datetime.now(),
                downloads=0
            )
            db.add(material)
        
        db.commit()
        print(f"✅ Успешно импортировано {len(materials)} материалов!")
        
    except Exception as e:
        print(f"❌ Ошибка при импорте: {e}")
        db.rollback()
        import traceback
        traceback.print_exc()
    finally:
        db.close()

def main():
    """Основная функция"""
    print("🔍 Сканирую папку materials и импортирую в базу...")
    scan_and_import()
    print("✅ Импорт завершен!")

if __name__ == "__main__":
    main()



