# 🚀 Быстрый старт: Система материалов InoxMetalArt

## ⚡ За 5 минут

### 1. Запуск системы
```bash
# Backend (в папке backend)
python -m uvicorn app.main:app --reload

# Frontend (в папке frontend)
npm run dev
```

### 2. Импорт материалов
1. Откройте `/admin/import-materials`
2. Нажмите "Импортировать все материалы"
3. Подтвердите действие
4. Дождитесь завершения

### 3. Проверка результата
- Перейдите на `/materials` - публичная страница
- Или `/admin/materials` - управление в админке

## 🎯 Основные команды

```javascript
// В консоли браузера
inoxMetalArtMaterialsImport.importAllMaterials()           // Импорт всех
inoxMetalArtMaterialsImport.importMaterialsByCategory('catalogs')  // По категории
inoxMetalArtMaterialsImport.clearAllMaterials()            // Очистка
inoxMetalArtMaterialsImport.getMaterialsStats()            // Статистика
```

## 📊 Что импортируется

- **10 материалов** с сайта inoxmetalart.com
- **6 категорий**: каталоги, характеристики, сертификаты, руководства, брошюры, стандарты
- **Автоматические теги** и настройки
- **PDF файлы** (заглушки для начала)

## 🔧 Настройка

### Backend
- Создайте папку `uploads/materials/`
- Убедитесь, что API работает на `localhost:8000`

### Frontend
- Проверьте подключение к backend
- Убедитесь, что все компоненты загружены

## 🚨 Решение проблем

### Материалы не импортируются
- Проверьте, что backend запущен
- Проверьте консоль на ошибки
- Убедитесь, что папка uploads существует

### Страница не загружается
- Проверьте, что frontend запущен
- Проверьте консоль браузера
- Убедитесь, что все файлы созданы

## 📚 Дополнительно

- Полная документация: `README_MATERIALS_IMPORT.md`
- Управление материалами: `/admin/materials`
- Публичная страница: `/materials`

## 🎉 Готово!

Система материалов полностью настроена и готова к использованию!


