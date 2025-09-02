# 🚀 Импорт материалов InoxMetalArt

## 📋 Описание

Система импорта материалов позволяет автоматически загружать материалы для скачивания с сайта `inoxmetalart.com` в вашу базу данных. Система поддерживает различные категории материалов: каталоги, технические характеристики, сертификаты, руководства и другие.

## 🎯 Возможности

- **Массовый импорт** - загрузка всех материалов одним кликом
- **Импорт по категориям** - выборочная загрузка по типам материалов
- **Автоматическое создание** - материалы создаются с правильными настройками
- **Управление через админку** - удобный веб-интерфейс для импорта
- **Команды консоли** - продвинутые функции для разработчиков

## 📁 Структура файлов

```
frontend/src/
├── pages/
│   ├── Materials.tsx                    # Страница материалов (публичная)
│   └── admin/
│       ├── MaterialsManagement.tsx      # Управление материалами
│       └── ImportMaterials.tsx         # Импорт материалов
├── components/
│   └── admin/
│       └── MaterialForm.tsx            # Форма добавления/редактирования
└── scripts/
    └── importMaterials.ts              # Скрипт импорта
```

## 🚀 Быстрый старт

### 1. Запуск системы

1. Убедитесь, что backend запущен на `http://localhost:8000`
2. Запустите frontend: `npm run dev`
3. Перейдите в админку: `/admin/import-materials`

### 2. Импорт всех материалов

1. На странице импорта нажмите "Импортировать все материалы"
2. Подтвердите действие
3. Дождитесь завершения импорта
4. Проверьте результат в разделе "Материалы"

### 3. Импорт по категориям

1. Выберите нужную категорию в разделе "Импорт по категориям"
2. Нажмите "Импортировать" для выбранной категории
3. Подтвердите действие

## 📊 Категории материалов

| Категория | Описание | Количество |
|-----------|----------|------------|
| `catalogs` | Каталоги продукции | 2 |
| `specifications` | Технические характеристики | 2 |
| `certificates` | Сертификаты качества | 2 |
| `guides` | Руководства по монтажу | 2 |
| `brochures` | Брошюры и презентации | 1 |
| `standards` | Стандарты и нормы | 1 |

## 💻 Команды консоли

Для продвинутых пользователей доступны команды в консоли браузера:

```javascript
// Импорт всех материалов
inoxMetalArtMaterialsImport.importAllMaterials()

// Импорт по категории
inoxMetalArtMaterialsImport.importMaterialsByCategory('catalogs')

// Очистка всех материалов
inoxMetalArtMaterialsImport.clearAllMaterials()

// Получение статистики
inoxMetalArtMaterialsImport.getMaterialsStats()

// Просмотр списка материалов
inoxMetalArtMaterialsImport.materials
```

## 🔧 Настройка

### Backend API

Система использует следующие API endpoints:

- `GET /api/v1/materials/` - получение списка материалов
- `POST /api/v1/materials/` - создание нового материала
- `PUT /api/v1/materials/{id}` - обновление материала
- `DELETE /api/v1/materials/{id}` - удаление материала
- `GET /api/v1/materials/categories` - получение категорий

### База данных

Материалы хранятся в таблице `materials` со следующими полями:

- `id` - уникальный идентификатор
- `name` - название материала
- `description` - описание
- `category` - категория
- `file_type` - тип файла
- `file_size` - размер файла
- `file_path` - путь к файлу
- `tags` - теги (JSON)
- `is_active` - активность
- `sort_order` - порядок сортировки
- `is_featured` - рекомендуемый материал

## 📝 Добавление новых материалов

### Через админку

1. Перейдите в "Материалы" → "Добавить материал"
2. Заполните форму:
   - Название и описание
   - Выберите категорию
   - Загрузите файл
   - Добавьте теги
   - Настройте дополнительные параметры
3. Нажмите "Создать"

### Программно

```typescript
const newMaterial = {
  name: "Название материала",
  description: "Описание материала",
  category: "catalogs",
  file_type: "PDF",
  file_size: "5.2 MB",
  file_path: "uploads/materials/new_material.pdf",
  tags: ["тег1", "тег2"],
  is_active: true,
  sort_order: 11,
  is_featured: false
};

// Отправка на сервер
const formData = new FormData();
Object.entries(newMaterial).forEach(([key, value]) => {
  if (key === 'tags') {
    formData.append(key, JSON.stringify(value));
  } else {
    formData.append(key, value.toString());
  }
});

const response = await fetch('http://localhost:8000/api/v1/materials/', {
  method: 'POST',
  body: formData
});
```

## 🎨 Кастомизация

### Изменение категорий

Отредактируйте массив `categories` в компоненте `Materials.tsx`:

```typescript
const categories = [
  { id: 'new_category', name: 'Новая категория', icon: NewIcon },
  // ... существующие категории
];
```

### Добавление новых типов файлов

Обновите `ALLOWED_EXTENSIONS` в backend:

```python
ALLOWED_EXTENSIONS = {'.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png', '.zip', '.rar', '.new'}
```

### Изменение иконок файлов

Обновите функцию `getFileIcon` в `Materials.tsx`:

```typescript
const getFileIcon = (fileType: string) => {
  switch (fileType.toLowerCase()) {
    case 'new_type':
      return NewIcon;
    // ... существующие случаи
    default:
      return File;
  }
};
```

## 🚨 Устранение неполадок

### Ошибка "Файл не выбран"

- Убедитесь, что файл выбран в форме
- Проверьте, что файл соответствует разрешенным типам

### Ошибка "Неподдерживаемый тип файла"

- Проверьте расширение файла
- Убедитесь, что тип файла добавлен в `ALLOWED_EXTENSIONS`

### Материалы не отображаются

- Проверьте подключение к backend
- Убедитесь, что API endpoint работает
- Проверьте консоль браузера на ошибки

### Проблемы с загрузкой файлов

- Проверьте права доступа к папке `uploads/materials`
- Убедитесь, что папка существует
- Проверьте размер загружаемого файла

## 📚 Дополнительные ресурсы

- [Документация FastAPI](https://fastapi.tiangolo.com/)
- [SQLAlchemy ORM](https://docs.sqlalchemy.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Поддержка

При возникновении проблем:

1. Проверьте консоль браузера
2. Проверьте логи backend
3. Убедитесь, что все зависимости установлены
4. Проверьте настройки базы данных

## 📄 Лицензия

Система импорта материалов является частью проекта InoxMetalArt и распространяется под той же лицензией.



