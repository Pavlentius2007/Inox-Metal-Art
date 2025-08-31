#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт для импорта материалов из локальной папки uploads/materials/
"""

import os
import sys
import mimetypes
import shutil
from pathlib import Path
from datetime import datetime

# Добавляем путь к модулям приложения
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine
from app.models.material import Material
from app.models import material
from app.core.database import Base

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

def determine_category(file_name, file_path):
    """Определяет категорию материала по имени файла"""
    file_name_lower = file_name.lower()
    
    # Каталоги
    if any(word in file_name_lower for word in ['каталог', 'catalog', 'catalogue']):
        return 'catalogs'
    
    # Технические характеристики
    if any(word in file_name_lower for word in ['технические', 'spec', 'характеристики', 'technical']):
        return 'specifications'
    
    # Сертификаты
    if any(word in file_name_lower for word in ['сертификат', 'certificate', 'iso', 'сертификация']):
        return 'certificates'
    
    # Руководства
    if any(word in file_name_lower for word in ['руководство', 'manual', 'guide', 'инструкция']):
        return 'guides'
    
    # Брошюры
    if any(word in file_name_lower for word in ['брошюра', 'brochure', 'presentation']):
        return 'brochures'
    
    # Стандарты
    if any(word in file_name_lower for word in ['стандарт', 'standard', 'норма', 'norm']):
        return 'standards'
    
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
    if 'нержавеющая' in file_name_lower or 'stainless' in file_name_lower:
        tags.append('нержавеющая сталь')
    if 'каталог' in file_name_lower:
        tags.append('каталог')
    if 'сертификат' in file_name_lower:
        tags.append('сертификат')
    
    return tags

def scan_materials_folder():
    """Сканирует папку Catalog и возвращает список файлов"""
    materials_dir = Path("../Catalog")
    
    if not materials_dir.exists():
        print(f"Папка {materials_dir} не найдена!")
        return []
    
    materials = []
    
    # Сканируем все файлы в папке
    for file_path in materials_dir.rglob("*"):
        if file_path.is_file():
            # Пропускаем системные файлы
            if file_path.name.startswith('.'):
                continue
                
            file_name = file_path.name
            # Создаем путь в папке uploads/materials/
            target_relative_path = f"materials/{file_name}"
            
            # Определяем категорию и тип файла
            category = determine_category(file_name, target_relative_path)
            file_type = get_file_type(target_relative_path)
            file_size = get_file_size_mb(file_path)
            
            # Генерируем описание на основе имени файла
            if "каталог" in file_name.lower() or "декоративная" in file_name.lower():
                description = "Основной каталог декоративной нержавеющей стали с примерами отделок и применения"
            elif "iso" in file_name.lower():
                description = "Сертификат качества ISO, подтверждающий соответствие международным стандартам"
            elif "rohs" in file_name.lower():
                description = "Сертификат безопасности материалов RoHS, подтверждающий экологическую безопасность"
            elif "leed" in file_name.lower():
                description = "Сертификат зеленого строительства LEED для экологичных проектов"
            elif "salt spray" in file_name.lower():
                description = "Сертификат испытаний на коррозионную стойкость (солевой туман)"
            elif "anti" in file_name.lower() and "microbial" in file_name.lower():
                description = "Результаты испытаний антимикробных свойств покрытий"
            elif "elevator" in file_name.lower() or "лифт" in file_name.lower():
                description = "Каталог решений для лифтового оборудования и декорирования кабин"
            elif "interior" in file_name.lower():
                description = "Каталог решений для интерьерного применения декоративной нержавейки"
            elif "exterior" in file_name.lower():
                description = "Каталог решений для наружного применения и фасадных систем"
            elif "handrail" in file_name.lower():
                description = "Каталог декоративных поручней для лифтов и лестниц"
            else:
                description = f"Техническая документация: {file_name}"
            
            # Генерируем теги
            tags = generate_tags(file_name, category)
            
            material_data = {
                "name": file_name,
                "description": description,
                "category": category,
                "file_type": file_type,
                "file_size": file_size,
                "file_path": target_relative_path,
                "download_url": target_relative_path,
                "tags": tags,
                "is_active": True,
                "sort_order": len(materials) + 1,
                "is_featured": "каталог" in file_name.lower() or "декоративная" in file_name.lower()
            }
            
            materials.append(material_data)
            print(f"Найден файл: {file_name} -> {category}")
    
    return materials

def copy_files_to_uploads(materials_data):
    """Копирует файлы из Catalog в uploads/materials/"""
    catalog_dir = Path("../Catalog")
    uploads_dir = Path("uploads/materials")
    
    # Создаем папку uploads/materials если её нет
    uploads_dir.mkdir(parents=True, exist_ok=True)
    
    for material_data in materials_data:
        source_file = catalog_dir / material_data["name"]
        target_file = uploads_dir / material_data["name"]
        
        if source_file.exists():
            try:
                shutil.copy2(source_file, target_file)
                print(f"✅ Скопирован: {material_data['name']}")
            except Exception as e:
                print(f"❌ Ошибка копирования {material_data['name']}: {e}")
        else:
            print(f"⚠️ Файл не найден: {source_file}")

def import_materials_to_db(materials_data):
    """Импортирует материалы в базу данных"""
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
        
        # Добавляем новые материалы
        for material_data in materials_data:
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
        print(f"Успешно импортировано {len(materials_data)} материалов!")
        
    except Exception as e:
        print(f"Ошибка при импорте: {e}")
        db.rollback()
    finally:
        db.close()

def main():
    """Основная функция"""
    print("🔍 Сканирую папку materials...")
    
    # Сканируем папку
    materials = scan_materials_folder()
    
    if not materials:
        print("❌ Файлы не найдены!")
        return
    
    print(f"📁 Найдено {len(materials)} файлов")
    
    # Копируем файлы
    print("📋 Копирую файлы в uploads/materials/...")
    copy_files_to_uploads(materials)
    
    # Импортируем в базу
    print("💾 Импортирую в базу данных...")
    import_materials_to_db(materials)
    
    print("✅ Импорт завершен!")

if __name__ == "__main__":
    main()
