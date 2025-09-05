import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../ui/Button';
import FileUpload from '../ui/FileUpload';

interface ProjectFormData {
  title: string;
  description: string;
  short_description: string;
  category: string;
  client: string;
  location: string;
  area: string;
  completion_date: string;
  features: string[];
  technologies: string[];
  status: string;
  sort_order: string;
  is_featured: boolean;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
  loading?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
  isEditing = false,
  loading = false
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: initialData.title || '',
    description: initialData.description || '',
    short_description: initialData.short_description || '',
    category: initialData.category || 'Жилые',
    client: initialData.client || '',
    location: initialData.location || '',
    area: initialData.area || '',
    completion_date: initialData.completion_date || '',
    features: initialData.features || [],
    technologies: initialData.technologies || [],
    status: initialData.status || 'active',
    sort_order: initialData.sort_order || '0',
    is_featured: initialData.is_featured || false
  });

  const [newFeature, setNewFeature] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [mainImage, setMainImage] = useState<File[]>([]);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);

  const categories = [
    'Жилые',
    'Коммерческие',
    'Общественные',
    'Промышленные',
    'Ландшафтные',
    'Интерьеры'
  ];

  const handleInputChange = (field: keyof ProjectFormData, value: string | boolean) => {
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

  const handleAddTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const handleRemoveTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    
    console.log('🔧 ProjectForm: Submitting form...');
    console.log('📁 Main image files:', mainImage);
    console.log('🖼️ Gallery image files:', galleryImages);
    
    const formDataObj = new FormData();
    formDataObj.append('title', formData.title);
    formDataObj.append('description', formData.description);
    formDataObj.append('short_description', formData.short_description);
    formDataObj.append('category', formData.category);
    formDataObj.append('client', formData.client);
    formDataObj.append('location', formData.location);
    formDataObj.append('area', formData.area);
    formDataObj.append('completion_date', formData.completion_date);
    formDataObj.append('features', JSON.stringify(formData.features));
    formDataObj.append('technologies', JSON.stringify(formData.technologies));
    formDataObj.append('status', formData.status);
    formDataObj.append('sort_order', formData.sort_order);
    formDataObj.append('is_featured', formData.is_featured.toString());
    
    if (mainImage.length > 0) {
      console.log('📤 Adding main image:', mainImage[0].name);
      formDataObj.append('main_image', mainImage[0]);
    } else {
      console.log('❌ No main image to upload');
    }
    
    if (galleryImages.length > 0) {
      console.log('📤 Adding gallery images:', galleryImages.length);
      galleryImages.forEach((image, index) => {
        console.log(`  - Gallery image ${index}:`, image.name);
        formDataObj.append('gallery_images', image);
      });
    } else {
      console.log('❌ No gallery images to upload');
    }
    
    // Отладочный вывод FormData
    console.log('📋 FormData contents:');
    for (let [key, value] of formDataObj.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}: File(${value.name}, ${value.size} bytes)`);
      } else {
        console.log(`  ${key}: ${value}`);
      }
    }
    
    onSubmit(formDataObj);
  };

  return (
    <div className="space-y-6">
        {/* Основная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название проекта *
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

        {/* Описания */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Краткое описание
            </label>
            <textarea
              value={formData.short_description}
              onChange={(e) => handleInputChange('short_description', e.target.value)}
              rows={3}
              placeholder="Краткое описание для карточек"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Полное описание
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              placeholder="Подробное описание проекта"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Клиент и локация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Клиент
            </label>
            <input
              type="text"
              value={formData.client}
              onChange={(e) => handleInputChange('client', e.target.value)}
              placeholder="Название компании или ФИО"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Местоположение
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Город, адрес"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Площадь и дата */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Площадь проекта
            </label>
            <input
              type="text"
              value={formData.area}
              onChange={(e) => handleInputChange('area', e.target.value)}
              placeholder="Например: 150 м²"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дата завершения
            </label>
            <input
              type="text"
              value={formData.completion_date}
              onChange={(e) => handleInputChange('completion_date', e.target.value)}
              placeholder="Например: 2024 год"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Особенности проекта */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Особенности проекта
          </label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Добавить особенность"
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

        {/* Использованные технологии */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Использованные технологии
          </label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Добавить технологию"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddTechnology}
              >
                Добавить
              </Button>
            </div>
            
            {formData.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((technology, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {technology}
                    <button
                      type="button"
                      onClick={() => handleRemoveTechnology(index)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Статус и настройки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => handleInputChange('is_featured', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_featured" className="ml-2 text-sm font-medium text-gray-700">
              Выделенный проект
            </label>
          </div>
        </div>

        {/* Загрузка изображений */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Главное изображение
            </label>
            <FileUpload
              onFileSelect={(file) => setMainImage([file])}
              accept="image/*"
              multiple={false}
              maxFiles={1}
              maxSize={5}
              label="Загрузить главное изображение"
              placeholder="Перетащите изображение сюда или нажмите для выбора"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Изображения галереи
            </label>
            <FileUpload
              onFilesSelect={setGalleryImages}
              accept="image/*"
              multiple={true}
              maxFiles={10}
              maxSize={5}
              label="Загрузить изображения галереи"
              placeholder="Перетащите изображения сюда или нажмите для выбора"
            />
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Отмена
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            variant="primary"
            loading={loading}
            disabled={loading}
          >
            {isEditing ? 'Сохранить' : 'Добавить'}
          </Button>
        </div>
    </div>
  );
};

export default ProjectForm;




