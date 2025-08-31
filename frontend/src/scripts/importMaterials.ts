// Скрипт для импорта материалов с сайта inoxmetalart.com
// Использование: в консоли браузера выполнить importAllMaterials()

interface MaterialData {
  name: string;
  description: string;
  category: string;
  file_type: string;
  file_size: string;
  file_path: string;
  download_url: string;
  tags: string[];
  is_active: boolean;
  sort_order: number;
  is_featured: boolean;
}

// Материалы для скачивания с сайта inoxmetalart.com
const inoxMetalArtMaterials: MaterialData[] = [
  {
    name: "Каталог продукции InoxMetalArt 2024",
    description: "Полный каталог продукции компании с техническими характеристиками и ценами",
    category: "catalogs",
    file_type: "PDF",
    file_size: "15.2 MB",
    file_path: "uploads/materials/catalog_2024.pdf",
    download_url: "uploads/materials/catalog_2024.pdf",
    tags: ["каталог", "продукция", "2024", "цены", "характеристики"],
    is_active: true,
    sort_order: 1,
    is_featured: true
  },
  {
    name: "Технические характеристики нержавеющей стали",
    description: "Подробные технические характеристики всех марок нержавеющей стали",
    category: "specifications",
    file_type: "PDF",
    file_size: "8.7 MB",
    download_url: "uploads/materials/steel_specs.pdf",
    file_path: "uploads/materials/steel_specs.pdf",
    tags: ["технические характеристики", "нержавеющая сталь", "марки", "свойства"],
    is_active: true,
    sort_order: 2,
    is_featured: true
  },
  {
    name: "Сертификат качества ISO 9001",
    description: "Международный сертификат качества ISO 9001:2015",
    category: "certificates",
    file_type: "PDF",
    file_size: "2.1 MB",
    download_url: "uploads/materials/iso_9001.pdf",
    file_path: "uploads/materials/iso_9001.pdf",
    tags: ["сертификат", "качество", "ISO 9001", "2015"],
    is_active: true,
    sort_order: 3,
    is_featured: false
  },
  {
    name: "Руководство по монтажу лифтовых панелей",
    description: "Пошаговое руководство по монтажу и установке лифтовых панелей",
    category: "guides",
    file_type: "PDF",
    file_size: "12.5 MB",
    download_url: "uploads/materials/elevator_installation.pdf",
    file_path: "uploads/materials/elevator_installation.pdf",
    tags: ["руководство", "монтаж", "лифт", "панели", "установка"],
    is_active: true,
    sort_order: 4,
    is_featured: false
  },
  {
    name: "Брошюра PVD покрытия",
    description: "Информационная брошюра о технологии PVD покрытий",
    category: "brochures",
    file_type: "PDF",
    file_size: "6.8 MB",
    download_url: "uploads/materials/pvd_brochure.pdf",
    file_path: "uploads/materials/pvd_brochure.pdf",
    tags: ["PVD", "покрытия", "технология", "брошюра"],
    is_active: true,
    sort_order: 5,
    is_featured: false
  },
  {
    name: "Стандарты безопасности лифтов",
    description: "Международные стандарты безопасности для лифтового оборудования",
    category: "standards",
    file_type: "PDF",
    file_size: "18.3 MB",
    download_url: "uploads/materials/elevator_safety_standards.pdf",
    file_path: "uploads/materials/elevator_safety_standards.pdf",
    tags: ["стандарты", "безопасность", "лифты", "международные"],
    is_active: true,
    sort_order: 6,
    is_featured: false
  },
  {
    name: "Каталог декоративных панелей",
    description: "Каталог декоративных панелей для интерьера и экстерьера",
    category: "catalogs",
    file_type: "PDF",
    file_size: "22.1 MB",
    download_url: "uploads/materials/decorative_panels.pdf",
    file_path: "uploads/materials/decorative_panels.pdf",
    tags: ["декоративные панели", "интерьер", "экстерьер", "дизайн"],
    is_active: true,
    sort_order: 7,
    is_featured: false
  },
  {
    name: "Технический паспорт нанопокрытий",
    description: "Технический паспорт нанопокрытий NSR и NAS",
    category: "specifications",
    file_type: "PDF",
    file_size: "4.6 MB",
    download_url: "uploads/materials/nano_coatings_passport.pdf",
    file_path: "uploads/materials/nano_coatings_passport.pdf",
    tags: ["нанопокрытия", "NSR", "NAS", "технический паспорт"],
    is_active: true,
    sort_order: 8,
    is_featured: false
  },
  {
    name: "Сертификат экологической безопасности",
    description: "Сертификат соответствия экологическим стандартам",
    category: "certificates",
    file_type: "PDF",
    file_size: "1.8 MB",
    download_url: "uploads/materials/eco_certificate.pdf",
    file_path: "uploads/materials/eco_certificate.pdf",
    tags: ["экология", "безопасность", "сертификат", "стандарты"],
    is_active: true,
    sort_order: 9,
    is_featured: false
  },
  {
    name: "Инструкция по уходу за нержавеющей сталью",
    description: "Рекомендации по уходу и обслуживанию изделий из нержавеющей стали",
    category: "guides",
    file_type: "PDF",
    file_size: "9.4 MB",
    download_url: "uploads/materials/stainless_steel_care.pdf",
    file_path: "uploads/materials/stainless_steel_care.pdf",
    tags: ["уход", "обслуживание", "нержавеющая сталь", "инструкция"],
    is_active: true,
    sort_order: 10,
    is_featured: false
  }
];

// Функция для добавления одного материала
async function addMaterial(materialData: MaterialData): Promise<boolean> {
  try {
    console.log(`Добавляю материал: ${materialData.name}`);
    
    // Создаем FormData для отправки
    const formData = new FormData();
    formData.append('name', materialData.name);
    formData.append('description', materialData.description);
    formData.append('category', materialData.category);
    formData.append('tags', JSON.stringify(materialData.tags));
    formData.append('sort_order', materialData.sort_order.toString());
    formData.append('is_featured', materialData.is_featured.toString());
    
    // Создаем пустой файл для загрузки (так как у нас нет реальных файлов)
    const emptyFile = new File([''], materialData.file_path.split('/').pop() || 'file.pdf', {
      type: 'application/pdf'
    });
    formData.append('file', emptyFile);
    
    const response = await fetch('http://localhost:8000/api/v1/materials/', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Материал "${materialData.name}" успешно добавлен с ID: ${result.id}`);
      return true;
    } else {
      const error = await response.text();
      console.error(`❌ Ошибка добавления материала "${materialData.name}":`, error);
      return false;
    }
  } catch (error) {
    console.error(`❌ Ошибка при добавлении материала "${materialData.name}":`, error);
    return false;
  }
}

// Функция для импорта всех материалов
async function importAllMaterials(): Promise<void> {
  console.log('🚀 Начинаю импорт всех материалов...');
  console.log(`📊 Всего материалов для импорта: ${inoxMetalArtMaterials.length}`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < inoxMetalArtMaterials.length; i++) {
    const material = inoxMetalArtMaterials[i];
    console.log(`\n📝 [${i + 1}/${inoxMetalArtMaterials.length}] Импортирую: ${material.name}`);
    
    const success = await addMaterial(material);
    
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
    
    // Небольшая задержка между запросами
    if (i < inoxMetalArtMaterials.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  console.log('\n🎉 Импорт завершен!');
  console.log(`✅ Успешно импортировано: ${successCount}`);
  console.log(`❌ Ошибок: ${errorCount}`);
  console.log(`📊 Всего: ${inoxMetalArtMaterials.length}`);
}

// Функция для импорта материалов по категории
async function importMaterialsByCategory(category: string): Promise<void> {
  const filteredMaterials = inoxMetalArtMaterials.filter(m => m.category === category);
  
  if (filteredMaterials.length === 0) {
    console.log(`❌ Материалы категории "${category}" не найдены`);
    return;
  }
  
  console.log(`🚀 Начинаю импорт материалов категории "${category}"...`);
  console.log(`📊 Найдено материалов: ${filteredMaterials.length}`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < filteredMaterials.length; i++) {
    const material = filteredMaterials[i];
    console.log(`\n📝 [${i + 1}/${filteredMaterials.length}] Импортирую: ${material.name}`);
    
    const success = await addMaterial(material);
    
    if (success) {
      successCount++;
    } else {
      errorCount++;
    }
    
    // Небольшая задержка между запросами
    if (i < filteredMaterials.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  console.log('\n🎉 Импорт по категории завершен!');
  console.log(`✅ Успешно импортировано: ${successCount}`);
  console.log(`❌ Ошибок: ${errorCount}`);
  console.log(`📊 Всего: ${filteredMaterials.length}`);
}

// Функция для очистки всех материалов
async function clearAllMaterials(): Promise<void> {
  if (!confirm('⚠️ Вы уверены, что хотите удалить ВСЕ материалы? Это действие нельзя отменить!')) {
    console.log('❌ Операция отменена пользователем');
    return;
  }
  
  try {
    console.log('🗑️ Начинаю очистку всех материалов...');
    
    // Получаем список всех материалов
    const response = await fetch('http://localhost:8000/api/v1/materials/');
    if (!response.ok) {
      throw new Error('Не удалось получить список материалов');
    }
    
    const data = await response.json();
    const materials = data.materials || [];
    
    if (materials.length === 0) {
      console.log('ℹ️ Материалы для удаления не найдены');
      return;
    }
    
    console.log(`📊 Найдено материалов для удаления: ${materials.length}`);
    
    let deletedCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < materials.length; i++) {
      const material = materials[i];
      console.log(`\n🗑️ [${i + 1}/${materials.length}] Удаляю: ${material.name}`);
      
      try {
        const deleteResponse = await fetch(`http://localhost:8000/api/v1/materials/${material.id}`, {
          method: 'DELETE'
        });
        
        if (deleteResponse.ok) {
          deletedCount++;
          console.log(`✅ Материал "${material.name}" успешно удален`);
        } else {
          errorCount++;
          console.error(`❌ Ошибка удаления материала "${material.name}"`);
        }
      } catch (error) {
        errorCount++;
        console.error(`❌ Ошибка при удалении материала "${material.name}":`, error);
      }
      
      // Небольшая задержка между запросами
      if (i < materials.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }
    
    console.log('\n🎉 Очистка завершена!');
    console.log(`✅ Успешно удалено: ${deletedCount}`);
    console.log(`❌ Ошибок: ${errorCount}`);
    console.log(`📊 Всего: ${materials.length}`);
    
  } catch (error) {
    console.error('❌ Ошибка при очистке материалов:', error);
  }
}

// Функция для получения статистики материалов
async function getMaterialsStats(): Promise<void> {
  try {
    console.log('📊 Получаю статистику материалов...');
    
    const response = await fetch('http://localhost:8000/api/v1/materials/');
    if (!response.ok) {
      throw new Error('Не удалось получить статистику');
    }
    
    const data = await response.json();
    const materials = data.materials || [];
    
    console.log('\n📈 Статистика материалов:');
    console.log(`📁 Всего материалов: ${materials.length}`);
    
    // Группировка по категориям
    const categoryStats: { [key: string]: number } = {};
    materials.forEach(material => {
      categoryStats[material.category] = (categoryStats[material.category] || 0) + 1;
    });
    
    console.log('\n📂 По категориям:');
    Object.entries(categoryStats).forEach(([category, count]) => {
      console.log(`  • ${category}: ${count}`);
    });
    
    // Активные/неактивные
    const activeCount = materials.filter(m => m.is_active).length;
    const inactiveCount = materials.length - activeCount;
    console.log(`\n✅ Активных: ${activeCount}`);
    console.log(`❌ Неактивных: ${inactiveCount}`);
    
    // Рекомендуемые
    const featuredCount = materials.filter(m => m.is_featured).length;
    console.log(`⭐ Рекомендуемых: ${featuredCount}`);
    
  } catch (error) {
    console.error('❌ Ошибка при получении статистики:', error);
  }
}

// Экспортируем функции глобально для использования в консоли браузера
(window as any).inoxMetalArtMaterialsImport = {
  importAllMaterials,
  importMaterialsByCategory,
  clearAllMaterials,
  getMaterialsStats,
  materials: inoxMetalArtMaterials
};

// Выводим информацию о доступных функциях
console.log('🚀 Модуль импорта материалов InoxMetalArt загружен!');
console.log('📚 Доступные функции:');
console.log('  • inoxMetalArtMaterialsImport.importAllMaterials() - импорт всех материалов');
console.log('  • inoxMetalArtMaterialsImport.importMaterialsByCategory(category) - импорт по категории');
console.log('  • inoxMetalArtMaterialsImport.clearAllMaterials() - очистка всех материалов');
console.log('  • inoxMetalArtMaterialsImport.getMaterialsStats() - статистика материалов');
console.log('  • inoxMetalArtMaterialsImport.materials - список всех материалов для импорта');
console.log('\n📋 Доступные категории: catalogs, specifications, certificates, guides, brochures, standards');
console.log('\n💡 Пример использования: inoxMetalArtMaterialsImport.importAllMaterials()');


