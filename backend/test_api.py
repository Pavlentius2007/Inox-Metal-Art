#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Тест API материалов
"""

import requests
import json

def test_materials_api():
    """Тестирует API материалов"""
    try:
        # Тест получения списка материалов
        response = requests.get("http://localhost:8000/api/v1/materials/")
        print(f"Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Total materials: {data.get('total', 0)}")
            
            # Показываем первые 3 материала
            materials = data.get('materials', [])
            for i, material in enumerate(materials[:3]):
                print(f"\n{i+1}. {material['name']}")
                print(f"   Category: {material['category']}")
                print(f"   Type: {material['file_type']}")
                print(f"   Size: {material['file_size']}")
        else:
            print(f"Error: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Не удается подключиться к серверу. Запустите сервер командой:")
        print("   python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000")
    except Exception as e:
        print(f"❌ Ошибка: {e}")

if __name__ == "__main__":
    print("🧪 Тестирую API материалов...")
    test_materials_api()
