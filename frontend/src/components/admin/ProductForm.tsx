import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { 
    Plus, 
    Trash2
} from 'lucide-react';

interface Product {
    id?: string;
    name: string;
    category: string;
    description: string;
    features: string[];
    image_path?: string;
    images?: string[];
    videos?: string[];
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
        images: [],
        videos: [],
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
                images: product.images || [],
                videos: product.videos || [],
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

    const handleFileSelect = async (file: File) => {
        try {
            // Создаем FormData для загрузки файла
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'product');

            // Загружаем файл на сервер
            const response = await fetch('http://localhost:8000/api/v1/products/upload-image', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Файл загружен:', result);
            
            // Сохраняем путь к загруженному файлу (используем url без префикса)
            const imagePath = result.url.replace('/uploads/products/', 'uploads/products/');
            handleInputChange('image_path', imagePath);
            console.log('Путь к изображению сохранен в форме:', imagePath);
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
            alert(`Ошибка при загрузке файла: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
        }
    };

    const handleMultipleFilesSelect = async (files: FileList, type: 'images' | 'videos') => {
        try {
            const formData = new FormData();
            Array.from(files).forEach(file => {
                formData.append('files', file);
            });

            const endpoint = type === 'images' 
                ? 'http://localhost:8000/api/v1/products/upload-multiple-images'
                : 'http://localhost:8000/api/v1/products/upload-multiple-videos';

            const response = await fetch(endpoint, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Файлы загружены:', result);
            
            // Обновляем соответствующий массив файлов
            const filePaths = result.uploaded_files.map((file: any) => 
                file.url.replace('/uploads/products/', 'uploads/products/')
            );
            
            const currentFiles = (formData as any)[type] || [];
            handleInputChange(type, [...currentFiles, ...filePaths]);
            console.log(`${type} обновлены:`, [...currentFiles, ...filePaths]);
        } catch (error) {
            console.error(`Ошибка при загрузке ${type}:`, error);
            alert(`Ошибка при загрузке файлов: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
        }
    };

    const removeFile = (index: number, type: 'images' | 'videos') => {
        const currentFiles = (formData as any)[type] || [];
        const updatedFiles = currentFiles.filter((_: any, i: number) => i !== index);
        handleInputChange(type, updatedFiles);
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

            {/* Основное изображение */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Основное изображение продукта
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            handleFileSelect(file);
                        }
                    }}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {formData.image_path && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">
                            Основное изображение:
                        </p>
                        <img
                            src={`http://localhost:8000/${formData.image_path}`}
                            alt="Предварительный просмотр"
                            className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                            onLoad={() => {
                                console.log('Предварительный просмотр загружен:', formData.image_path);
                            }}
                            onError={(e) => {
                                console.error('Ошибка загрузки изображения в форме:', {
                                    imagePath: formData.image_path,
                                    fullUrl: `http://localhost:8000/${formData.image_path}`
                                });
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Дополнительные изображения */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Дополнительные изображения
                </label>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                            handleMultipleFilesSelect(files, 'images');
                        }
                    }}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                />
                {formData.images && formData.images.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">
                            Дополнительные изображения:
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                            {formData.images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={`http://localhost:8000/${image}`}
                                        alt={`Дополнительное изображение ${index + 1}`}
                                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                                        onError={(e) => {
                                            console.error('Ошибка загрузки дополнительного изображения:', image);
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index, 'images')}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Видео */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Видео файлы
                </label>
                <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={(e) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                            handleMultipleFilesSelect(files, 'videos');
                        }
                    }}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                {formData.videos && formData.videos.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-2">
                            Видео файлы:
                        </p>
                        <div className="space-y-2">
                            {formData.videos.map((video, index) => (
                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                                    <span className="text-sm text-gray-700 truncate">
                                        {video.split('/').pop()}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index, 'videos')}
                                        className="text-red-500 hover:text-red-700 ml-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
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
                    {isSubmitting ? 'Сохранение...' : (product ? 'Сохранить' : 'Создать')}
                </Button>
            </div>
        </form>
    );
};

export default ProductForm;

