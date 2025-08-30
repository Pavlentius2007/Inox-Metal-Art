#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Скрипт для добавления тестовых данных в базу данных
"""

import os
import json
from datetime import datetime
from app.core.database import SessionLocal, engine
from app.models.product import Product
from sqlalchemy.orm import Session

def create_test_image_path(text, filename):
    """Создает путь к тестовому изображению (без реального создания файла)"""
    # Просто создаем папку и возвращаем путь
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    print(f"Создан путь для изображения: {filename}")
    return filename

def add_test_products():
    """Добавляет тестовые продукты в базу данных"""
    
    # Создаем таблицы если их нет
    from app.models import product, gallery, video, project, certificate, technology, page_content
    from app.core.database import Base
    Base.metadata.create_all(bind=engine)
    
    # Создаем пути для тестовых изображений
    test_images = [
        ("uploads/products/nano_antibacterial.jpg", "NAS™"),
        ("uploads/products/nano_scratch.jpg", "NSR™"),
        ("uploads/products/advanced_pvd.jpg", "Advanced PVD"),
        ("uploads/products/artbrush.jpg", "ArtBrush™"),
        ("uploads/products/patina.jpg", "Patina"),
        ("uploads/products/bead_blast.jpg", "Bead Blast"),
        ("uploads/products/hairline.jpg", "Hairline"),
        ("uploads/products/n8_mirror.jpg", "N8 Mirror"),
        ("uploads/products/metamorphose_3d.jpg", "Metamorphose 3D")
    ]
    
    for image_path, text in test_images:
        create_test_image_path(text, image_path)
    
    db = SessionLocal()
    
    try:
        # Проверяем, есть ли уже продукты
        existing_products = db.query(Product).count()
        if existing_products > 0:
            print(f"В базе уже есть {existing_products} продуктов. Пропускаем добавление.")
            return
        
        # Реальные материалы с сайта Inox Metal Art
        test_products = [
            {
                "name": "Nano Antibacterial Surface (NAS™)",
                "category": "Защитные покрытия",
                "description": "Уникальное покрытие, сочетающее антибактериальные и устойчивые к отпечаткам пальцев свойства. Идеально подходит для мест с высокими требованиями к гигиене, таких как больницы, аэропорты и лифты.",
                "features": ["Антибактериальные свойства", "Устойчивость к отпечаткам пальцев", "Высокие гигиенические стандарты", "Идеально для медицинских учреждений"],
                "image_path": "uploads/products/nano_antibacterial.jpg",
                "status": "active"
            },
            {
                "name": "Nano Scratch Resistant (NSR™)",
                "category": "Защитные покрытия",
                "description": "Покрытие, обеспечивающее поверхность, в четыре раза более твердую, чем обычная нержавеющая сталь, с твердостью 578 HV. Идеально для областей с частым износом.",
                "features": ["Твердость 578 HV", "В 4 раза тверже обычной стали", "Идеально для лифтов и кухонь", "Защита от царапин"],
                "image_path": "uploads/products/nano_scratch.jpg",
                "status": "active"
            },
            {
                "name": "Advanced Ti (PVD) Coating",
                "category": "Декоративные покрытия",
                "description": "Современный процесс PVD обеспечивает яркие, устойчивые к коррозии цвета, сохраняющие свою яркость десятилетиями. Идеально для премиальных архитектурных дизайнов.",
                "features": ["Яркие декоративные цвета", "Устойчивость к коррозии", "30+ лет проверенной надежности", "Премиальное качество"],
                "image_path": "uploads/products/advanced_pvd.jpg",
                "status": "active"
            },
            {
                "name": "ArtBrush™",
                "category": "Декоративные покрытия",
                "description": "Ручная отделка с поразительным 3D-эффектом, разработанная для скрытия царапин в местах с высокой проходимостью. Сочетает ремесленное мастерство и долговечность.",
                "features": ["3D-эффект", "Ручная отделка", "Скрывает царапины", "Широкий выбор PVD-цветов"],
                "image_path": "uploads/products/artbrush.jpg",
                "status": "active"
            },
            {
                "name": "Patina",
                "category": "Декоративные покрытия",
                "description": "Классическая патина, создающая эффект состаренной бронзы или меди. Идеально для исторических зданий и классических интерьеров.",
                "features": ["Классический эффект состаренности", "Эффект бронзы/меди", "Исторический стиль", "Долговечность"],
                "image_path": "uploads/products/patina.jpg",
                "status": "active"
            },
            {
                "name": "Bead Blast",
                "category": "Текстурированные поверхности",
                "description": "Матовая поверхность с равномерной шероховатостью, созданная с помощью пескоструйной обработки. Идеально для современных минималистичных дизайнов.",
                "features": ["Матовая поверхность", "Равномерная шероховатость", "Современный минимализм", "Скрывает дефекты"],
                "image_path": "uploads/products/bead_blast.jpg",
                "status": "active"
            },
            {
                "name": "Hairline",
                "category": "Текстурированные поверхности",
                "description": "Тонкие параллельные линии, создающие элегантную текстуру. Один из самых популярных вариантов для коммерческих и жилых помещений.",
                "features": ["Тонкие параллельные линии", "Элегантная текстура", "Популярный выбор", "Универсальность"],
                "image_path": "uploads/products/hairline.jpg",
                "status": "active"
            },
            {
                "name": "N8 Mirror",
                "category": "Полированные поверхности",
                "description": "Высокоглянцевая поверхность с отражающей способностью 95%. Идеально для премиальных интерьеров и архитектурных элементов.",
                "features": ["95% отражающая способность", "Высокий глянец", "Премиальное качество", "Архитектурные элементы"],
                "image_path": "uploads/products/n8_mirror.jpg",
                "status": "active"
            },
            {
                "name": "Metamorphose 3D",
                "category": "3D текстуры",
                "description": "Инновационная 3D текстура, создающая объемный эффект на поверхности. Идеально для создания уникальных дизайнерских решений.",
                "features": ["3D текстура", "Объемный эффект", "Уникальный дизайн", "Инновационность"],
                "image_path": "uploads/products/metamorphose_3d.jpg",
                "status": "active"
            }
        ]
        
        # Добавляем продукты в базу данных
        for product_data in test_products:
            # Преобразуем features в JSON строку
            features_json = json.dumps(product_data["features"], ensure_ascii=False)
            
            product = Product(
                name=product_data["name"],
                category=product_data["category"],
                description=product_data["description"],
                features=features_json,
                image_path=product_data["image_path"],
                status=product_data["status"]
            )
            
            db.add(product)
            print(f"Добавлен продукт: {product_data['name']}")
        
        # Сохраняем изменения
        db.commit()
        print(f"Успешно добавлено {len(test_products)} тестовых продуктов!")
        
    except Exception as e:
        print(f"Ошибка при добавлении тестовых продуктов: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    add_test_products()
