#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests

def test_cors():
    try:
        print("Тестируем CORS...")
        
        # Тестируем с заголовками CORS
        headers = {
            'Origin': 'http://localhost:3000',
            'Access-Control-Request-Method': 'GET',
            'Access-Control-Request-Headers': 'Content-Type'
        }
        
        response = requests.get('http://localhost:8000/api/v1/products/', headers=headers)
        print(f"Status Code: {response.status_code}")
        print(f"CORS Headers:")
        for header, value in response.headers.items():
            if 'access-control' in header.lower():
                print(f"  {header}: {value}")
        
        if response.status_code == 200:
            print("✅ API работает!")
            data = response.json()
            print(f"   Количество продуктов: {data.get('total', 0)}")
        else:
            print(f"❌ Ошибка: {response.text}")
            
    except Exception as e:
        print(f"❌ Ошибка: {e}")

if __name__ == "__main__":
    test_cors()

