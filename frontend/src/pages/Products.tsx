import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Eye,
  Star,
  Shield,
  CheckCircle,
  Palette,
  Sparkles,
  Layers,
  Brush,
  FileText,
  ArrowLeft,
  Clock,
  Award,
  Globe,
  TestTube,
  Settings,
  Loader2
} from 'lucide-react';
import Button from '../components/ui/Button';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  specifications: {
    type: string;
    thickness?: string;
    hardness?: string;
    colors?: string;
    scratch_resistance?: string;
    effect?: string;
    maintenance?: string;
    eco?: string;
    roughness?: string;
    quality?: string;
    reflection?: string;
    texture?: string;
  };
  features: string[];
  image: string;
  price: string;
  detailed: {
    technology: string;
    types?: string[];
    colors?: string[];
    testing?: string;
    quality?: string;
    experience?: string;
    benefits?: string[];
    applications?: string[];
    features?: string[];
  };
}

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  // Упрощенные категории - только основные
  const categories = [
    { id: 'all', name: 'Все', icon: Filter },
    { id: 'pvd-coatings', name: 'PVD покрытия', icon: Sparkles },
    { id: 'base-finishes', name: 'Базовые отделки', icon: Layers },
    { id: 'art-finishes', name: 'Художественные', icon: Brush }
  ];

  // Загрузка продуктов с API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch('http://localhost:8000/api/v1/products/');
        if (!response.ok) {
          throw new Error('Ошибка при загрузке продуктов');
        }
        
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Ошибка загрузки продуктов:', err);
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setProducts([]); // Пустой массив вместо моковых данных
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Состояния загрузки и ошибки
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-32">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Загрузка продукции...</p>
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
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">Ошибка загрузки: {error}</p>
              <Button onClick={() => window.location.reload()}>
                Попробовать снова
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Детальная страница продукта
  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-white pt-32">
        {/* Back Button */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setSelectedProduct(null)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Вернуться к каталогу</span>
            </button>
          </div>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                    <Palette className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h2>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                <div className="text-3xl font-bold text-blue-600 mb-4">{selectedProduct.price}</div>
                <div className="flex space-x-4">
                  <Button variant="primary" size="lg" fullWidth>
                    <Download className="w-5 h-5 mr-2" />
                    Скачать каталог
                  </Button>
                  <Button variant="outline" size="lg" fullWidth>
                    Запросить цену
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Technology */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-6 h-6 mr-2 text-blue-600" />
                  Технология
                </h3>
                <p className="text-gray-600 leading-relaxed">{selectedProduct.detailed.technology}</p>
              </div>

              {/* Benefits */}
              {selectedProduct.detailed.benefits && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="w-6 h-6 mr-2 text-blue-600" />
                    Преимущества
                  </h3>
                  <ul className="space-y-2">
                    {selectedProduct.detailed.benefits.map((benefit: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {selectedProduct.detailed.applications && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-blue-600" />
                    Применение
                  </h3>
                  <ul className="space-y-2">
                    {selectedProduct.detailed.applications.map((application: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{application}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Features */}
              {selectedProduct.detailed.features && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Star className="w-6 h-6 mr-2 text-blue-600" />
                    Особенности
                  </h3>
                  <ul className="space-y-2">
                    {selectedProduct.detailed.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Testing */}
              {selectedProduct.detailed.testing && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <TestTube className="w-6 h-6 mr-2 text-blue-600" />
                    Тестирование
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.detailed.testing}</p>
                </div>
              )}

              {/* Quality */}
              {selectedProduct.detailed.quality && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-blue-600" />
                    Качество
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.detailed.quality}</p>
                </div>
              )}

              {/* Experience */}
              {selectedProduct.detailed.experience && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-blue-600" />
                    Опыт применения
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.detailed.experience}</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-32">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Продукция InoxMetalArt
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Инновационные решения для отделки нержавеющей стали. 
              От базовых покрытий до эксклюзивных художественных отделок.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Упрощенные фильтры */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Поиск */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск продукции..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Категории - горизонтально */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="text-sm">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Product Image */}
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                    <Palette className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {categories.find(c => c.id === product.category)?.name || product.category}
                  </span>
                  <div className="text-2xl font-bold text-blue-600">{product.price}</div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Подробнее
                  </Button>
                  <Button variant="primary" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Каталог
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Продукты не найдены
              </h3>
              <p className="text-gray-600 mb-6">
                Попробуйте изменить параметры поиска или выберите другую категорию
              </p>
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                variant="outline"
              >
                Сбросить фильтры
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
