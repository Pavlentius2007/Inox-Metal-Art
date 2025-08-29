import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import FileUpload from '../ui/FileUpload';

interface GalleryFormData {
  title: string;
  description: string;
  category: string;
  color: string;
  finish: string;
  features: string[];
  status: string;
  sort_order: string;
}

interface GalleryFormProps {
  initialData?: Partial<GalleryFormData>;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const GalleryForm: React.FC<GalleryFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
  isEditing = false
}) => {
  const [formData, setFormData] = useState<GalleryFormData>({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || 'PVD покрытия',
    color: initialData.color || '',
    finish: initialData.finish || '',
    features: initialData.features || [],
    status: initialData.status || 'active',
    sort_order: initialData.sort_order || '0'
  });

  const [newFeature, setNewFeature] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const categories = [
    'PVD покрытия',
    'Патинирование',
    'Травление узоров',
    'Рифленые узоры',
    'Брашировка',
    'Нанопокрытия'
  ];

  const handleInputChange = (field: keyof GalleryFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('description', formData.description);
    formDataObj.append('category', formData.category);
    formDataObj.append('color', formData.color);
    formDataObj.append('finish', formData.finish);
    formDataObj.append('features', JSON.stringify(formData.features));
    formDataObj.append('status', formData.status);
    formDataObj.append('sort_order', formData.sort_order);
    
    if (selectedFiles.length > 0) {
      formDataObj.append('image', selectedFiles[0]);
    }
    
    onSubmit(formDataObj);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl mx-auto">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Редактировать элемент галереи' : 'Добавить элемент галереи'}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Основная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Категория *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Описание
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Цвет и отделка */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Цвет
            </label>
            <input
              type="text"
              value={formData.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              placeholder="Например: Золотой, Бронзовый"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Отделка
            </label>
            <input
              type="text"
              value={formData.finish}
              onChange={(e) => handleInputChange('finish', e.target.value)}
              placeholder="Например: Зеркальный, Матовая"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Характеристики */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Характеристики
          </label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Добавить характеристику"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddFeature}
              >
                Добавить
              </Button>
            </div>
            
            {formData.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Статус и порядок */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Статус
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Активен</option>
              <option value="inactive">Неактивен</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Порядок сортировки
            </label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={(e) => handleInputChange('sort_order', e.target.value)}
              placeholder="0"
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Загрузка изображения */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Изображение
          </label>
          <FileUpload
            onFileSelect={(file) => setSelectedFiles([file])}
            accept="image/*"
            multiple={false}
          />
        </div>

        {/* Кнопки */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="primary"
          >
            {isEditing ? 'Сохранить' : 'Добавить'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GalleryForm;
