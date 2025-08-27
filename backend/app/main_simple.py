from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI(
    title="Инокс Металл Арт API (Упрощенная версия)",
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

# Создаем папку для загрузок
os.makedirs("uploads/applications", exist_ok=True)

# Статические файлы
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
async def root():
    return {"message": "Инокс Металл Арт API работает! (Упрощенная версия)"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "database": "disabled"}

@app.get("/api/v1/applications/")
async def get_applications():
    return {"message": "Форма заявок (база данных временно отключена)"}

@app.post("/api/v1/applications/")
async def create_application():
    return {"message": "Заявка получена (база данных временно отключена)"}


