import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Eye,
  Download,
  FileText,
  ArrowLeft,
  Award,
  Globe,
  Grid,
  CheckCircle,
  File,
  FileImage,
  FileSpreadsheet,
  FileCode
} from 'lucide-react';
import Button from '../components/ui/Button';

interface Material {
  id: number;
  name: string;
  category: string;
  description: string;
  fileType: string;
  fileSize: string;
  downloadUrl: string;
  tags: string[];
  uploadDate: string;
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



  // Детальная страница материала
  if (selectedMaterial) {
    return (
      <div className="min-h-screen bg-white pt-32">
        {/* Back Button */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setSelectedMaterial(null)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Вернуться к материалам</span>
            </button>
          </div>
        </div>

        {/* Material Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Material Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                                   <div className="flex items-center space-x-4">
                     <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
                       {React.createElement(getFileIcon(selectedMaterial.fileType), { className: "w-8 h-8 text-white" })}
                     </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900">{selectedMaterial.name}</h1>
                    <p className="text-xl text-gray-600">{selectedMaterial.description}</p>
                  </div>
                </div>

                {/* File Information */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <File className="w-6 h-6 mr-2 text-blue-600" />
                    Информация о файле
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Тип файла:</span>
                      <div className="text-gray-700 font-medium">{selectedMaterial.fileType.toUpperCase()}</div>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Размер:</span>
                      <div className="text-gray-700 font-medium">{selectedMaterial.fileSize}</div>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Дата загрузки:</span>
                      <div className="text-gray-700 font-medium">{selectedMaterial.uploadDate}</div>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500">Скачиваний:</span>
                      <div className="text-gray-700 font-medium">{selectedMaterial.downloads}</div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-blue-600" />
                    Теги
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMaterial.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Download Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Download Button */}
              <div className="bg-blue-50 p-8 rounded-2xl text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Download className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Скачать материал
                </h3>
                <p className="text-gray-600 mb-6">
                  Нажмите кнопку ниже для скачивания файла
                </p>
                                 <Button 
                   size="lg" 
                   className="w-full"
                   onClick={() => window.open(`http://localhost:8000/${selectedMaterial.downloadUrl}`, '_blank')}
                 >
                  <Download className="w-5 h-5 mr-2" />
                  Скачать {selectedMaterial.fileType.toUpperCase()}
                </Button>
                <p className="text-xs text-gray-500 mt-4">
                  Файл будет загружен в папку загрузок вашего браузера
                </p>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Дополнительная информация
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Файл проверен на вирусы</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Актуальная версия документа</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Бесплатное скачивание</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
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
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer"
                  onClick={() => setSelectedMaterial(material)}
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
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {material.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {material.description}
                    </p>

                    {/* File Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Тип:</span>
                        <span className="text-gray-700 font-medium">{material.fileType.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Размер:</span>
                        <span className="text-gray-700 font-medium">{material.fileSize}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Скачиваний:</span>
                        <span className="text-gray-700 font-medium">{material.downloads}</span>
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
                    <div className="flex justify-center">
                      <Button variant="outline" size="sm" fullWidth>
                        <Eye className="w-4 h-4 mr-2" />
                        Подробнее
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
    </div>
  );
};

export default Materials;
