import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Database, Trash2, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import { inoxMetalArtProducts } from '../../scripts/importProducts';

const ImportProducts: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState<string>('');
  const [importResults, setImportResults] = useState<{
    success: number;
    errors: number;
    total: number;
  }>({ success: 0, errors: 0, total: 0 });

  // Функция для добавления продукта через API
  const addProduct = async (productData: any): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/products/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error(`Ошибка при добавлении продукта: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error(`❌ Ошибка при добавлении продукта "${productData.name}":`, error);
      return false;
    }
  };

  // Функция для массового импорта всех продуктов
  const importAllProducts = async () => {
    if (!confirm('🚀 Начать импорт всех продуктов с сайта InoxMetalArt?')) {
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    setImportStatus('Начинаем импорт...');
    setImportResults({ success: 0, errors: 0, total: inoxMetalArtProducts.length });

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < inoxMetalArtProducts.length; i++) {
      const product = inoxMetalArtProducts[i];
      const progress = Math.round(((i + 1) / inoxMetalArtProducts.length) * 100);
      
      setImportProgress(progress);
      setImportStatus(`Импортируем: ${product.name} (${i + 1}/${inoxMetalArtProducts.length})`);

      try {
        const success = await addProduct(product);
        if (success) {
          successCount++;
        } else {
          errorCount++;
        }

        setImportResults({ success: successCount, errors: errorCount, total: inoxMetalArtProducts.length });

        // Небольшая задержка между запросами
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        errorCount++;
        setImportResults({ success: successCount, errors: errorCount, total: inoxMetalArtProducts.length });
      }
    }

    setImportStatus('Импорт завершен!');
    setIsImporting(false);
  };

  // Функция для импорта по категориям
  const importProductsByCategory = async (category: string) => {
    const filteredProducts = inoxMetalArtProducts.filter(p => p.category === category);
    
    if (filteredProducts.length === 0) {
      alert(`❌ Категория "${category}" не найдена`);
      return;
    }

    if (!confirm(`🚀 Импортировать ${filteredProducts.length} продуктов категории "${category}"?`)) {
      return;
    }

    setIsImporting(true);
    setImportProgress(0);
    setImportStatus(`Импортируем категорию "${category}"...`);
    setImportResults({ success: 0, errors: 0, total: filteredProducts.length });

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < filteredProducts.length; i++) {
      const product = filteredProducts[i];
      const progress = Math.round(((i + 1) / filteredProducts.length) * 100);
      
      setImportProgress(progress);
      setImportStatus(`Импортируем: ${product.name} (${i + 1}/${filteredProducts.length})`);

      try {
        const success = await addProduct(product);
        if (success) {
          successCount++;
        } else {
          errorCount++;
        }

        setImportResults({ success: successCount, errors: errorCount, total: filteredProducts.length });

        // Небольшая задержка между запросами
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        errorCount++;
        setImportResults({ success: successCount, errors: errorCount, total: filteredProducts.length });
      }
    }

    setImportStatus(`Импорт категории "${category}" завершен!`);
    setIsImporting(false);
  };

  // Функция для очистки всех продуктов
  const clearAllProducts = async () => {
    if (!confirm('⚠️ ВНИМАНИЕ! Это действие удалит ВСЕ продукты из базы данных. Продолжить?')) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/products/', {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('🗑️ Все продукты успешно удалены');
      } else {
        alert('❌ Ошибка при удалении продуктов');
      }
    } catch (error) {
      alert('❌ Ошибка при удалении продуктов');
      console.error('Ошибка при удалении продуктов:', error);
    }
  };

  // Получаем уникальные категории
  const categories = [...new Set(inoxMetalArtProducts.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Импорт продуктов InoxMetalArt
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Массовый импорт всех продуктов с официального сайта InoxMetalArt.com в вашу базу данных
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow p-6 text-center"
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {inoxMetalArtProducts.length}
            </div>
            <div className="text-gray-600">Всего продуктов</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6 text-center"
          >
            <div className="text-3xl font-bold text-green-600 mb-2">
              {categories.length}
            </div>
            <div className="text-gray-600">Категорий</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6 text-center"
          >
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {inoxMetalArtProducts.filter(p => p.specifications.type === 'PVD покрытие').length}
            </div>
            <div className="text-gray-600">PVD покрытий</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6 text-center"
          >
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {inoxMetalArtProducts.filter(p => p.specifications.type === 'Нанопокрытие').length}
            </div>
            <div className="text-gray-600">Нанопокрытий</div>
          </motion.div>
        </div>

        {/* Основные действия */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Импорт всех продуктов */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Импорт всех продуктов</h3>
                <p className="text-gray-600">Добавить все 12 продуктов в базу данных</p>
              </div>
            </div>

            <Button
              onClick={importAllProducts}
              disabled={isImporting}
              className="w-full"
              size="lg"
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Импорт...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Импортировать все
                </>
              )}
            </Button>
          </motion.div>

          {/* Очистка базы */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-red-100 rounded-lg mr-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Очистка базы</h3>
                <p className="text-gray-600">Удалить все продукты из базы данных</p>
              </div>
            </div>

            <Button
              onClick={clearAllProducts}
              disabled={isImporting}
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
              size="lg"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Очистить базу
            </Button>
          </motion.div>
        </div>

        {/* Прогресс импорта */}
        {isImporting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Прогресс импорта</h3>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{importStatus}</span>
                <span>{importProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${importProgress}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{importResults.success}</div>
                <div className="text-sm text-gray-600">Успешно</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{importResults.errors}</div>
                <div className="text-sm text-gray-600">Ошибок</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{importResults.total}</div>
                <div className="text-sm text-gray-600">Всего</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Импорт по категориям */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Импорт по категориям</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => {
              const productCount = inoxMetalArtProducts.filter(p => p.category === category).length;
              return (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{category}</h4>
                    <span className="text-sm text-gray-500">{productCount} продуктов</span>
                  </div>
                  
                  <Button
                    onClick={() => importProductsByCategory(category)}
                    disabled={isImporting}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Импорт
                  </Button>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Список всех продуктов */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Все продукты для импорта</h3>
          
          <div className="space-y-4">
            {inoxMetalArtProducts.map((product, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{product.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Database className="w-4 h-4 mr-1" />
                        {product.category}
                      </span>
                      <span className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {product.features.length} характеристик
                      </span>
                      <span className="flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {product.price}
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {product.specifications.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ImportProducts;



