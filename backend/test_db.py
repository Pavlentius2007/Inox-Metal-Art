#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import psycopg2
from sqlalchemy import create_engine

# Тест 1: Прямое подключение через psycopg2
print("Тест 1: Прямое подключение через psycopg2")
try:
    conn = psycopg2.connect(
        host="localhost",
        port="5432",
        database="inoxmetalart",
        user="postgres",
        password="postgres"
    )
    print("✅ psycopg2 подключение успешно!")
    conn.close()
except Exception as e:
    print(f"❌ psycopg2 ошибка: {e}")

# Тест 2: SQLAlchemy подключение
print("\nТест 2: SQLAlchemy подключение")
try:
    engine = create_engine("postgresql://postgres:postgres@localhost:5432/inoxmetalart")
    with engine.connect() as conn:
        result = conn.execute("SELECT 1")
        print("✅ SQLAlchemy подключение успешно!")
except Exception as e:
    print(f"❌ SQLAlchemy ошибка: {e}")

print("\nТест завершен!")


