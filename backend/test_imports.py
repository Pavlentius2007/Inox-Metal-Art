#!/usr/bin/env python3
# -*- coding: utf-8 -*-

try:
    print("Тестируем импорты...")
    
    print("1. Импортируем FastAPI...")
    from fastapi import FastAPI
    print("✅ FastAPI импортирован")
    
    print("2. Импортируем CORS...")
    from fastapi.middleware.cors import CORSMiddleware
    print("✅ CORS импортирован")
    
    print("3. Импортируем базу данных...")
    from app.core.database import engine, Base
    print("✅ База данных импортирована")
    
    print("4. Импортируем модели...")
    from app.models import product, project, certificate, page_content, application, material, user
    print("✅ Модели импортированы")
    
    print("5. Импортируем API роутеры...")
    from app.api.v1 import api_router
    print("✅ API роутеры импортированы")
    
    print("6. Создаем приложение...")
    app = FastAPI()
    print("✅ Приложение создано")
    
    print("7. Добавляем CORS...")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    print("✅ CORS добавлен")
    
    print("8. Подключаем роутеры...")
    app.include_router(api_router, prefix="/api/v1")
    print("✅ Роутеры подключены")
    
    print("🎉 Все импорты работают!")
    
except Exception as e:
    print(f"❌ Ошибка: {e}")
    import traceback
    traceback.print_exc()

