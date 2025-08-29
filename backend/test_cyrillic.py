#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sqlite3
import json

def test_cyrillic():
    """Тест работы с кириллицей в базе данных"""
    
    # Создаем тестовую базу данных в памяти
    conn = sqlite3.connect(':memory:')
    cursor = conn.cursor()
    
    # Создаем тестовую таблицу
    cursor.execute('''
        CREATE TABLE test_products (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT,
            features TEXT
        )
    ''')
    
    # Тестовые данные с кириллицей
    test_data = [
        ("Нержавеющая сталь AISI 304", "Высококачественная нержавеющая сталь", ["коррозионная стойкость", "гигиеничность"]),
        ("Труба профильная", "Профильная труба из нержавеющей стали", ["прочность", "долговечность"]),
        ("Лист нержавеющий", "Листовой прокат", ["пластичность", "свариваемость"])
    ]
    
    print("Тестируем вставку данных с кириллицей...")
    
    # Вставляем тестовые данные
    for name, description, features in test_data:
        features_json = json.dumps(features, ensure_ascii=False)
        cursor.execute(
            'INSERT INTO test_products (name, description, features) VALUES (?, ?, ?)',
            (name, description, features_json)
        )
        print(f"Вставлен: {name}")
    
    # Проверяем, что данные сохранились корректно
    print("\nПроверяем сохраненные данные...")
    cursor.execute('SELECT * FROM test_products')
    rows = cursor.fetchall()
    
    for row in rows:
        id, name, description, features = row
        features_list = json.loads(features) if features else []
        print(f"ID: {id}")
        print(f"Название: {name}")
        print(f"Описание: {description}")
        print(f"Особенности: {features_list}")
        print("-" * 50)
    
    # Тестируем поиск по кириллице
    print("\nТестируем поиск по кириллице...")
    cursor.execute('SELECT * FROM test_products WHERE name LIKE ?', ('%нержавеющая%',))
    search_results = cursor.fetchall()
    
    print(f"Найдено записей с 'нержавеющая': {len(search_results)}")
    for row in search_results:
        print(f"  - {row[1]}")
    
    conn.close()
    print("\nТест завершен успешно!")

if __name__ == "__main__":
    test_cyrillic()
