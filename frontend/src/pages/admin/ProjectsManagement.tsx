import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, RefreshCw, Star, Building, MapPin, Calendar, Ruler } from 'lucide-react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ProjectForm from '../../components/admin/ProjectForm';

interface Project {
  id: number;
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
  main_image_path: string | null;
  gallery_images: string[];
  status: string;
  sort_order: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

const ProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все категории');
  const [selectedStatus, setSelectedStatus] = useState('Все статусы');
  const [categories, setCategories] = useState<string[]>([]);

  // Загружаем проекты
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/v1/projects/');
      if (!response.ok) {
        throw new Error('Ошибка загрузки проектов');
      }
      const data = await response.json();
      setProjects(data.projects);
      
      // Получаем уникальные категории
      const uniqueCategories = [...new Set(data.projects.map((p: Project) => p.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  // Загружаем категории
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/projects/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.map((cat: any) => cat.name as string));
      }
    } catch (err) {
      console.error('Ошибка загрузки категорий:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchCategories();
  }, []);

  // Фильтрация проектов
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Все категории' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Все статусы' || project.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Добавление нового проекта
  const handleAddProject = async (formData: FormData) => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/projects/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка создания проекта');
      }

      await fetchProjects();
      setShowModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  // Редактирование проекта
  const handleEditProject = async (formData: FormData) => {
    if (!editingProject) return;

    try {
      const response = await fetch(`http://localhost:8000/api/v1/projects/${editingProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (!response.ok) {
        throw new Error('Ошибка обновления проекта');
      }

      await fetchProjects();
      setShowModal(false);
      setEditingProject(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  // Удаление проекта
  const handleDeleteProject = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот проект?')) return;

    try {
      const response = await fetch(`http://localhost:8000/api/v1/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Ошибка удаления проекта');
      }

      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  // Переключение статуса
  const toggleProjectStatus = async (project: Project) => {
    const newStatus = project.status === 'active' ? 'inactive' : 'active';
    
    try {
      const response = await fetch(`http://localhost:8000/api/v1/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Ошибка обновления статуса');
      }

      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  // Переключение выделенного статуса
  const toggleFeaturedStatus = async (project: Project) => {
    const newFeatured = !project.is_featured;
    
    try {
      const response = await fetch(`http://localhost:8000/api/v1/projects/${project.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_featured: newFeatured }),
      });

      if (!response.ok) {
        throw new Error('Ошибка обновления статуса');
      }

      await fetchProjects();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    }
  };

  // Открытие модального окна для редактирования
  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Загрузка проектов...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Управление проектами</h1>
          <p className="text-gray-600">Добавляйте, редактируйте и управляйте реализованными проектами</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchProjects}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Обновить
          </Button>
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить проект
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
            placeholder="Поиск по названию, описанию или клиенту..."
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
        <div className="sm:w-48">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Все статусы</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
          </select>
        </div>
      </div>

      {/* Список проектов */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Проекты не найдены
          </h3>
          <p className="text-gray-600 mb-4">
            Попробуйте изменить параметры поиска или добавьте новый проект
          </p>
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить первый проект
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Изображение */}
              <div className="aspect-video bg-gray-100 flex items-center justify-center relative">
                {project.main_image_path ? (
                  <img
                    src={`http://localhost:8000/${project.main_image_path}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <Building className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                
                {/* Статусы */}
                <div className="absolute top-2 right-2 flex gap-1">
                  {project.is_featured && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Выделен
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {project.status === 'active' ? 'Активен' : 'Неактивен'}
                  </span>
                </div>
              </div>

              {/* Контент */}
              <div className="p-4">
                {/* Заголовок и категория */}
                <div className="mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{project.title}</h3>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {project.category}
                  </span>
                </div>

                {/* Краткое описание */}
                {project.short_description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {project.short_description}
                  </p>
                )}

                {/* Детали проекта */}
                <div className="space-y-1 mb-3 text-sm text-gray-600">
                  {project.client && (
                    <div className="flex items-center gap-1">
                      <Building className="w-3 h-3" />
                      <span className="font-medium">Клиент:</span> {project.client}
                    </div>
                  )}
                  {project.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="font-medium">Местоположение:</span> {project.location}
                    </div>
                  )}
                  {project.area && (
                    <div className="flex items-center gap-1">
                      <Ruler className="w-3 h-3" />
                      <span className="font-medium">Площадь:</span> {project.area}
                    </div>
                  )}
                  {project.completion_date && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span className="font-medium">Завершен:</span> {project.completion_date}
                    </div>
                  )}
                </div>

                {/* Особенности */}
                {project.features && project.features.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Особенности:</div>
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 2 && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          +{project.features.length - 2} еще
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Технологии */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Технологии:</div>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 2).map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          +{project.technologies.length - 2} еще
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
                    onClick={() => openEditModal(project)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Редактировать
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleProjectStatus(project)}
                    className="flex-1"
                  >
                    {project.status === 'active' ? 'Деактивировать' : 'Активировать'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFeaturedStatus(project)}
                    className={project.is_featured ? 'text-yellow-600 hover:text-yellow-700' : ''}
                  >
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProject(project.id)}
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
        <ProjectForm
          initialData={editingProject ? {
            title: editingProject.title,
            description: editingProject.description,
            short_description: editingProject.short_description,
            category: editingProject.category,
            client: editingProject.client,
            location: editingProject.location,
            area: editingProject.area,
            completion_date: editingProject.completion_date,
            features: editingProject.features,
            technologies: editingProject.technologies,
            status: editingProject.status,
            sort_order: editingProject.sort_order.toString(),
            is_featured: editingProject.is_featured
          } : {}}
          onSubmit={editingProject ? handleEditProject : handleAddProject}
          onCancel={closeModal}
          isEditing={!!editingProject}
        />
      </Modal>
    </div>
  );
};

export default ProjectsManagement;




