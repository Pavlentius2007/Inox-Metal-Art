import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Tag, 
  Save, 
  X, 
  Plus,
  Trash2
} from 'lucide-react';
import Button from '../ui/Button';

interface Material {
  id?: number;
  name: string;
  description: string;
  category: string;
  file_type: string;
  file_size: string;
  file_path: string;
  download_url: string;
  tags: string[];
  is_active: boolean;
  sort_order: number;
  is_featured: boolean;
}

interface MaterialFormProps {
  material?: Material;
  onSubmit: (material: Material) => void;
  onCancel: () => void;
}

const MaterialForm: React.FC<MaterialFormProps> = ({ material, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Material>({
    name: '',
    description: '',
    category: 'catalogs',
    file_type: '',
    file_size: '',
    file_path: '',
    download_url: '',
    tags: [],
    is_active: true,
    sort_order: 0,
    is_featured: false
  });

  const [newTag, setNewTag] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const categories = [
    { id: 'catalogs', name: 'Каталоги продукции' },
    { id: 'specifications', name: 'Технические характеристики' },
    { id: 'certificates', name: 'Сертификаты качества' },
    { id: 'guides', name: 'Руководства по монтажу' },
    { id: 'brochures', name: 'Брошюры и презентации' },
    { id: 'standards', name: 'Стандарты и нормы' }
  ];

  useEffect(() => {
    if (material) {
      setFormData(material);
    }
  }, [material]);

  const handleInputChange = (field: keyof Material, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Автоматически определяем тип файла
      const fileType = file.name.split('.').pop()?.toUpperCase() || '';
      handleInputChange('file_type', fileType);
      
      // Форматируем размер файла
      const fileSize = formatFileSize(file.size);
      handleInputChange('file_size', fileSize);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile && !material) {
      alert('Пожалуйста, выберите файл');
      return;
    }

    setUploading(true);

    try {
      let filePath = formData.file_path;
      
      // Если выбран новый файл, загружаем его
      if (selectedFile) {
        const formDataFile = new FormData();
        formDataFile.append('file', selectedFile);
        
        const uploadResponse = await fetch('http://localhost:8000/api/v1/materials/upload-file', {
          method: 'POST',
          body: formDataFile
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Ошибка загрузки файла');
        }
        
        const uploadResult = await uploadResponse.json();
        filePath = uploadResult.file_path;
      }

      // Подготавливаем данные для отправки
      const submitData = {
        ...formData,
        file_path: filePath,
        tags: JSON.stringify(formData.tags)
      };

      if (material) {
        // Обновление существующего материала
        const response = await fetch(`http://localhost:8000/api/v1/materials/${material.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submitData)
        });
        
        if (!response.ok) {
          throw new Error('Ошибка обновления материала');
        }
      } else {
        // Создание нового материала
        const formDataSubmit = new FormData();
        formDataSubmit.append('name', submitData.name);
        formDataSubmit.append('description', submitData.description);
        formDataSubmit.append('category', submitData.category);
        formDataSubmit.append('tags', submitData.tags);
        formDataSubmit.append('sort_order', submitData.sort_order.toString());
        formDataSubmit.append('is_featured', submitData.is_featured.toString());
        
        if (selectedFile) {
          formDataSubmit.append('file', selectedFile);
        }
        
        const response = await fetch('http://localhost:8000/api/v1/materials/', {
          method: 'POST',
          body: formDataSubmit
        });
        
        if (!response.ok) {
          throw new Error('Ошибка создания материала');
        }
      }

      onSubmit(formData);
      setUploading(false);
    } catch (error) {
      console.error('Error:', error);
      alert(`Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
      setUploading(false);
    }
  };

  const validateForm = (): boolean => {
    return !!(
      formData.name.trim() &&
      formData.category &&
      (selectedFile || material)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {material ? 'Редактировать материал' : 'Добавить материал'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Основная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
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
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Описание */}
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

        {/* Файл */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Файл {!material && '*'}
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {selectedFile ? (
              <div className="space-y-2">
                <FileText className="w-12 h-12 text-blue-500 mx-auto" />
                <p className="text-sm text-gray-600">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  <Trash2 className="w-4 h-4 inline mr-1" />
                  Убрать файл
                </button>
              </div>
            ) : material ? (
              <div className="space-y-2">
                <FileText className="w-12 h-12 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600">Файл уже загружен</p>
                <p className="text-xs text-gray-500">{material.file_path}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <p className="text-sm text-gray-600">
                  Нажмите для выбора файла или перетащите сюда
                </p>
                <p className="text-xs text-gray-500">
                  Поддерживаемые форматы: PDF, DOC, XLS, JPG, PNG, ZIP
                </p>
              </div>
            )}
            <input
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar"
            />
            <label
              htmlFor="file-upload"
              className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 cursor-pointer"
            >
              <Upload className="w-4 h-4 mr-2" />
              Выбрать файл
            </label>
          </div>
        </div>

        {/* Теги */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Теги
          </label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Добавить тег"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button
                type="button"
                onClick={addTag}
                variant="outline"
                size="sm"
                disabled={!newTag.trim()}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Дополнительные настройки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Порядок сортировки
            </label>
            <input
              type="number"
              value={formData.sort_order}
              onChange={(e) => handleInputChange('sort_order', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => handleInputChange('is_active', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
              Активен
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => handleInputChange('is_featured', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
              Рекомендуемый
            </label>
          </div>
        </div>

        {/* Кнопки */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={uploading}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={!validateForm() || uploading}
            className="min-w-[120px]"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Сохранение...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {material ? 'Обновить' : 'Создать'}
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default MaterialForm;



