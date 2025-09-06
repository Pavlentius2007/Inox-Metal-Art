import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Package,
  Star,
  RefreshCw
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';
import ProductForm from '../../components/admin/ProductForm';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  image_path: string;
  images?: string[];
  videos?: string[];
  status: 'active' | 'inactive';
  created_at: string;
}

const ProductsManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const categories = [
    'Декоративные покрытия',
    'Защитные покрытия',
    'Антибактериальные покрытия',
    'Цветные покрытия',
    'Текстурированные покрытия'
  ];

  // Загрузка продуктов с API
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = async (productData: Partial<Product>) => {
    try {
      console.log('Сохранение продукта:', productData);
      
      if (editingProduct) {
        // Обновление существующего продукта
        console.log('Обновление продукта ID:', editingProduct.id);
        const response = await fetch(`http://localhost:8000/api/v1/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          throw new Error('Ошибка при обновлении продукта');
        }

        const updatedProduct = await response.json();
        console.log('Продукт обновлен:', updatedProduct);
        setProducts(prev => prev.map(p => 
          p.id === editingProduct.id ? updatedProduct : p
        ));
      } else {
        // Создание нового продукта
        console.log('Создание нового продукта');
        const response = await fetch('http://localhost:8000/api/v1/products/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });

        if (!response.ok) {
          throw new Error('Ошибка при создании продукта');
        }

        const newProduct = await response.json();
        console.log('Новый продукт создан:', newProduct);
        setProducts(prev => [...prev, newProduct]);
      }

      setShowAddModal(false);
      setEditingProduct(null);
    } catch (err) {
      console.error('Ошибка при сохранении продукта:', err);
      alert(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowAddModal(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот продукт?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/v1/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении продукта');
      }

      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Ошибка при удалении продукта:', err);
      alert(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  const toggleProductStatus = async (id: string) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const newStatus = product.status === 'active' ? 'inactive' : 'active';

    try {
      const response = await fetch(`http://localhost:8000/api/v1/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении статуса');
      }

      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, status: newStatus } : p
      ));
    } catch (err) {
      console.error('Ошибка при обновлении статуса:', err);
      alert(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Загрузка продуктов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Управление продукцией
          </h1>
          <p className="text-gray-600">
            Добавляйте, редактируйте и управляйте каталогом продукции
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={fetchProducts}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            Обновить
          </Button>
          
          <Button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            Добавить продукт
          </Button>
        </div>
      </div>

      {/* Ошибки */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск по названию или описанию..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Все категории</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <Card className="overflow-hidden h-full">
              {/* Product Image */}
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                {product.image_path ? (
                  <img
                    src={`http://localhost:8000/${product.image_path}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onLoad={() => {
                      console.log('Изображение продукта загружено успешно:', product.image_path);
                    }}
                    onError={(e) => {
                      console.error('Ошибка загрузки изображения продукта:', {
                        imagePath: product.image_path,
                        fullUrl: `http://localhost:8000/${product.image_path}`,
                        productId: product.id,
                        productName: product.name
                      });
                      e.currentTarget.style.display = 'none';
                      // Показываем fallback иконку при ошибке
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Fallback иконка когда нет изображения или ошибка загрузки */}
                <div className={`absolute inset-0 flex items-center justify-center ${product.image_path ? 'hidden' : 'flex'}`}>
                  <Package className="w-16 h-16 text-blue-600" />
                </div>
                
                {/* Status Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                  product.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.status === 'active' ? 'Активен' : 'Неактивен'}
                </div>

                {/* Media Count Badges */}
                <div className="absolute bottom-3 left-3 flex space-x-2">
                  {product.images && product.images.length > 0 && (
                    <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      +{product.images.length} фото
                    </div>
                  )}
                  {product.videos && product.videos.length > 0 && (
                    <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      +{product.videos.length} видео
                    </div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {product.name}
                  </h3>
                </div>
                
                <div className="mb-3">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {product.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {product.features.slice(0, 2).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {product.features.length > 2 && (
                    <div className="text-sm text-gray-500">
                      +{product.features.length - 2} еще...
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditProduct(product)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Редактировать
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleProductStatus(product.id)}
                    className={`${
                      product.status === 'active' 
                        ? 'text-orange-600 hover:text-orange-700' 
                        : 'text-green-600 hover:text-green-700'
                    }`}
                  >
                    {product.status === 'active' ? 'Деактивировать' : 'Активировать'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Продукты не найдены
          </h3>
          <p className="text-gray-600 mb-4">
            Попробуйте изменить параметры поиска или добавьте новый продукт
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Добавить первый продукт
          </Button>
        </Card>
      )}

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? 'Редактировать продукт' : 'Добавить новый продукт'}
        size="lg"
      >
        <ProductForm
          product={editingProduct}
          onSubmit={handleAddProduct}
          onCancel={() => {
            setShowAddModal(false);
            setEditingProduct(null);
          }}
          categories={categories}
        />
      </Modal>
    </div>
  );
};

export default ProductsManagement;

