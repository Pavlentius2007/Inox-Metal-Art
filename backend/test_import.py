#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Простой тест импорта материалов
"""

import os
import sys
from pathlib import Path

# Добавляем путь к модулям приложения
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

def test_scan():
    """Тестируем сканирование папки Catalog"""
    catalog_dir = Path("../Catalog")
    
    if not catalog_dir.exists():
        print(f"❌ Папка {catalog_dir} не найдена!")
        return
    
    print(f"✅ Папка {catalog_dir} найдена")
    
    # Считаем файлы
    files = list(catalog_dir.glob("*"))
    pdf_files = [f for f in files if f.suffix.lower() == '.pdf']
    image_files = [f for f in files if f.suffix.lower() in ['.jpg', '.jpeg', '.png']]
    
    print(f"📁 Всего файлов: {len(files)}")
    print(f"📄 PDF файлов: {len(pdf_files)}")
    print(f"🖼️ Изображений: {len(image_files)}")
    
    # Показываем первые 5 файлов
    print("\n📋 Первые 5 файлов:")
    for i, file in enumerate(files[:5]):
        print(f"  {i+1}. {file.name} ({file.suffix})")

if __name__ == "__main__":
    print("🧪 Тестирую сканирование папки Catalog...")
    test_scan()
    print("✅ Тест завершен!")


