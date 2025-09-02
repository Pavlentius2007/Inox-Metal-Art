import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Eye,
  Download,
  FileText,
  Award,
  Globe,
  Grid,
  CheckCircle,
  File,
  FileImage,
  FileSpreadsheet,
  FileCode,
  X
} from 'lucide-react';
import Button from '../components/ui/Button';
import '../styles/materials.css';

interface Material {
  id: number;
  name: string;
  category: string;
  description: string;
  file_type: string;
  file_size: string;
  download_url: string;
  tags: string[];
  upload_date: string;
  downloads: number;
}

const Materials: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Категории материалов
  const categories = [
    { id: 'all', name: 'Все материалы', icon: Grid },
    { id: 'catalogs', name: 'Каталоги продукции', icon: FileText },
    { id: 'specifications', name: 'Технические характеристики', icon: FileCode },
    { id: 'certificates', name: 'Сертификаты качества', icon: Award },
    { id: 'guides', name: 'Руководства по монтажу', icon: FileText },
    { id: 'brochures', name: 'Брошюры и презентации', icon: FileImage },
    { id: 'standards', name: 'Стандарты и нормы', icon: FileText }
  ];

  // Материалы для скачивания (пока пустой массив - будет заполняться через API)
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  // Получение материалов с сервера
  React.useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/v1/materials/');
        if (response.ok) {
          const data = await response.json();
          setMaterials(data.materials || []);
        } else {
          setError('Ошибка загрузки материалов');
        }
      } catch (err) {
        setError('Ошибка соединения с сервером');
        console.error('Error fetching materials:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  // Функция скачивания материала
  const handleDownload = async (material: Material) => {
    try {
      // Показываем индикатор загрузки
      const downloadButton = document.querySelector(`[data-material-id="${material.id}"]`);
      if (downloadButton) {
        downloadButton.innerHTML = '<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div>';
        downloadButton.setAttribute('disabled', 'true');
      }

      // Увеличиваем счетчик скачиваний
      await fetch(`http://localhost:8000/api/v1/materials/${material.id}/download`, {
        method: 'POST',
      });

      // Скачиваем файл
      const response = await fetch(`http://localhost:8000/uploads/${material.file_path}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = material.name;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Обновляем локальное состояние
        setMaterials(prev => prev.map(m => 
          m.id === material.id ? { ...m, downloads: m.downloads + 1 } : m
        ));

        // Показываем уведомление об успехе
        if (downloadButton) {
          downloadButton.innerHTML = '<CheckCircle className="w-4 h-4 mx-auto text-green-500" />';
          setTimeout(() => {
            if (downloadButton) {
              downloadButton.innerHTML = '<Download className="w-4 h-4 mr-2" />Скачать';
              downloadButton.removeAttribute('disabled');
            }
          }, 2000);
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Ошибка скачивания:', error);
      alert(`Ошибка при скачивании файла: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
      
      // Восстанавливаем кнопку
      const downloadButton = document.querySelector(`[data-material-id="${material.id}"]`);
      if (downloadButton) {
        downloadButton.innerHTML = '<Download className="w-4 h-4 mr-2" />Скачать';
        downloadButton.removeAttribute('disabled');
      }
    }
  };

  const filteredMaterials = materials.filter(material => {
    return selectedCategory === 'all' || material.category === selectedCategory;
  });

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return FileText;
      case 'image':
      case 'jpg':
      case 'jpeg':
      case 'png':
        return FileImage;
      case 'excel':
      case 'xlsx':
      case 'xls':
        return FileSpreadsheet;
      case 'doc':
      case 'docx':
        return FileText;
      default:
        return File;
    }
  };



  // Детальная страница заменена модальным окном ниже

  return (
    <div className="min-h-screen bg-white pt-32">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden materials-hero">
        {/* Фото фон */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900" style={{
          backgroundImage: 'url("/images/materials-hero-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}></div>
        
        {/* Затемнение поверх фото */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white hero-text">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Материалы
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto"
          >
            Полезные материалы и документация для скачивания
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-blue-200 max-w-3xl mx-auto mt-4"
          >
            Каталоги, технические характеристики, сертификаты и руководства
          </motion.p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Загрузка материалов...
              </h3>
              <p className="text-gray-600">
                Пожалуйста, подождите
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <div className="w-12 h-12 text-red-500">⚠️</div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ошибка загрузки
              </h3>
              <p className="text-gray-600 mb-4">
                {error}
              </p>
              <Button onClick={() => window.location.reload()}>
                Попробовать снова
              </Button>
            </div>
          ) : materials.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Материалы не найдены
              </h3>
              <p className="text-gray-600">
                В данный момент нет доступных материалов для скачивания
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMaterials.map((material, index) => (
                <motion.div
                  key={material.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 h-full min-h-[420px] flex flex-col"
                >
                  {/* Material Icon */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                         {React.createElement(getFileIcon(material.file_type), { className: "w-12 h-12 text-white" })}
                       </div>
                     </div>
                   </div>

                  {/* Material Info */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200 leading-7 min-h-[56px]">
                      {material.name}
                    </h3>
                    <p className="text-gray-600 mb-4 h-12 overflow-hidden">
                      {material.description}
                    </p>

                    {/* File Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Тип:</span>
                        <span className="text-gray-700 font-medium">{material.file_type.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Размер:</span>
                        <span className="text-gray-700 font-medium">{material.file_size}</span>
                      </div>
                      
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {material.tags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      {material.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          +{material.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-auto">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMaterial(material);
                        }}
                        className="flex-1"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Подробнее
                      </Button>
                      <Button 
                        size="sm" 
                        data-material-id={material.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(material);
                        }}
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Скачать
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredMaterials.length === 0 && materials.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Материалы не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте выбрать другую категорию или свяжитесь с нами
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Нужны дополнительные материалы?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Свяжитесь с нами для получения дополнительной документации, 
              технических спецификаций или индивидуальных консультаций.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Связаться с нами
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900">
                Запросить материалы
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal: Material Details */}
      {selectedMaterial && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.currentTarget === e.target) setSelectedMaterial(null);
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                  {React.createElement(getFileIcon(selectedMaterial.file_type), { className: 'w-6 h-6 text-white' })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedMaterial.name}</h3>
                  <p className="text-gray-600">{selectedMaterial.category}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg" onClick={() => setSelectedMaterial(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-gray-700">{selectedMaterial.description}</p>
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
                <div className="text-sm">
                  <span className="text-gray-500">Тип:</span>
                  <div className="text-gray-800 font-medium">{selectedMaterial.file_type.toUpperCase()}</div>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Размер:</span>
                  <div className="text-gray-800 font-medium">{selectedMaterial.file_size}</div>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Дата загрузки:</span>
                  <div className="text-gray-800 font-medium">{selectedMaterial.upload_date}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedMaterial.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div>
                <Button
                  size="lg"
                  className="w-full"
                  data-material-id={selectedMaterial.id}
                  onClick={() => handleDownload(selectedMaterial)}
                >
                  <Download className="w-5 h-5 mr-2" /> Скачать {selectedMaterial.file_type.toUpperCase()}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Materials;
