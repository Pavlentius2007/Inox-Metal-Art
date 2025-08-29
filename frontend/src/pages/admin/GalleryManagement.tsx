import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, RefreshCw } from 'lucide-react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import GalleryForm from '../../components/admin/GalleryForm';

interface Gallery {
  id: number;
  title: string;
  description: string;
  category: string;
  color: string;
  finish: string;
  features: string[];
  image_path: string | null;
  status: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const GalleryManagement: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [categories, setCategories] = useState<string[]>([]);

  // Загружаем галерею
  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/v1/gallery/');
      if (!response.ok) {
        throw new Error('Ошибка загрузки галереи');
      }
      const data = await response.json();
      setGalleries(data.galleries);
      
      // Получаем уникальные категории
      const uniqueCategories = [...new Set(data.galleries.map((g: Gallery) => g.category))];
      setCategories(uniqueCategories as string[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  // Загружаем категории
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/gallery/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.map((cat: any) => cat.name as string));
      }
    } catch (err) {
      console.error('Ошибка загрузки категорий:', err);
    }
  };

  useEffect(() => {
    fetchGalleries();
    fetchCategories();
  }, []);

  // Фильтрация галереи
  const filteredGalleries = galleries.filter(gallery => {
    const matchesSearch = gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gallery.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Все категории' || gallery.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Добавление нового элемента
  const handleAddGallery = async (formData: FormData) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/gallery/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка создания элемента галереи');
      }

      await fetchGalleries();
      setShowModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  // Редактирование элемента
  const handleEditGallery = async (formData: FormData) => {
    if (!editingGallery) return;

    try {
      const response = await fetch(`http://localhost:8000/api/v1/gallery/${editingGallery.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw new Error('Ошибка обновления элемента галереи');
      }

      await fetchGalleries();
      setShowModal(false);
      setEditingGallery(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  // Удаление элемента
  const handleDeleteGallery = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот элемент галереи?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/v1/gallery/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления элемента галереи');
      }

      await fetchGalleries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  // Переключение статуса
  const toggleGalleryStatus = async (gallery: Gallery) => {
    const newStatus = gallery.status === 'active' ? 'inactive' : 'active';
    
    try {
      const response = await fetch(`http://localhost:8000/api/v1/gallery/${gallery.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Ошибка обновления статуса');
      }

      await fetchGalleries();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  // Открытие модального окна для редактирования
  const openEditModal = (gallery: Gallery) => {
    setEditingGallery(gallery);
    setShowModal(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setShowModal(false);
    setEditingGallery(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Загрузка галереи...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Управление галереей</h1>
          <p className="text-gray-600">Добавляйте, редактируйте и управляйте образцами галереи</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchGalleries}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Обновить
          </Button>
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить образец
          </Button>
        </div>
      </div>

      {/* Ошибки */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {/* Поиск и фильтры */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="sm:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Все категории</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Список галереи */}
      {filteredGalleries.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Образцы не найдены
          </h3>
          <p className="text-gray-600 mb-4">
            Попробуйте изменить параметры поиска или добавьте новый образец
          </p>
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить первый образец
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGalleries.map((gallery) => (
            <div key={gallery.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Изображение */}
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                {gallery.image_path ? (
                  <img
                    src={`http://localhost:8000/${gallery.image_path}`}
                    alt={gallery.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <Eye className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Контент */}
              <div className="p-4">
                {/* Заголовок и статус */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{gallery.title}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      gallery.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {gallery.status === 'active' ? 'Активен' : 'Неактивен'}
                  </span>
                </div>

                {/* Категория */}
                <div className="mb-2">
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {gallery.category}
                  </span>
                </div>

                {/* Описание */}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {gallery.description}
                </p>

                {/* Детали */}
                <div className="space-y-1 mb-3 text-sm text-gray-600">
                  {gallery.color && (
                    <div><span className="font-medium">Цвет:</span> {gallery.color}</div>
                  )}
                  {gallery.finish && (
                    <div><span className="font-medium">Отделка:</span> {gallery.finish}</div>
                  )}
                </div>

                {/* Характеристики */}
                {gallery.features && gallery.features.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Характеристики:</div>
                    <div className="flex flex-wrap gap-1">
                      {gallery.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {gallery.features.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          +{gallery.features.length - 3} еще
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Действия */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditModal(gallery)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Редактировать
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleGalleryStatus(gallery)}
                    className="flex-1"
                  >
                    {gallery.status === 'active' ? 'Деактивировать' : 'Активировать'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteGallery(gallery.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Модальное окно */}
      <Modal isOpen={showModal} onClose={closeModal}>
        <GalleryForm
          initialData={editingGallery ? {
            title: editingGallery.title,
            description: editingGallery.description,
            category: editingGallery.category,
            color: editingGallery.color,
            finish: editingGallery.finish,
            features: editingGallery.features,
            status: editingGallery.status,
            sort_order: editingGallery.sort_order.toString()
          } : {}}
          onSubmit={editingGallery ? handleEditGallery : handleAddGallery}
          onCancel={closeModal}
          isEditing={!!editingGallery}
        />
      </Modal>
    </div>
  );
};

export default GalleryManagement;
