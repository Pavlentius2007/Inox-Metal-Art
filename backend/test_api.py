#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
import json

def test_products_api():
    try:
        # Тестируем API продуктов
        response = requests.get("http://localhost:8000/api/v1/products/")
        print(f"Status Code: {response.status_code}")
        print(f"Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: {json.dumps(data, indent=2, ensure_ascii=False)}")
        else:
            print(f"Error Response: {response.text}")
            
    except Exception as e:
        print(f"Ошибка при тестировании API: {e}")

if __name__ == "__main__":
    test_products_api()