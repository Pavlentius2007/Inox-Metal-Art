#!/usr/bin/env python3
"""
Скрипт для сброса пароля админа и создания нового пользователя
"""

from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash
from datetime import datetime

def reset_admin():
    db = SessionLocal()
    try:
        # Удаляем всех существующих пользователей
        db.query(User).delete()
        db.commit()
        print("✅ Все существующие пользователи удалены")
        
        # Создаем нового админа
        admin_password = "admin2024"
        admin_email = "admin@inoxmetalart.com"
        
        new_admin = User(
            name="Администратор",
            email=admin_email,
            hashed_password=get_password_hash(admin_password),
            created_at=datetime.utcnow()
        )
        
        db.add(new_admin)
        db.commit()
        
        print("✅ Новый админ создан успешно!")
        print(f"📧 Email: {admin_email}")
        print(f"🔑 Пароль: {admin_password}")
        print("\n💾 Сохраните эти данные:")
        print(f"Логин: {admin_email}")
        print(f"Пароль: {admin_password}")
        
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_admin()


