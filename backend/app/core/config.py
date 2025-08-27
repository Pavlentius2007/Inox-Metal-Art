from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # База данных - с правильным паролем postgres
    DATABASE_URL: str = "sqlite:///./test.db"
    # Раскомментируйте строку ниже когда настроите PostgreSQL:
    # DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/inoxmetalart"
    
    # Email настройки
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str = "pavel@inoxmetalart.com"
    SMTP_PASSWORD: str = "your-app-password"
    
    # Email получателя заявок
    APPLICATIONS_EMAIL: str = "pavel@inoxmetalart.com"
    
    # Настройки приложения
    APP_NAME: str = "InoxMetalArt"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()

