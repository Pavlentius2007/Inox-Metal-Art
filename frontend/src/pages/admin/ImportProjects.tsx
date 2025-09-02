import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Database, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Building,
  MapPin,
  Calendar,
  Star
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { 
  inoxMetalArtProjects, 
  addProject, 
  importAllProjects, 
  importProjectsByCategory, 
  clearAllProjects 
} from '../../scripts/importProjects';

const ImportProjects: React.FC = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState('');
  const [importResults, setImportResults] = useState<{
    success: number;
    error: number;
    total: number;
  }>({ success: 0, error: 0, total: 0 });

  // Статистика проектов
  const totalProjects = inoxMetalArtProjects.length;
  const exteriorProjects = inoxMetalArtProjects.filter(p => p.category === 'exterior').length;
  const interiorProjects = inoxMetalArtProjects.filter(p => p.category === 'interior').length;
  const elevatorProjects = inoxMetalArtProjects.filter(p => p.category === 'elevators').length;
  const featuredProjects = inoxMetalArtProjects.filter(p => p.is_featured).length;

  // Обработчик импорта всех проектов
  const handleImportAll = async () => {
    setIsImporting(true);
    setImportProgress(0);
    setImportStatus('Начинаем импорт всех проектов...');
    setImportResults({ success: 0, error: 0, total: totalProjects });

    try {
      await importAllProjects();
      setImportStatus('Импорт завершен успешно!');
      setImportProgress(100);
      setImportResults({ success: totalProjects, error: 0, total: totalProjects });
    } catch (error) {
      setImportStatus('Ошибка при импорте проектов');
      setImportResults({ success: 0, error: totalProjects, total: totalProjects });
    } finally {
      setIsImporting(false);
    }
  };

  // Обработчик импорта по категории
  const handleImportByCategory = async (category: string) => {
    const categoryProjects = inoxMetalArtProjects.filter(p => p.category === category);
    setIsImporting(true);
    setImportProgress(0);
    setImportStatus(`Начинаем импорт проектов категории "${category}"...`);
    setImportResults({ success: 0, error: 0, total: categoryProjects.length });

    try {
      await importProjectsByCategory(category);
      setImportStatus(`Импорт категории "${category}" завершен успешно!`);
      setImportProgress(100);
      setImportResults({ success: categoryProjects.length, error: 0, total: categoryProjects.length });
    } catch (error) {
      setImportStatus(`Ошибка при импорте категории "${category}"`);
      setImportResults({ success: 0, error: categoryProjects.length, total: categoryProjects.length });
    } finally {
      setIsImporting(false);
    }
  };

  // Обработчик очистки базы данных
  const handleClearAll = async () => {
    try {
      await clearAllProjects();
      setImportStatus('База данных проектов очищена');
      setImportResults({ success: 0, error: 0, total: 0 });
    } catch (error) {
      setImportStatus('Ошибка при очистке базы данных');
    }
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Импорт проектов InoxMetalArt
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Импортируйте готовые проекты с сайта inoxmetalart.com в вашу базу данных. 
          Все проекты уже структурированы и готовы к использованию.
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 p-4 rounded-lg text-center"
        >
          <div className="text-2xl font-bold text-blue-600">{totalProjects}</div>
          <div className="text-sm text-blue-800">Всего проектов</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-50 p-4 rounded-lg text-center"
        >
          <div className="text-2xl font-bold text-green-600">{exteriorProjects}</div>
          <div className="text-sm text-green-800">Экстерьер</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-purple-50 p-4 rounded-lg text-center"
        >
          <div className="text-2xl font-bold text-purple-600">{interiorProjects}</div>
          <div className="text-sm text-purple-800">Интерьер</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-orange-50 p-4 rounded-lg text-center"
        >
          <div className="text-2xl font-bold text-orange-600">{elevatorProjects}</div>
          <div className="text-sm text-orange-800">Лифты</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-yellow-50 p-4 rounded-lg text-center"
        >
          <div className="text-2xl font-bold text-yellow-600">{featuredProjects}</div>
          <div className="text-sm text-yellow-800">Выделенные</div>
        </motion.div>
      </div>

      {/* Основные действия */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant="primary"
          size="lg"
          onClick={handleImportAll}
          disabled={isImporting}
          className="flex items-center gap-2"
        >
          {isImporting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          Импортировать все проекты
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handleClearAll}
          disabled={isImporting}
          className="flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-5 h-5" />
          Очистить базу данных
        </Button>
      </div>

      {/* Прогресс импорта */}
      {isImporting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Импорт проектов</h3>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Прогресс</span>
              <span>{importProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${importProgress}%` }}
              ></div>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{importStatus}</p>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">{importResults.success}</div>
              <div className="text-sm text-gray-600">Успешно</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{importResults.error}</div>
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
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          Импорт по категориям
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            onClick={() => handleImportByCategory('exterior')}
            disabled={isImporting}
            className="flex items-center gap-2"
          >
            <Building className="w-4 h-4" />
            Экстерьер ({exteriorProjects})
          </Button>

          <Button
            variant="outline"
            onClick={() => handleImportByCategory('interior')}
            disabled={isImporting}
            className="flex items-center gap-2"
          >
            <Building className="w-4 h-4" />
            Интерьер ({interiorProjects})
          </Button>

          <Button
            variant="outline"
            onClick={() => handleImportByCategory('elevators')}
            disabled={isImporting}
            className="flex items-center gap-2"
          >
            <Building className="w-4 h-4" />
            Лифты ({elevatorProjects})
          </Button>
        </div>
      </div>

      {/* Список всех проектов */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-600" />
          Все доступные проекты ({totalProjects})
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {inoxMetalArtProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                  {project.title}
                </h4>
                {project.is_featured && (
                  <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                )}
              </div>
              
              <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                {project.short_description}
              </p>
              
              <div className="space-y-1 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{project.completion_date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  <span>{project.client}</span>
                </div>
              </div>
              
              <div className="mt-3">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  project.category === 'exterior' ? 'bg-blue-100 text-blue-800' :
                  project.category === 'interior' ? 'bg-purple-100 text-purple-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {project.category === 'exterior' ? 'Экстерьер' :
                   project.category === 'interior' ? 'Интерьер' : 'Лифты'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Информация */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Информация об импорте
        </h3>
        
        <div className="space-y-2 text-sm text-blue-800">
          <p>• Все проекты автоматически получают статус "Активен"</p>
          <p>• Выделенные проекты помечаются звездочкой</p>
          <p>• Проекты сортируются по порядку сортировки</p>
          <p>• Технологии и особенности сохраняются как массивы</p>
          <p>• Для загрузки изображений используйте форму редактирования проекта</p>
        </div>
      </div>

      {/* Консольные команды */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-600" />
          Консольные команды
        </h3>
        
        <p className="text-sm text-gray-600 mb-3">
          Вы также можете использовать функции импорта через консоль браузера:
        </p>
        
        <div className="space-y-2 text-xs font-mono bg-gray-100 p-3 rounded">
          <div><span className="text-blue-600">inoxMetalArtProjectsImport.importAllProjects()</span> - Импорт всех проектов</div>
          <div><span className="text-blue-600">inoxMetalArtProjectsImport.importProjectsByCategory("exterior")</span> - Импорт по категории</div>
          <div><span className="text-blue-600">inoxMetalArtProjectsImport.clearAllProjects()</span> - Очистка базы данных</div>
          <div><span className="text-blue-600">inoxMetalArtProjectsImport.projects</span> - Список всех проектов</div>
        </div>
      </div>
    </div>
  );
};

export default ImportProjects;



