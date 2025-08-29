#!/usr/bin/env python3
"""
Скрипт для добавления тестовых данных галереи
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine
from app.models.gallery import Gallery
from sqlalchemy.orm import Session

def add_test_gallery():
    """Добавляет тестовые данные галереи в базу данных"""
    
    # Создаем таблицы если их нет
    from app.models import product, gallery, video, project, certificate, technology, page_content
    from app.core.database import Base
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Проверяем, есть ли уже данные галереи
        existing_galleries = db.query(Gallery).count()
        if existing_galleries > 0:
            print(f"В базе уже есть {existing_galleries} элементов галереи. Пропускаем добавление.")
            return
        
        # Тестовые данные галереи
        test_galleries = [
                                {
                        "title": "Titanium Gold PVD",
                        "description": "Золотое PVD покрытие с зеркальным блеском",
                        "category": "PVD покрытия",
                        "color": "Золотой",
                        "finish": "Зеркальный",
                        "features": ["Высокая износостойкость", "Декоративный эффект", "Устойчивость к коррозии"],
                        "status": "active",
                        "sort_order": 1
                    },
                    {
                        "title": "Titanium Bronze PVD",
                        "description": "Бронзовое PVD покрытие с теплым оттенком",
                        "category": "PVD покрытия",
                        "color": "Бронзовый",
                        "finish": "Матовая",
                        "features": ["Теплый оттенок", "Матовая текстура", "Долговечность"],
                        "status": "active",
                        "sort_order": 2
                    },
                    {
                        "title": "Titanium Black PVD",
                        "description": "Черное PVD покрытие с глубоким цветом",
                        "category": "PVD покрытия",
                        "color": "Черный",
                        "finish": "Матовая",
                        "features": ["Глубокий черный цвет", "Современный дизайн", "Универсальность"],
                        "status": "active",
                        "sort_order": 3
                    },
                    {
                        "title": "Titanium Rainbow PVD",
                        "description": "Радужное PVD покрытие с переливающимися цветами",
                        "category": "PVD покрытия",
                        "color": "Радужный",
                        "finish": "Переливающийся",
                        "features": ["Уникальный эффект", "Переливающиеся цвета", "Премиум качество"],
                        "status": "active",
                        "sort_order": 4
                    },
                    {
                        "title": "Патинированная сталь - Антик",
                        "description": "Классическое патинирование под старину",
                        "category": "Патинирование",
                        "color": "Античный",
                        "finish": "Текстурированная",
                        "features": ["Классический стиль", "Античный эффект", "Текстурированная поверхность"],
                        "status": "active",
                        "sort_order": 5
                    },
                    {
                        "title": "Патинированная сталь - Винтаж",
                        "description": "Винтажное патинирование с эффектом времени",
                        "category": "Патинирование",
                        "color": "Винтажный",
                        "finish": "Состаренная",
                        "features": ["Винтажный стиль", "Эффект времени", "Уникальная текстура"],
                        "status": "active",
                        "sort_order": 6
                    },
                    {
                        "title": "Геометрический узор",
                        "description": "Современный геометрический узор с точным травлением",
                        "category": "Травление узоров",
                        "color": "Металлический",
                        "finish": "Текстурированная",
                        "features": ["Геометрические формы", "Точное травление", "Современный дизайн"],
                        "status": "active",
                        "sort_order": 7
                    },
                    {
                        "title": "Флористический узор",
                        "description": "Элегантный цветочный узор с природными мотивами",
                        "category": "Травление узоров",
                        "color": "Металлический",
                        "finish": "Текстурированная",
                        "features": ["Цветочные мотивы", "Природные узоры", "Элегантность"],
                        "status": "active",
                        "sort_order": 8
                    }
        ]
        
        # Добавляем элементы галереи
        for gallery_data in test_galleries:
            gallery = Gallery(**gallery_data)
            db.add(gallery)
            print(f"Добавлен элемент галереи: {gallery_data['title']}")
        
        db.commit()
        print(f"✅ Успешно добавлено {len(test_galleries)} элементов галереи!")
        
    except Exception as e:
        print(f"❌ Ошибка при добавлении галереи: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Добавляем тестовые данные галереи...")
    add_test_gallery()
    print("✨ Готово!")
