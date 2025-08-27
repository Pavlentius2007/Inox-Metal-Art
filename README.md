# 🏗️ Инокс Металл Арт - Сайт

Премиальный сайт-визитка для компании, специализирующейся на поставке продукции из нержавеющей стали.

## ✨ Особенности

- 🎨 Современный премиальный дизайн
- 📱 Полностью адаптивный интерфейс
- 🚀 Быстрая загрузка и оптимизация
- 📝 Качественная форма заявки с загрузкой файлов
- 🏆 Блок выполненных проектов
- 📜 Блок сертификатов качества
- 🌐 Русскоязычный интерфейс

## 🛠️ Технологии

### Бэкенд
- **FastAPI** - современный веб-фреймворк
- **PostgreSQL** - надежная база данных
- **SQLAlchemy** - ORM для работы с БД
- **JWT** - аутентификация (опционально)

### Фронтенд
- **React 18** - современная библиотека UI
- **TypeScript** - типизированный JavaScript
- **Tailwind CSS** - utility-first CSS фреймворк
- **Framer Motion** - анимации
- **React Hook Form** - управление формами
- **Vite** - быстрый сборщик

## 🚀 Быстрый старт

### Предварительные требования

- Python 3.8+
- Node.js 18+
- PostgreSQL 12+

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd inoxmetalart-website
```

### 2. Настройка бэкенда

```bash
cd backend

# Создание виртуального окружения
python -m venv venv

# Активация виртуального окружения
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Установка зависимостей
pip install -r requirements.txt

# Создание файла .env
cp env.example .env
# Отредактируйте .env файл с вашими настройками

# Запуск сервера
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Настройка фронтенда

```bash
cd frontend

# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev
```

### 4. Открытие в браузере

- Фронтенд: http://localhost:5173
- Бэкенд API: http://localhost:8000
- Документация API: http://localhost:8000/docs

## 📁 Структура проекта

```
inoxmetalart-website/
├── backend/                 # Бэкенд FastAPI
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Конфигурация
│   │   ├── models/         # Модели БД
│   │   └── services/       # Бизнес-логика
│   ├── env.example         # Пример переменных окружения
│   └── requirements.txt    # Python зависимости
├── frontend/               # Фронтенд React
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── pages/          # Страницы
│   │   └── assets/         # Статические файлы
│   ├── package.json        # Node.js зависимости
│   └── tailwind.config.js  # Конфигурация Tailwind
└── README.md               # Документация
```

## 🔧 Конфигурация

### Переменные окружения (.env)

```bash
# База данных
DATABASE_URL=postgresql://postgres:password@localhost:5432/inoxmetalart

# Email настройки
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
APPLICATIONS_EMAIL=applications@yourcompany.com

# Настройки приложения
APP_NAME=Инокс Металл Арт
APP_VERSION=1.0.0
DEBUG=true
```

### База данных

1. **Создайте базу данных PostgreSQL**:
   ```sql
   CREATE DATABASE inoxmetalart;
   ```

2. **Обновите `DATABASE_URL` в `.env` файле**

3. **Запустите бэкенд** - SQLAlchemy автоматически создаст все таблицы при первом запуске

## 📸 Добавление контента

### Фото и видео

1. Разместите файлы в соответствующих папках:
   - `frontend/public/projects/` - для проектов
   - `frontend/public/certificates/` - для сертификатов
   - `frontend/public/products/` - для продукции

2. Обновите пути в компонентах

### Проекты

Отредактируйте массив `projects` в `frontend/src/pages/Projects.tsx`

### Сертификаты

Отредактируйте массив `certificates` в `frontend/src/pages/Certificates.tsx`

## 🚀 Деплой

### Продакшн сборка

```bash
# Фронтенд
cd frontend
npm run build

# Бэкенд
cd backend
pip install -r requirements.txt
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

### Docker (опционально)

```bash
# Сборка и запуск
docker-compose up -d
```

## 📞 Поддержка

По вопросам разработки и настройки обращайтесь к команде разработки.

## 📄 Лицензия

© 2024 Инокс Металл Арт. Все права защищены.

