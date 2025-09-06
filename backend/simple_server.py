#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import api_router

app = FastAPI(title="Test API")

# CORS настройки
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем API роутеры
app.include_router(api_router, prefix="/api/v1")

@app.get("/")
async def root():
    return {"message": "Test API работает!"}

if __name__ == "__main__":
    import uvicorn
    print("Запускаем тестовый сервер на порту 8002...")
    uvicorn.run(app, host="127.0.0.1", port=8002)

