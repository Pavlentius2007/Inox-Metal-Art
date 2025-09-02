#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Упрощенный импорт материалов
"""

import os
import shutil
from pathlib import Path

def main():
    print("Starting import...")
    
    # Путь к папке Catalog
    catalog_dir = Path("../Catalog")
    uploads_dir = Path("uploads/materials")
    
    if not catalog_dir.exists():
        print(f"Catalog folder not found: {catalog_dir}")
        return
    
    print(f"Found Catalog folder: {catalog_dir}")
    
    # Создаем папку uploads/materials
    uploads_dir.mkdir(parents=True, exist_ok=True)
    print(f"Created uploads folder: {uploads_dir}")
    
    # Сканируем файлы
    files = list(catalog_dir.glob("*"))
    print(f"Found {len(files)} files")
    
    # Копируем файлы
    copied_count = 0
    for file_path in files:
        if file_path.is_file():
            target_file = uploads_dir / file_path.name
            try:
                shutil.copy2(file_path, target_file)
                print(f"Copied: {file_path.name}")
                copied_count += 1
            except Exception as e:
                print(f"Error copying {file_path.name}: {e}")
    
    print(f"Successfully copied {copied_count} files")
    print("Import completed!")

if __name__ == "__main__":
    main()


