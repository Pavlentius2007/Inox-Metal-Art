#!/usr/bin/env python3
# -*- coding: utf-8 -*-

def test_startup():
    try:
        print("Тестируем запуск приложения...")
        
        print("1. Импортируем main...")
        from app.main import app
        print("✅ main импортирован")
        
        print("2. Проверяем app...")
        print(f"   App type: {type(app)}")
        print(f"   App title: {app.title}")
        
        print("3. Проверяем роутеры...")
        print(f"   Routes: {[route.path for route in app.routes]}")
        
        print("4. Тестируем создание таблиц...")
        from app.core.database import engine, Base
        from app.models import product, project, certificate, page_content, application, material, user
        Base.metadata.create_all(bind=engine)
        print("✅ Таблицы созданы")
        
        print("🎉 Все работает!")
        
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_startup()

