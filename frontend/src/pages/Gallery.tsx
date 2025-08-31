import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, Palette, FileText, Star, Brush, Zap } from 'lucide-react';
import Button from '../components/ui/Button';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  category: string;
  color: string;
  finish: string;
  price_from: number;
  price_unit: string;
  features: string[];
  image_path: string | null;
  status: string;
}

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Все образцы');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Загружаем данные галереи из API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/v1/gallery/');
        if (!response.ok) {
          throw new Error('Ошибка загрузки галереи');
        }
        const data = await response.json();
        // Фильтруем только активные элементы
        const activeItems = data.galleries.filter((item: GalleryItem) => item.status === 'active');
        setGalleryItems(activeItems);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Получаем уникальные категории
  const categories = ['Все образцы', ...Array.from(new Set(galleryItems.map(item => item.category)))];

  // Фильтруем элементы по выбранной категории
  const filteredItems = selectedCategory === 'Все образцы' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  // Иконки для категорий
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'PVD покрытия': return <Palette className="w-4 h-4" />;
      case 'Патинирование': return <Brush className="w-4 h-4" />;
      case 'Травление узоров': return <FileText className="w-4 h-4" />;
      case 'Рифленые узоры': return <Star className="w-4 h-4" />;
      case 'Брашировка': return <Brush className="w-4 h-4" />;
      case 'Нанопокрытия': return <Zap className="w-4 h-4" />;
      default: return <Palette className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-32">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка галереи...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-32">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md max-w-md mx-auto">
              <p className="font-medium">Ошибка загрузки галереи</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-32">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Галерея образцов
            </h1>
            <p className="text-xl md:text-2xl mb-6 text-blue-100">
              Визуальные образцы всех типов отделок нержавеющей стали InoxMetalArt
            </p>
            <p className="text-lg text-blue-200 max-w-3xl mx-auto">
              От PVD-покрытий до художественных отделок - изучите качество и разнообразие нашей продукции
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category !== 'Все образцы' && getCategoryIcon(category)}
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Palette className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Образцы не найдены
            </h3>
            <p className="text-gray-600 mb-8">
              Попробуйте выбрать другую категорию или свяжитесь с нами для получения образцов
            </p>
            <Button variant="primary" size="lg">
              Связаться с нами
            </Button>
          </div>
        ) : (
          <motion.div
            layout
            className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'space-y-4'
            }
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Image */}
                <div className={`${viewMode === 'list' ? 'w-48 h-32' : 'aspect-video'} bg-gray-100 flex items-center justify-center`}>
                  {item.image_path ? (
                    <img
                      src={`http://localhost:8000/${item.image_path}`}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                      <Palette className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  {/* Category Tag */}
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-1 mb-3 text-sm text-gray-600">
                    {item.color && (
                      <div><span className="font-medium">Цвет:</span> {item.color}</div>
                    )}
                    {item.finish && (
                      <div><span className="font-medium">Отделка:</span> {item.finish}</div>
                    )}
                    {item.price_from && (
                      <div><span className="font-medium">Цена:</span> от {item.price_from} {item.price_unit}</div>
                    )}
                  </div>

                  {/* Features */}
                  {item.features && item.features.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-2">Характеристики:</div>
                      <div className="flex flex-wrap gap-1">
                        {item.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {feature}
                          </span>
                        ))}
                        {item.features.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            +{item.features.length - 3} еще
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button variant="primary" size="sm" fullWidth>
                    Подробнее
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
