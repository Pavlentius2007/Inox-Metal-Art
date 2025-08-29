#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Скрипт для наполнения галереи данными с сайта Inox Metal Art
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine
from app.models.gallery import Gallery
from sqlalchemy.orm import Session
from PIL import Image, ImageDraw, ImageFont
import io

def create_gallery_image(text, filename, size=(800, 600), bg_color='#f8f9fa'):
    """Создает изображение для галереи с текстом"""
    # Создаем изображение
    img = Image.new('RGB', size, color=bg_color)
    draw = ImageDraw.Draw(img)
    
    # Добавляем текст
    try:
        # Пытаемся использовать системный шрифт
        font = ImageFont.truetype("arial.ttf", 32)
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
    img.save(filename, 'JPEG', quality=90)
    print(f"Создано изображение: {filename}")

def add_inoxmetalart_gallery():
    """Добавляет данные галереи с сайта Inox Metal Art"""
    
    # Создаем таблицы если их нет
    from app.models import gallery
    from app.core.database import Base
    Base.metadata.create_all(bind=engine)
    
    # Создаем изображения для галереи
    gallery_images = [
        ("uploads/gallery/crystal_series.jpg", "Crystal Series - Easy Clean"),
        ("uploads/gallery/titanium_colors.jpg", "Titanium Colors Stainless Steel"),
        ("uploads/gallery/pvd_gold.jpg", "PVD Gold Coating"),
        ("uploads/gallery/pvd_bronze.jpg", "PVD Bronze Coating"),
        ("uploads/gallery/pvd_blue.jpg", "PVD Blue Coating"),
        ("uploads/gallery/patina_finish.jpg", "Patina Finish"),
        ("uploads/gallery/bead_blast.jpg", "Bead Blast Finish"),
        ("uploads/gallery/hairline_finish.jpg", "Hairline Finish"),
        ("uploads/gallery/mirror_finish.jpg", "Mirror Finish"),
        ("uploads/gallery/3d_texture.jpg", "3D Texture Finish")
    ]
    
    for image_path, text in gallery_images:
        create_gallery_image(text, image_path)
    
    db = SessionLocal()
    
    try:
        # Проверяем, есть ли уже данные в галерее
        existing_gallery = db.query(Gallery).count()
        if existing_gallery > 0:
            print(f"В галерее уже есть {existing_gallery} записей. Пропускаем добавление.")
            return
        
        # Данные галереи с сайта Inox Metal Art
        gallery_items = [
            {
                "title": "Crystal Series - Easy Clean",
                "description": "Инновационная серия покрытий для нержавеющей стали с эффектом легкой очистки. Идеально подходит для кухонных поверхностей, лифтов и медицинских учреждений.",
                "category": "Защитные покрытия",
                "color": "Прозрачный",
                "finish": "Глянцевый",
                "image_path": "uploads/gallery/crystal_series.jpg",
                "thumbnail_path": "uploads/gallery/crystal_series.jpg",
                "features": ["Легкая очистка", "Антибактериальные свойства", "Устойчивость к царапинам", "Гигиеничность"],
                "status": "active",
                "sort_order": 1
            },
            {
                "title": "Titanium Colors Stainless Steel",
                "description": "Эксклюзивная коллекция титановых цветов для нержавеющей стали. Создает уникальные оттенки, которые сохраняют яркость десятилетиями.",
                "category": "Декоративные покрытия",
                "color": "Титановый",
                "finish": "Металлический",
                "image_path": "uploads/gallery/titanium_colors.jpg",
                "thumbnail_path": "uploads/gallery/titanium_colors.jpg",
                "features": ["Уникальные оттенки", "Долговечность", "Устойчивость к коррозии", "Премиальное качество"],
                "status": "active",
                "sort_order": 2
            },
            {
                "title": "PVD Gold Coating",
                "description": "Премиальное золотое покрытие PVD для создания роскошного внешнего вида. Идеально для эксклюзивных проектов и премиум-сегмента.",
                "category": "PVD покрытия",
                "color": "Золотой",
                "finish": "Зеркальный",
                "image_path": "uploads/gallery/pvd_gold.jpg",
                "thumbnail_path": "uploads/gallery/pvd_gold.jpg",
                "features": ["Роскошный внешний вид", "Высокая износостойкость", "Устойчивость к коррозии", "Эксклюзивность"],
                "status": "active",
                "sort_order": 3
            },
            {
                "title": "PVD Bronze Coating",
                "description": "Элегантное бронзовое покрытие PVD для создания теплых, привлекательных оттенков. Подходит для классических и современных интерьеров.",
                "category": "PVD покрытия",
                "color": "Бронзовый",
                "finish": "Матовая",
                "image_path": "uploads/gallery/pvd_bronze.jpg",
                "thumbnail_path": "uploads/gallery/pvd_bronze.jpg",
                "features": ["Теплые оттенки", "Элегантность", "Классический стиль", "Универсальность"],
                "status": "active",
                "sort_order": 4
            },
            {
                "title": "PVD Blue Coating",
                "description": "Современное синее покрытие PVD для создания ярких акцентов в дизайне. Идеально для современных и футуристических проектов.",
                "category": "PVD покрытия",
                "color": "Синий",
                "finish": "Глянцевый",
                "image_path": "uploads/gallery/pvd_blue.jpg",
                "thumbnail_path": "uploads/gallery/pvd_blue.jpg",
                "features": ["Яркие акценты", "Современность", "Футуризм", "Уникальность"],
                "status": "active",
                "sort_order": 5
            },
            {
                "title": "Patina Finish",
                "description": "Искусственное патинирование для создания эффекта состаренной поверхности. Придает изделиям характер и историческую ценность.",
                "category": "Декоративные покрытия",
                "color": "Зеленовато-коричневый",
                "finish": "Текстурированная",
                "image_path": "uploads/gallery/patina_finish.jpg",
                "thumbnail_path": "uploads/gallery/patina_finish.jpg",
                "features": ["Эффект состаренности", "Характер", "Историческая ценность", "Уникальность"],
                "status": "active",
                "sort_order": 6
            },
            {
                "title": "Bead Blast Finish",
                "description": "Матовая отделка с помощью пескоструйной обработки. Создает мягкую, приятную на ощупь поверхность с равномерной текстурой.",
                "category": "Механическая отделка",
                "color": "Серебристый",
                "finish": "Матовая",
                "image_path": "uploads/gallery/bead_blast.jpg",
                "thumbnail_path": "uploads/gallery/bead_blast.jpg",
                "features": ["Мягкая поверхность", "Равномерная текстура", "Практичность", "Современность"],
                "status": "active",
                "sort_order": 7
            },
            {
                "title": "Hairline Finish",
                "description": "Классическая линейная отделка для создания элегантных продольных линий. Идеально для фасадов и интерьерных элементов.",
                "category": "Механическая отделка",
                "color": "Серебристый",
                "finish": "Линейная",
                "image_path": "uploads/gallery/hairline_finish.jpg",
                "thumbnail_path": "uploads/gallery/hairline_finish.jpg",
                "features": ["Элегантность", "Классический стиль", "Универсальность", "Премиум качество"],
                "status": "active",
                "sort_order": 8
            },
            {
                "title": "Mirror Finish",
                "description": "Зеркальная полировка для создания отражающей поверхности. Максимальная гладкость и блеск для эксклюзивных проектов.",
                "category": "Механическая отделка",
                "color": "Серебристый",
                "finish": "Зеркальная",
                "image_path": "uploads/gallery/mirror_finish.jpg",
                "thumbnail_path": "uploads/gallery/mirror_finish.jpg",
                "features": ["Максимальный блеск", "Отражающая поверхность", "Эксклюзивность", "Роскошь"],
                "status": "active",
                "sort_order": 9
            },
            {
                "title": "3D Texture Finish",
                "description": "Инновационная 3D текстура для создания объемных эффектов на поверхности. Современный подход к дизайну нержавеющей стали.",
                "category": "Инновационные покрытия",
                "color": "Многоцветный",
                "finish": "3D текстурированная",
                "image_path": "uploads/gallery/3d_texture.jpg",
                "thumbnail_path": "uploads/gallery/3d_texture.jpg",
                "features": ["3D эффект", "Объемность", "Инновационность", "Уникальность"],
                "status": "active",
                "sort_order": 10
            }
        ]
        
        # Добавляем записи в базу данных
        for item_data in gallery_items:
            gallery_item = Gallery(**item_data)
            db.add(gallery_item)
            print(f"Добавлен элемент галереи: {item_data['title']}")
        
        db.commit()
        print(f"\n✅ Успешно добавлено {len(gallery_items)} элементов в галерею!")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Ошибка при добавлении данных: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    print("Наполняем галерею данными с сайта Inox Metal Art...")
    add_inoxmetalart_gallery()
    print("Готово!")
