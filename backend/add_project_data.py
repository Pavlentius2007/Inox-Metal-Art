#!/usr/bin/env python3
"""
Скрипт для добавления тестовых данных проектов
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.core.database import SessionLocal, engine
from app.models.project import Project
from sqlalchemy.orm import Session

def add_test_projects():
    """Добавляет тестовые данные проектов в базу данных"""
    
    # Создаем таблицы если их нет
    from app.models import product, gallery, project, video, certificate, technology, page_content
    from app.core.database import Base
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Проверяем, есть ли уже данные проектов
        existing_projects = db.query(Project).count()
        if existing_projects > 0:
            print(f"В базе уже есть {existing_projects} проектов. Пропускаем добавление.")
            return
        
        # Реальные проекты с сайта Inox Metal Art
        test_projects = [
            {
                "title": "Grand Avenue, Кувейт",
                "description": "Престижный проект в Кувейте с использованием Bead Blast (BB) отделки с PVD-покрытием цвета Light Bronze и покрытием NAS™. Создан уникальный фасад, сочетающий элегантность и функциональность.",
                "short_description": "Престижный проект с BB отделкой и Light Bronze PVD",
                "category": "Коммерческие",
                "client": "Grand Avenue Development",
                "location": "Кувейт",
                "area": "35,000 м²",
                "completion_date": "2023 год",
                "features": ["Bead Blast отделка", "Light Bronze PVD", "NAS™ покрытие", "Престижный дизайн"],
                "technologies": ["Bead Blast (BB)", "PVD Light Bronze", "Nano Antibacterial Surface (NAS™)"],
                "status": "active",
                "sort_order": 1,
                "is_featured": True
            },
            {
                "title": "Eye of Qatar",
                "description": "Архитектурная достопримечательность Катара с применением Hairline (HL) отделки с PVD-покрытием цвета Blue и покрытием NAS™. Проект демонстрирует инновационный подход к дизайну фасадов.",
                "short_description": "Архитектурная достопримечательность с Blue PVD",
                "category": "Общественные",
                "client": "Qatar Foundation",
                "location": "Катар",
                "area": "18,000 м²",
                "completion_date": "2023 год",
                "features": ["Hairline отделка", "Blue PVD покрытие", "NAS™ защита", "Инновационный дизайн"],
                "technologies": ["Hairline (HL)", "PVD Blue", "Nano Antibacterial Surface (NAS™)"],
                "status": "active",
                "sort_order": 2,
                "is_featured": True
            },
            {
                "title": "Dubai Frame",
                "description": "Знаковый проект в Дубае с использованием Metamorphose 3D отделки в N8 Mirror с PVD-покрытием цвета Armani Gold. Создан уникальный архитектурный объект, ставший символом города.",
                "short_description": "Знаковый проект с 3D отделкой и Armani Gold PVD",
                "category": "Общественные",
                "client": "Dubai Municipality",
                "location": "Дубай, ОАЭ",
                "area": "25,000 м²",
                "completion_date": "2022 год",
                "features": ["Metamorphose 3D отделка", "N8 Mirror", "Armani Gold PVD", "Знаковый объект"],
                "technologies": ["Metamorphose 3D", "N8 Mirror", "PVD Armani Gold"],
                "status": "active",
                "sort_order": 3,
                "is_featured": True
            },
            {
                "title": "Petronas Towers, Малайзия",
                "description": "Легендарные башни-близнецы в Куала-Лумпуре с применением Hairline (HL) отделки. Проект демонстрирует классическую элегантность и премиальное качество отделки.",
                "short_description": "Легендарные башни-близнецы с Hairline отделкой",
                "category": "Коммерческие",
                "client": "Petronas",
                "location": "Куала-Лумпур, Малайзия",
                "area": "395,000 м²",
                "completion_date": "1998 год",
                "features": ["Hairline отделка", "Классическая элегантность", "Премиальное качество", "Мировая известность"],
                "technologies": ["Hairline (HL)", "Премиальная отделка"],
                "status": "active",
                "sort_order": 4,
                "is_featured": False
            },
            {
                "title": "Lusail Marina Twin Towers, Катар",
                "description": "Роскошные башни в Лусаиле с использованием N8 Mirror отделки с PVD-покрытием цвета Rose Gold. Создан эффект премиального качества и современной элегантности.",
                "short_description": "Роскошные башни с Rose Gold PVD покрытием",
                "category": "Жилые",
                "client": "Qatar Diar",
                "location": "Лусаил, Катар",
                "area": "120,000 м²",
                "completion_date": "2023 год",
                "features": ["N8 Mirror отделка", "Rose Gold PVD", "Роскошный дизайн", "Премиальное качество"],
                "technologies": ["N8 Mirror", "PVD Rose Gold"],
                "status": "active",
                "sort_order": 5,
                "is_featured": False
            },
            {
                "title": "Wat Phra Dhammakaya, Таиланд",
                "description": "Буддийский храм с применением Hairline (HL) отделки с PVD-покрытием цвета Gold, Mirror и PVD-покрытием цвета Rainbow. Создана атмосфера духовности и величия.",
                "short_description": "Буддийский храм с Gold и Rainbow PVD покрытиями",
                "category": "Общественные",
                "client": "Wat Phra Dhammakaya",
                "location": "Патхум-Тхани, Таиланд",
                "area": "80,000 м²",
                "completion_date": "2022 год",
                "features": ["Hairline отделка", "Gold PVD", "Mirror отделка", "Rainbow PVD"],
                "technologies": ["Hairline (HL)", "PVD Gold", "N8 Mirror", "PVD Rainbow"],
                "status": "active",
                "sort_order": 6,
                "is_featured": False
            },
            {
                "title": "Louis Vuitton, Франция",
                "description": "Флагманский магазин в Париже с использованием Hairline (HL) отделки с PVD-покрытием цвета Gold. Создан интерьер, отражающий роскошь и элегантность бренда.",
                "short_description": "Флагманский магазин с Gold PVD покрытием",
                "category": "Коммерческие",
                "client": "Louis Vuitton",
                "location": "Париж, Франция",
                "area": "2,500 м²",
                "completion_date": "2023 год",
                "features": ["Hairline отделка", "Gold PVD", "Роскошный интерьер", "Премиум брендинг"],
                "technologies": ["Hairline (HL)", "PVD Gold"],
                "status": "active",
                "sort_order": 7,
                "is_featured": False
            },
            {
                "title": "Gucci Stores, по всему миру",
                "description": "Сеть магазинов Gucci по всему миру с применением N8 Mirror отделки с PVD-покрытием цвета Brass и Hairline (HL) отделки с PVD-покрытием цвета Brass. Создан единый стиль премиальных интерьеров.",
                "short_description": "Сеть магазинов с Brass PVD покрытием",
                "category": "Коммерческие",
                "client": "Gucci",
                "location": "По всему миру",
                "area": "150,000 м²",
                "completion_date": "2022-2024 годы",
                "features": ["N8 Mirror отделка", "Brass PVD", "Hairline отделка", "Единый стиль"],
                "technologies": ["N8 Mirror", "PVD Brass", "Hairline (HL)"],
                "status": "active",
                "sort_order": 8,
                "is_featured": False
            }
        ]
        
        # Добавляем проекты
        for project_data in test_projects:
            project = Project(**project_data)
            db.add(project)
            print(f"Добавлен проект: {project_data['title']}")
        
        db.commit()
        print(f"✅ Успешно добавлено {len(test_projects)} реальных проектов с сайта Inox Metal Art!")
        
    except Exception as e:
        print(f"❌ Ошибка при добавлении проектов: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Добавляем тестовые данные проектов...")
    add_test_projects()
    print("✨ Готово!")
