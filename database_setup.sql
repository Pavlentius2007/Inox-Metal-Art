-- Создание базы данных для сайта Инокс Металл Арт
-- Выполните эти команды в PostgreSQL

-- 1. Создание базы данных
CREATE DATABASE inoxmetalart
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Russian_Russia.1251'
    LC_CTYPE = 'Russian_Russia.1251'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- 2. Подключение к базе данных
\c inoxmetalart;

-- 3. Создание расширений (если нужны)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 4. Проверка создания базы данных
SELECT current_database();

-- 5. Список таблиц (после запуска FastAPI приложения)
\dt;

-- Примечания:
-- - Замените 'postgres' на имя вашего пользователя PostgreSQL
-- - После создания базы данных запустите FastAPI приложение
-- - Таблицы создадутся автоматически благодаря SQLAlchemy
-- - Для продакшена рекомендуется создать отдельного пользователя БД

