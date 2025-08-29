#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import uvicorn
from app.main import app

if __name__ == "__main__":
    print("Запускаем сервер Inox Metal Art API...")
    print("Сервер будет доступен по адресу: http://127.0.0.1:8000")
    print("Документация API: http://127.0.0.1:8000/docs")
    print("Для остановки сервера нажмите Ctrl+C")
    print("-" * 50)
    
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        log_level="info"
    )
