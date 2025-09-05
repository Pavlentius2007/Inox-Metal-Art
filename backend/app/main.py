from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.core.database import engine, Base
from app.api.v1 import api_router

# Импортируем модели для создания таблиц
from app.models import product, project, certificate, page_content, application, material, user

# Создаем таблицы при запуске
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Инокс Металл Арт API",
    description="API для премиального сайта нержавеющей стали",
    version="1.0.0"
)

# CORS настройки для разработки
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем API роутеры
app.include_router(api_router, prefix="/api/v1")

# Создаем папки для загрузок
upload_dirs = [
    "uploads/products",
    "uploads/videos",
    "uploads/projects",
    "uploads/certificates",
    "uploads/technologies",
    "uploads/thumbnails",
    "uploads/materials",
    "uploads/applications"
]

for upload_dir in upload_dirs:
    os.makedirs(upload_dir, exist_ok=True)

# Статические файлы
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.mount("/Catalog", StaticFiles(directory="Catalog"), name="catalog")

@app.get("/")
async def root():
    return {"message": "Инокс Металл Арт API работает!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

