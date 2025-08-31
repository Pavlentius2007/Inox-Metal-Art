import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Database, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  FileText, 
  Tag, 
  Star,
  Calendar,
  File
} from 'lucide-react';
import Button from '../../components/ui/Button';

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

const ImportMaterials: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState('');
  const [importResults, setImportResults] = useState<{ success: number; error: number }>({ success: 0, error: 0 });
  
  // Реальные данные из API
  const [realMaterials, setRealMaterials] = useState<any[]>([]);
  const [realCategories, setRealCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Загрузка реальных данных из API
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        setIsLoading(true);
        
        // Загружаем материалы
        const materialsResponse = await fetch('http://localhost:8000/api/v1/materials/');
        if (materialsResponse.ok) {
          const materialsData = await materialsResponse.json();
          setRealMaterials(materialsData.materials || []);
        }
        
        // Загружаем категории
        const categoriesResponse = await fetch('http://localhost:8000/api/v1/materials/categories');
        if (categoriesResponse.ok) {
          const categoriesData = await categoriesResponse.json();
          setRealCategories(categoriesData || []);
        }
        
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRealData();
  }, []);

  // Материалы для импорта (из скрипта)
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

  // Статистика по категориям из реальных данных
  const categoryStats = realCategories.reduce((acc, category) => {
    acc[category.id] = category.count;
    return acc;
  }, {} as { [key: string]: number });

  const totalMaterials = realMaterials.length;
  const featuredMaterials = realMaterials.filter(m => m.is_featured).length;

  // Обработчики
  const handleImportAll = async () => {
    if (!confirm('Переимпортировать материалы из папки Catalog? Это обновит базу данных актуальными файлами.')) {
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    setImportStatus('Сканирую папку Catalog...');
    setImportResults({ success: 0, error: 0 });

    try {
      setImportProgress(25);
      setImportStatus('Запускаю переимпорт материалов...');
      
      const response = await fetch('http://localhost:8000/api/v1/materials/reimport-from-catalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setImportProgress(75);
      
      if (response.ok) {
        const result = await response.json();
        
        if (result.success) {
          setImportProgress(100);
          setImportStatus(`✅ Переимпорт завершен! Обработано материалов: ${result.total_materials}`);
          setImportResults({ success: result.total_materials, error: 0 });
          
          // Обновляем данные на странице
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setImportStatus(`❌ Ошибка: ${result.message}`);
          setImportResults({ success: 0, error: 1 });
        }
      } else {
        setImportStatus('❌ Ошибка соединения с сервером');
        setImportResults({ success: 0, error: 1 });
      }
    } catch (error) {
      setImportStatus(`❌ Ошибка: ${error}`);
      setImportResults({ success: 0, error: 1 });
      console.error('Error during reimport:', error);
    }

    setTimeout(() => {
      setIsImporting(false);
    }, 3000);
  };

  const handleImportByCategory = async (category: string) => {
    alert('Импорт по категориям временно недоступен. Используйте полный переимпорт материалов.');
    return;

    setIsImporting(true);
    setImportProgress(0);
    setImportStatus(`Импортирую категорию: ${category}`);
    setImportResults({ success: 0, error: 0 });

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < categoryMaterials.length; i++) {
      const material = categoryMaterials[i];
      const progress = ((i + 1) / categoryMaterials.length) * 100;
      
      setImportProgress(progress);
      setImportStatus(`Импортирую: ${material.name}`);

      try {
        const formData = new FormData();
        formData.append('name', material.name);
        formData.append('description', material.description);
        formData.append('category', material.category);
        formData.append('tags', JSON.stringify(material.tags));
        formData.append('sort_order', material.sort_order.toString());
        formData.append('is_featured', material.is_featured.toString());
        
        const emptyFile = new File([''], material.file_path.split('/').pop() || 'file.pdf', {
          type: 'application/pdf'
        });
        formData.append('file', emptyFile);
        
        const response = await fetch('http://localhost:8000/api/v1/materials/', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          successCount++;
        } else {
          errorCount++;
        }
      } catch (error) {
        errorCount++;
        console.error('Error importing material:', error);
      }

      setImportResults({ success: successCount, error: errorCount });
      
      if (i < categoryMaterials.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setImportStatus(`Импорт категории "${category}" завершен!`);
    setIsImporting(false);
  };

  const handleClearAll = async () => {
    if (!confirm('⚠️ ВНИМАНИЕ! Это действие удалит ВСЕ материалы из базы данных. Продолжить?')) {
      return;
    }

    try {
      setImportStatus('Удаляю все материалы...');
      
      const response = await fetch('http://localhost:8000/api/v1/materials/');
      if (!response.ok) {
        throw new Error('Не удалось получить список материалов');
      }
      
      const data = await response.json();
      const materials = data.materials || [];
      
      if (materials.length === 0) {
        setImportStatus('Материалы для удаления не найдены');
        return;
      }
      
      setImportStatus(`Найдено ${materials.length} материалов для удаления...`);
      
      let deletedCount = 0;
      let errorCount = 0;
      
      for (let i = 0; i < materials.length; i++) {
        const material = materials[i];
        const progress = ((i + 1) / materials.length) * 100;
        
        setImportProgress(progress);
        setImportStatus(`Удаляю: ${material.name}`);
        
        try {
          const deleteResponse = await fetch(`http://localhost:8000/api/v1/materials/${material.id}`, {
            method: 'DELETE'
          });
          
          if (deleteResponse.ok) {
            deletedCount++;
          } else {
            errorCount++;
          }
        } catch (error) {
          errorCount++;
        }
        
        if (i < materials.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
      
      setImportStatus(`Удаление завершено! Удалено: ${deletedCount}, Ошибок: ${errorCount}`);
      setImportProgress(0);
      
    } catch (error) {
      setImportStatus(`Ошибка при удалении: ${error}`);
      console.error('Error clearing materials:', error);
    }
  };

  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      'catalogs': 'Каталоги продукции',
      'specifications': 'Технические характеристики',
      'certificates': 'Сертификаты качества',
      'guides': 'Руководства по монтажу',
      'brochures': 'Брошюры и презентации',
      'standards': 'Стандарты и нормы',
      'applications': 'Применение',
      'designs': 'Дизайн и текстуры',
      'other': 'Прочие документы'
    };
    return names[category] || category;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Управление материалами InoxMetalArt
          </h1>
          <p className="text-gray-600">
            ✅ Материалы уже импортированы из локальной папки Catalog. Всего: <strong>28 материалов</strong>
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Всего материалов</p>
                <p className="text-2xl font-bold text-gray-900">{totalMaterials}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Tag className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Категорий</p>
                <p className="text-2xl font-bold text-gray-900">{Object.keys(categoryStats).length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Рекомендуемых</p>
                <p className="text-2xl font-bold text-gray-900">{featuredMaterials}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <File className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Формат</p>
                <p className="text-2xl font-bold text-gray-900">PDF</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Основные действия */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Основные действия</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleImportAll}
                disabled={isImporting}
                className="w-full sm:w-auto"
              >
                {isImporting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Переимпорт...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Переимпортировать материалы
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleClearAll}
                variant="outline"
                disabled={isImporting}
                className="w-full sm:w-auto text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Очистить базу данных
              </Button>
              
              <Button
                onClick={() => window.open('/admin/materials', '_blank')}
                variant="outline"
                className="w-full sm:w-auto text-blue-600 hover:text-blue-800"
              >
                <Database className="w-4 h-4 mr-2" />
                Просмотреть материалы
              </Button>
            </div>
          </div>
        </div>

        {/* Прогресс импорта */}
        {isImporting && (
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Прогресс импорта</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Прогресс</span>
                  <span>{Math.round(importProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${importProgress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                <p className="mb-2">{importStatus}</p>
                <div className="flex space-x-4">
                  <span className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    Успешно: {importResults.success}
                  </span>
                  <span className="flex items-center">
                    <AlertCircle className="w-4 h-4 text-red-500 mr-1" />
                    Ошибок: {importResults.error}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Импорт по категориям */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Переимпорт по категориям</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(categoryStats).map(([category, count]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      {getCategoryName(category)}
                    </h3>
                    <span className="text-sm text-gray-500">{count}</span>
                  </div>
                  <Button
                    onClick={() => handleImportByCategory(category)}
                    disabled={isImporting}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Импортировать
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Список материалов */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Список материалов в базе данных ({totalMaterials})
            </h2>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Загружаю материалы...</span>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {realMaterials.map((material, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{material.name}</h3>
                        {material.is_featured && (
                          <Star className="w-4 h-4 text-yellow-500" />
                        )}
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {material.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{material.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <File className="w-3 h-3 mr-1" />
                          {material.file_type}
                        </span>
                        <span>{material.file_size}</span>
                        <span className="flex items-center">
                          <Tag className="w-3 h-3 mr-1" />
                          {material.tags ? material.tags.length : 0} тегов
                        </span>
                        <span>{material.downloads || 0} скачиваний</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              </div>
            )}
          </div>
        </div>

        {/* Информация */}
        <div className="mt-8 bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Статус импорта</h3>
          <div className="text-sm text-green-800 space-y-2">
            <p>• Материалы успешно импортированы из папки Catalog</p>
            <p>• Все файлы скопированы в uploads/materials/</p>
            <p>• Автоматически определены категории и теги</p>
            <p>• Материалы доступны через API и веб-интерфейс</p>
            <p>• Для обновления добавьте новые файлы в Catalog и переимпортируйте</p>
          </div>
        </div>

        {/* Команды консоли */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">💻 Полезные команды</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>Команды для работы с материалами через терминал:</p>
            <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-xs space-y-1">
              <div>cd backend</div>
              <div>python import_to_db.py  # Переимпорт материалов</div>
              <div>python final_test.py   # Проверка системы</div>
              <div>python test_api.py     # Тест API</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportMaterials;

