import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Download, 
  Eye,
  Star,
  Shield,
  Sparkles,
  Palette,
  Brush,
  FileText,
  Grid,
  List,
  X
} from 'lucide-react';
import Button from '../components/ui/Button';

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<any>(null);


  // Категории образцов
  const categories = [
    { id: 'all', name: 'Все образцы', icon: Grid },
    { id: 'pvd-samples', name: 'PVD покрытия', icon: Sparkles },
    { id: 'patina-samples', name: 'Патинирование', icon: Palette },
    { id: 'etched-samples', name: 'Травление узоров', icon: FileText },
    { id: 'embossed-samples', name: 'Рифленые узоры', icon: Star },
    { id: 'brushed-samples', name: 'Брашировка', icon: Brush },
    { id: 'nano-samples', name: 'Нанопокрытия', icon: Shield }
  ];

  // Образцы продукции
  const samples = [
    {
      id: 1,
      name: 'Titanium Gold PVD',
      category: 'pvd-samples',
      description: 'Золотое PVD покрытие с зеркальным блеском',
      image: '/images/gallery/titanium-gold.jpg',
      specifications: {
        color: 'Золотой',
        finish: 'Зеркальный',
        thickness: '0.3 мкм',
        hardness: '1600-1800 HV'
      },
      applications: ['Лифты премиум-класса', 'Декоративные панели', 'Архитектурные элементы'],
      price: 'от 3500 ₽/м²'
    },
    {
      id: 2,
      name: 'Titanium Bronze PVD',
      category: 'pvd-samples',
      description: 'Бронзовое PVD покрытие с теплым оттенком',
      image: '/images/gallery/titanium-bronze.jpg',
      specifications: {
        color: 'Бронзовый',
        finish: 'Матовая',
        thickness: '0.3 мкм',
        hardness: '1600-1800 HV'
      },
      applications: ['Интерьерные панели', 'Мебельные фасады', 'Декоративные элементы'],
      price: 'от 3500 ₽/м²'
    },
    {
      id: 3,
      name: 'Titanium Black PVD',
      category: 'pvd-samples',
      description: 'Черное PVD покрытие с глубоким цветом',
      image: '/images/gallery/titanium-black.jpg',
      specifications: {
        color: 'Черный',
        finish: 'Матовая',
        thickness: '0.3 мкм',
        hardness: '1600-1800 HV'
      },
      applications: ['Современные интерьеры', 'Минималистичный дизайн', 'Контрастные решения'],
      price: 'от 3500 ₽/м²'
    },
    {
      id: 4,
      name: 'Titanium Rainbow PVD',
      category: 'pvd-samples',
      description: 'Радужное PVD покрытие с переливающимися цветами',
      image: '/images/gallery/titanium-rainbow.jpg',
      specifications: {
        color: 'Радужный',
        finish: 'Переливающийся',
        thickness: '0.3 мкм',
        hardness: '1600-1800 HV'
      },
      applications: ['Художественные инсталляции', 'Декоративные элементы', 'Архитектурные акценты'],
      price: 'от 4000 ₽/м²'
    },
    {
      id: 5,
      name: 'Патинированная сталь - Антик',
      category: 'patina-samples',
      description: 'Состаренная поверхность с античным оттенком',
      image: '/images/gallery/patina-antique.jpg',
      specifications: {
        finish: 'Состаренная',
        color: 'Античный',
        texture: 'Рельефная',
        process: 'Химическое состаривание'
      },
      applications: ['Классические интерьеры', 'Рестораны', 'Отели', 'Музеи'],
      price: 'от 4500 ₽/м²'
    },
    {
      id: 6,
      name: 'Патинированная сталь - Винтаж',
      category: 'patina-samples',
      description: 'Винтажная отделка с теплыми оттенками',
      image: '/images/gallery/patina-vintage.jpg',
      specifications: {
        finish: 'Винтажная',
        color: 'Теплые тона',
        texture: 'Состаренная',
        process: 'Химическое состаривание'
      },
      applications: ['Винтажные интерьеры', 'Кафе', 'Бутики', 'Частные дома'],
      price: 'от 4500 ₽/м²'
    },
    {
      id: 7,
      name: 'Геометрический узор',
      category: 'etched-samples',
      description: 'Современный геометрический узор с точным травлением',
      image: '/images/gallery/etched-geometric.jpg',
      specifications: {
        pattern: 'Геометрический',
        depth: '0.1-0.3 мм',
        precision: 'Высокая',
        technique: 'Химическое травление'
      },
      applications: ['Современные лифты', 'Офисные интерьеры', 'Торговые центры'],
      price: 'от 3800 ₽/м²'
    },
    {
      id: 8,
      name: 'Флористический узор',
      category: 'etched-samples',
      description: 'Элегантный цветочный узор с природными мотивами',
      image: '/images/gallery/etched-floral.jpg',
      specifications: {
        pattern: 'Флористический',
        depth: '0.1-0.3 мм',
        precision: 'Высокая',
        technique: 'Химическое травление'
      },
      applications: ['Элитные лифты', 'Рестораны', 'Отели', 'Частные интерьеры'],
      price: 'от 3800 ₽/м²'
    },
    {
      id: 9,
      name: 'Классический орнамент',
      category: 'etched-samples',
      description: 'Традиционный классический орнамент',
      image: '/images/gallery/etched-classic.jpg',
      specifications: {
        pattern: 'Классический',
        depth: '0.1-0.3 мм',
        precision: 'Высокая',
        technique: 'Химическое травление'
      },
      applications: ['Классические интерьеры', 'Музеи', 'Театры', 'Исторические здания'],
      price: 'от 3800 ₽/м²'
    },
    {
      id: 10,
      name: 'Рифленый узор - Классика',
      category: 'embossed-samples',
      description: 'Объемный классический орнамент с глубиной до 2 мм',
      image: '/images/gallery/embossed-classic.jpg',
      specifications: {
        pattern: 'Классический',
        depth: 'До 2 мм',
        relief: 'Объемный',
        technique: 'Механическое тиснение'
      },
      applications: ['Классические интерьеры', 'Элитные лифты', 'Декоративные панели'],
      price: 'от 4200 ₽/м²'
    },
    {
      id: 11,
      name: 'Рифленый узор - Модерн',
      category: 'embossed-samples',
      description: 'Современный абстрактный узор с тактильной поверхностью',
      image: '/images/gallery/embossed-modern.jpg',
      specifications: {
        pattern: 'Абстрактный',
        depth: 'До 2 мм',
        relief: 'Объемный',
        technique: 'Механическое тиснение'
      },
      applications: ['Современные интерьеры', 'Арт-галереи', 'Дизайн-студии'],
      price: 'от 4200 ₽/м²'
    },
    {
      id: 12,
      name: 'Art Brush - Линейная',
      category: 'brushed-samples',
      description: 'Линейная брашировка с направленной текстурой',
      image: '/images/gallery/brushed-linear.jpg',
      specifications: {
        technique: 'Линейная брашировка',
        direction: 'Направленная',
        texture: 'Линейная',
        finish: 'Матовая'
      },
      applications: ['Современные интерьеры', 'Лифты', 'Мебельные фасады'],
      price: 'от 3600 ₽/м²'
    },
    {
      id: 13,
      name: 'Art Brush - Круговая',
      category: 'brushed-samples',
      description: 'Круговая брашировка с художественной текстурой',
      image: '/images/gallery/brushed-circular.jpg',
      specifications: {
        technique: 'Круговая брашировка',
        direction: 'Круговая',
        texture: 'Художественная',
        finish: 'Матовая'
      },
      applications: ['Художественные инсталляции', 'Декоративные панели', 'Архитектурные детали'],
      price: 'от 3600 ₽/м²'
    },
    {
      id: 14,
      name: 'NSR™ покрытие',
      category: 'nano-samples',
      description: 'Нанопокрытие против царапин с сохранением внешнего вида',
      image: '/images/gallery/nano-nsr.jpg',
      specifications: {
        type: 'NSR™',
        hardness: '578 HV',
        protection: 'В 4 раза выше',
        transparency: 'Полная'
      },
      applications: ['Лифты', 'Коммерческие кухни', 'Общественные пространства'],
      price: 'от 2800 ₽/м²'
    },
    {
      id: 15,
      name: 'NAS™ покрытие',
      category: 'nano-samples',
      description: 'Антибактериальное покрытие без отпечатков',
      image: '/images/gallery/nano-nas.jpg',
      specifications: {
        type: 'NAS™',
        effect: 'Антибактериальное',
        maintenance: 'Не требуется',
        eco: 'Экологичное'
      },
      applications: ['Больницы', 'Аэропорты', 'Торговые центры', 'Офисы'],
      price: 'от 3200 ₽/м²'
    }
  ];

  const filteredSamples = samples.filter(sample => {
    return selectedCategory === 'all' || sample.category === selectedCategory;
  });

  // Модальное окно для просмотра изображения
  if (selectedImage) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <div className="relative max-w-6xl w-full mx-4">
          {/* Кнопка закрытия */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Изображение */}
          <div className="relative">
            <div className="h-96 md:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                  <Palette className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            {/* Информация об образце */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{selectedImage.name}</h2>
              <p className="text-blue-200 mb-4">{selectedImage.description}</p>
              
              {/* Спецификации */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {Object.entries(selectedImage.specifications).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <div className="text-white font-medium">{String(value)}</div>
                  </div>
                ))}
              </div>

              {/* Применение */}
              <div className="mb-4">
                <h4 className="text-blue-200 font-semibold mb-2">Применение:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedImage.applications.map((app: string, idx: number) => (
                    <span key={idx} className="px-2 py-1 bg-blue-600/50 rounded text-sm">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Цена и действия */}
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-blue-400">
                  {selectedImage.price}
                </div>
                <div className="flex space-x-3">
                  <Button variant="secondary" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Скачать образец
                  </Button>
                  <Button variant="primary" size="sm">
                    Запросить цену
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
            Галерея образцов
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto"
          >
            Визуальные образцы всех типов отделок нержавеющей стали InoxMetalArt
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-blue-200 max-w-3xl mx-auto mt-4"
          >
            От PVD-покрытий до художественных отделок - изучите качество и разнообразие нашей продукции
          </motion.p>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Categories Filter */}
            <div className="flex flex-wrap gap-3">
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

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                                 <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredSamples.map((sample, index) => (
                <motion.div
                  key={sample.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer"
                  onClick={() => setSelectedImage(sample)}
                >
                  {/* Sample Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                        <Palette className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Sample Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {sample.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {sample.description}
                    </p>

                    {/* Key Specification */}
                    <div className="mb-4">
                      {Object.entries(sample.specifications).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="text-gray-700 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-blue-600">
                        {sample.price}
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Подробнее
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredSamples.map((sample, index) => (
                <motion.div
                  key={sample.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                  onClick={() => setSelectedImage(sample)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Sample Image */}
                    <div className="md:w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden rounded-l-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                          <Palette className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Sample Info */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                            {sample.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {sample.description}
                          </p>

                          {/* Specifications */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {Object.entries(sample.specifications).map(([key, value]) => (
                              <div key={key} className="text-sm">
                                <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                <div className="text-gray-700 font-medium">{value}</div>
                              </div>
                            ))}
                          </div>

                          {/* Applications */}
                          <div className="mb-4">
                            <h4 className="text-gray-700 font-semibold mb-2">Применение:</h4>
                            <div className="flex flex-wrap gap-2">
                              {sample.applications.map((app: string, idx: number) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                  {app}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Price and Actions */}
                        <div className="md:ml-6 md:text-right">
                          <div className="text-2xl font-bold text-blue-600 mb-4">
                            {sample.price}
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Скачать образец
                            </Button>
                            <Button variant="primary" size="sm">
                              Запросить цену
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredSamples.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Образцы не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте выбрать другую категорию или свяжитесь с нами для получения образцов
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
              Нужны физические образцы?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Закажите бесплатные образцы нашей продукции для оценки качества и выбора отделки. 
              Наши специалисты помогут подобрать оптимальные решения.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Заказать образцы
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900">
                Получить консультацию
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
