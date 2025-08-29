#!/usr/bin/env python3
"""
Скрипт для добавления тестовых данных в базу
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine
from app.models.product import Product
from sqlalchemy.orm import Session
from PIL import Image, ImageDraw, ImageFont
import io

def create_test_image(text, filename, size=(400, 300)):
    """Создает тестовое изображение с текстом"""
    # Создаем изображение
    img = Image.new('RGB', size, color='#f0f0f0')
    draw = ImageDraw.Draw(img)
    
    # Добавляем текст
    try:
        # Пытаемся использовать системный шрифт
        font = ImageFont.truetype("arial.ttf", 24)
    except:
        # Если не получилось, используем стандартный
        font = ImageFont.load_default()
    
    # Центрируем текст
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (size[0] - text_width) // 2
    y = (size[1] - text_height) // 2
    
    # Рисуем текст
    draw.text((x, y), text, fill='#333333', font=font)
    
    # Сохраняем изображение
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    img.save(filename, 'JPEG', quality=85)
    print(f"Создано изображение: {filename}")

def add_test_products():
    """Добавляет тестовые продукты в базу данных"""
    
    # Создаем таблицы если их нет
    from app.models import product, gallery, video, project, certificate, technology, page_content
    from app.core.database import Base
    Base.metadata.create_all(bind=engine)
    
    # Создаем тестовые изображения для материалов
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
        create_test_image(text, image_path)
    
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
                "description": "Передает вечную красоту состаренного металла или камня, создавая ощущение связи и доверия. Идеально для создания уникальных и элегантных интерьеров.",
                "features": ["Состаренный эффект", "Винтажный стиль", "Уникальная текстура", "Элегантность"],
                "image_path": "uploads/products/patina.jpg",
                "status": "active"
            },
            {
                "name": "Bead Blast (BB)",
                "category": "Текстурированные покрытия",
                "description": "Матовая отделка с равномерной текстурой, создающая современный и элегантный вид. Отлично подходит для фасадов и интерьеров.",
                "features": ["Матовая отделка", "Равномерная текстура", "Современный вид", "Универсальность"],
                "image_path": "uploads/products/bead_blast.jpg",
                "status": "active"
            },
            {
                "name": "Hairline (HL)",
                "category": "Текстурированные покрытия",
                "description": "Классическая линейная отделка, создающая элегантные горизонтальные линии. Широко используется в премиальных проектах.",
                "features": ["Линейная текстура", "Классический стиль", "Премиальное качество", "Элегантность"],
                "image_path": "uploads/products/hairline.jpg",
                "status": "active"
            },
            {
                "name": "N8 Mirror",
                "category": "Зеркальные покрытия",
                "description": "Высококачественное зеркальное покрытие с идеальной отражающей способностью. Создает эффект роскоши и пространства.",
                "features": ["Зеркальная поверхность", "Высокая отражающая способность", "Роскошный вид", "Расширение пространства"],
                "image_path": "uploads/products/n8_mirror.jpg",
                "status": "active"
            },
            {
                "name": "Metamorphose 3D",
                "category": "3D текстуры",
                "description": "Инновационная 3D-текстура, создающая объемные эффекты на поверхности. Уникальное решение для эксклюзивных проектов.",
                "features": ["3D-текстура", "Объемные эффекты", "Инновационность", "Эксклюзивность"],
                "image_path": "uploads/products/metamorphose_3d.jpg",
                "status": "active"
            }
        ]
        
        # Добавляем продукты
        for product_data in test_products:
            product = Product(**product_data)
            db.add(product)
            print(f"Добавлен продукт: {product_data['name']} с изображением: {product_data['image_path']}")
        
        db.commit()
        print(f"✅ Успешно добавлено {len(test_products)} тестовых продуктов!")
        
    except Exception as e:
        print(f"❌ Ошибка при добавлении продуктов: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Добавляем тестовые продукты...")
    add_test_products()
    print("✨ Готово!")
