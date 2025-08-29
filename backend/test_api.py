#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
import json

def test_api():
    """Тест работы API с кириллицей"""
    
    base_url = "http://127.0.0.1:8000"
    
    print("Тестируем API Inox Metal Art...")
    print(f"Базовый URL: {base_url}")
    print("-" * 50)
    
    try:
        # Тест 1: Проверка здоровья сервера
        print("1. Проверка здоровья сервера...")
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print(f"✅ Сервер работает! Статус: {response.status_code}")
            print(f"Ответ: {response.json()}")
        else:
            print(f"❌ Ошибка! Статус: {response.status_code}")
        print()
        
        # Тест 2: Главная страница
        print("2. Главная страница...")
        response = requests.get(f"{base_url}/")
        if response.status_code == 200:
            print(f"✅ Главная страница работает! Статус: {response.status_code}")
            print(f"Ответ: {response.json()}")
        else:
            print(f"❌ Ошибка! Статус: {response.status_code}")
        print()
        
        # Тест 3: API продуктов
        print("3. API продуктов...")
        response = requests.get(f"{base_url}/api/v1/products/")
        if response.status_code == 200:
            print(f"✅ API продуктов работает! Статус: {response.status_code}")
            data = response.json()
            print(f"Найдено продуктов: {data.get('total', 0)}")
        else:
            print(f"❌ Ошибка! Статус: {response.status_code}")
        print()
        
        # Тест 4: API проектов
        print("4. API проектов...")
        response = requests.get(f"{base_url}/api/v1/projects/")
        if response.status_code == 200:
            print(f"✅ API проектов работает! Статус: {response.status_code}")
            data = response.json()
            print(f"Найдено проектов: {data.get('total', 0)}")
        else:
            print(f"❌ Ошибка! Статус: {response.status_code}")
        print()
        
        print("🎉 Все тесты завершены!")
        
    except requests.exceptions.ConnectionError:
        print("❌ Не удается подключиться к серверу!")
        print("Убедитесь, что сервер запущен на http://127.0.0.1:8000")
    except Exception as e:
        print(f"❌ Произошла ошибка: {e}")

if __name__ == "__main__":
    test_api()
