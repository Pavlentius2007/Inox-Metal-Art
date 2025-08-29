import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import Button from '../ui/Button';
import FileUpload from '../ui/FileUpload';

interface Product {
  id?: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  image_path?: string;
  status: 'active' | 'inactive';
}

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
  categories: string[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
  categories
}) => {
  const [formData, setFormData] = useState<Product>({
    name: '',
    category: '',
    description: '',
    features: [''],
    image_path: '',
    status: 'active'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        category: product.category,
        description: product.description,
        features: product.features.length > 0 ? product.features : [''],
        image_path: product.image_path || '',
        status: product.status
      });
    }
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Название обязательно';
    }

    if (!formData.category) {
      newErrors.category = 'Выберите категорию';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно';
    }

    // Проверяем, что все features не пустые
    const emptyFeatures = formData.features.filter(f => !f.trim());
    if (emptyFeatures.length > 0) {
      newErrors.features = 'Все характеристики должны быть заполнены';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Фильтруем пустые features
      const cleanFeatures = formData.features.filter(f => f.trim());
      
      await onSubmit({
        ...formData,
        features: cleanFeatures
      });
    } catch (error) {
      console.error('Ошибка при сохранении продукта:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Очищаем ошибку для поля при изменении
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index: number) => {
    if (formData.features.length > 1) {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }));
    }
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const handleFileSelect = (file: File) => {
    // В реальном приложении здесь будет загрузка файла на сервер
    console.log('Выбран файл:', file);
    // Пока что просто сохраняем имя файла
    handleInputChange('image_path', file.name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Название */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Название продукта *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.name ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Введите название продукта"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Категория */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Категория *
        </label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.category ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Выберите категорию</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category}</p>
        )}
      </div>

      {/* Описание */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Описание *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Опишите продукт..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      {/* Характеристики */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Характеристики *
        </label>
        <div className="space-y-2">
          {formData.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.features ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder={`Характеристика ${index + 1}`}
              />
              {formData.features.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFeature(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </motion.div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addFeature}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            Добавить характеристику
          </Button>
        </div>
        {errors.features && (
          <p className="mt-1 text-sm text-red-600">{errors.features}</p>
        )}
      </div>

      {/* Изображение */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Изображение продукта
        </label>
        <FileUpload
          onFileSelect={handleFileSelect}
          accept="image/*"
          maxSize={5}
          label="Загрузить изображение"
          placeholder="Перетащите изображение или нажмите для выбора"
        />
      </div>

      {/* Статус */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
          Статус
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="active">Активен</option>
          <option value="inactive">Неактивен</option>
        </select>
      </div>

      {/* Кнопки */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Отмена
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[120px]"
        >
          {isSubmitting ? 'Сохранение...' : (product ? 'Обновить' : 'Создать')}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;

