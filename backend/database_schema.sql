-- Схема базы данных для админ-панели Inox Metal Art
-- Создано: 2024-01-15

-- Таблица продуктов
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    features TEXT, -- JSON массив
    image_path TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица изображений галереи
CREATE TABLE IF NOT EXISTS gallery_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    file_path TEXT NOT NULL,
    category TEXT,
    tags TEXT, -- JSON массив
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица видео
CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    file_path TEXT NOT NULL,
    thumbnail_path TEXT,
    duration INTEGER, -- в секундах
    category TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица проектов
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    category VARCHAR(100) NOT NULL,
    client TEXT,
    location TEXT,
    area VARCHAR(100),
    completion_date VARCHAR(100),
    main_image_path TEXT,
    gallery_images TEXT, -- JSON массив путей к изображениям
    features TEXT, -- JSON массив особенностей
    technologies TEXT, -- JSON массив технологий
    status TEXT DEFAULT 'active',
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица сертификатов
CREATE TABLE IF NOT EXISTS certificates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    file_path TEXT NOT NULL,
    issue_date DATE,
    expiry_date DATE,
    issuing_authority TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица технологий
CREATE TABLE IF NOT EXISTS technologies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    features TEXT, -- JSON массив
    image_path TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица контента страниц
CREATE TABLE IF NOT EXISTS page_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_name TEXT NOT NULL UNIQUE, -- 'about', 'contacts', 'home'
    title TEXT,
    content TEXT,
    meta_description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заявок от клиентов
CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    contact_person TEXT,
    email TEXT,
    phone TEXT,
    project_description TEXT,
    status TEXT DEFAULT 'new', -- new, processing, completed, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON applications(created_at);

-- Вставка начальных данных для страниц
INSERT OR IGNORE INTO page_content (page_name, title, content, meta_description) VALUES
('home', 'Главная страница', 'Добро пожаловать на сайт Inox Metal Art', 'Inox Metal Art - ведущий производитель металлоконструкций'),
('about', 'О компании', 'Информация о компании Inox Metal Art', 'Узнайте больше о компании Inox Metal Art'),
('contacts', 'Контакты', 'Свяжитесь с нами', 'Контактная информация Inox Metal Art');

-- Вставка начальных категорий продуктов
INSERT OR IGNORE INTO products (name, category, description, features, status) VALUES
('Titanium PVD покрытие', 'Декоративные покрытия', 'Вакуумное напыление нитридов титана на нержавеющую сталь', '["Яркие декоративные цвета", "Устойчивость к коррозии", "30+ лет проверенной надежности"]', 'active'),
('Nano Scratch Resistant (NSR™)', 'Защитные покрытия', 'Нанопокрытие против царапин', '["В 4 раза тверже обычной стали", "Идеально для лифтов и кухонь", "Защита от царапин"]', 'active');
