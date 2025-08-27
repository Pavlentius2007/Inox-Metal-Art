from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.core.database import engine, Base
from app.api.v1 import applications

# Создаем таблицы при запуске
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Инокс Металл Арт API",
    description="API для премиального сайта нержавеющей стали",
    version="1.0.0"
)

# CORS настройки
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем роутеры
app.include_router(applications.router, prefix="/api/v1")

# Создаем папку для загрузок
os.makedirs("uploads/applications", exist_ok=True)

# Статические файлы
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
async def root():
    return {"message": "Инокс Металл Арт API работает!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

