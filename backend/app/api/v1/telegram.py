from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
import os
from typing import Optional, List
import json
from datetime import datetime

router = APIRouter()

# Конфигурация Telegram бота
try:
    from telegram_config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
except ImportError:
    TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "YOUR_BOT_TOKEN_HERE")
    TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "YOUR_CHAT_ID_HERE")

class TelegramMessage(BaseModel):
    company_name: str
    contact_person: str
    email: str
    phone: str
    country: str
    city: str
    product_type: str
    quantity: str
    application: str
    deadline: Optional[str] = None
    additional_info: Optional[str] = None
    file_paths: Optional[str] = None

async def send_telegram_message(message_text: str, files: Optional[List[str]] = None):
    """Отправляет сообщение в Telegram"""
    try:
        # Отправляем текстовое сообщение
        text_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
        text_data = {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message_text,
            "parse_mode": "HTML"
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(text_url, json=text_data)
            response.raise_for_status()
            
        # Если есть файлы, отправляем их
        if files:
            for file_path in files:
                if os.path.exists(file_path):
                    file_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendDocument"
                    with open(file_path, 'rb') as file:
                        files_data = {'document': file}
                        data = {'chat_id': TELEGRAM_CHAT_ID}
                        async with httpx.AsyncClient() as client:
                            response = await client.post(file_url, data=data, files=files_data)
                            response.raise_for_status()
                            
    except Exception as e:
        print(f"Ошибка отправки в Telegram: {e}")
        raise HTTPException(status_code=500, detail="Ошибка отправки в Telegram")

@router.post("/send-application")
async def send_application_to_telegram(message: TelegramMessage):
    """Отправляет заявку в Telegram"""
    try:
        # Формируем сообщение
        message_text = f"""
<b>🎯 НОВАЯ ЗАЯВКА С САЙТА</b>

<b>🏢 Компания:</b> {message.company_name}
<b>👤 Контактное лицо:</b> {message.contact_person}
<b>📧 Email:</b> {message.email}
<b>📞 Телефон:</b> {message.phone}
<b>🌍 Страна:</b> {message.country}
<b>🏙️ Город:</b> {message.city}

<b>📦 Тип продукции:</b> {message.product_type}
<b>📊 Количество:</b> {message.quantity}
<b>🎯 Применение:</b> {message.application}
"""

        if message.deadline:
            message_text += f"<b>⏰ Желаемые сроки:</b> {message.deadline}\n"
            
        if message.additional_info:
            message_text += f"\n<b>📝 Дополнительная информация:</b>\n{message.additional_info}\n"

        # Получаем список файлов
        files = []
        if message.file_paths:
            try:
                file_paths = json.loads(message.file_paths)
                if isinstance(file_paths, list):
                    files = file_paths
            except:
                pass

        # Отправляем сообщение
        await send_telegram_message(message_text, files)
        
        return {"success": True, "message": "Заявка успешно отправлена в Telegram"}
        
    except Exception as e:
        print(f"Ошибка обработки заявки: {e}")
        raise HTTPException(status_code=500, detail="Ошибка обработки заявки")

@router.get("/test")
async def test_telegram():
    """Тестовое сообщение в Telegram"""
    try:
        test_message = """
<b>🧪 ТЕСТОВОЕ СООБЩЕНИЕ</b>

Бот настроен и работает!
Время: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        await send_telegram_message(test_message)
        return {"success": True, "message": "Тестовое сообщение отправлено"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ошибка тестирования: {e}")
