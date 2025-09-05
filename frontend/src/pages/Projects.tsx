import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Download, 
  Eye,
  Shield,
  Palette,
  Brush,
  ArrowLeft,
  Settings,
  Grid,
  List,
  MapPin,
  Calendar,
  Users
} from 'lucide-react';
import Button from '../components/ui/Button';

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

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Категории проектов
  const categories = [
    { id: 'all', name: 'Все проекты', icon: Grid },
    { id: 'exterior', name: 'Экстерьер', icon: Grid },
    { id: 'interior', name: 'Интерьер', icon: Palette },
    { id: 'elevators', name: 'Лифты', icon: Shield },
    { id: 'art', name: 'Арт-объекты', icon: Brush },
    { id: 'commercial', name: 'Коммерческие', icon: Grid }
  ];

  // Загружаем проекты с API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/v1/projects/');
        if (!response.ok) {
          throw new Error('Ошибка загрузки проектов');
        }
        const data = await response.json();
        setProjects(data.projects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setProjects([]); // Устанавливаем пустой массив в случае ошибки
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    return selectedCategory === 'all' || project.category.toLowerCase() === selectedCategory;
  });

  // Детальная страница проекта
  if (selectedProject) {
    return (
      <div className="min-h-screen bg-white pt-32">
        {/* Back Button */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setSelectedProject(null)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Вернуться к проектам</span>
            </button>
          </div>
        </div>

        {/* Project Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Project Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Main Image */}
              <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl relative overflow-hidden">
                {selectedProject.main_image_path ? (
                  <img
                    src={`http://localhost:8000/${selectedProject.main_image_path}`}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                )}

              </div>

              {/* Project Info */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-4 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">{selectedProject.location}</span>
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">{selectedProject.completion_date}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedProject.title}</h2>
                <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                <div className="flex space-x-4">
                  <Button variant="primary" size="lg" fullWidth>
                    <Download className="w-5 h-5 mr-2" />
                    Скачать кейс
                  </Button>
                  <Button variant="outline" size="lg" fullWidth>
                    Запросить консультацию
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Project Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Client and Specifications */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-blue-600" />
                  Клиент и спецификации
                </h3>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-gray-500">Клиент:</span>
                      <div className="text-gray-700 font-medium">{selectedProject.client}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Площадь:</span>
                      <div className="text-gray-700 font-medium">{selectedProject.area}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Категория:</span>
                      <div className="text-gray-700 font-medium">{selectedProject.category}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Статус:</span>
                      <div className="text-gray-700 font-medium">{selectedProject.status === 'active' ? 'Активен' : 'Неактивен'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Materials and Technologies */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-6 h-6 mr-2 text-blue-600" />
                  Материалы и технологии
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Особенности:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.features && selectedProject.features.length > 0 ? (
                        selectedProject.features.map((feature: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {feature}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">Особенности не указаны</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Технологии:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies && selectedProject.technologies.length > 0 ? (
                        selectedProject.technologies.map((tech: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">Технологии не указаны</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Images */}
              {selectedProject.gallery_images && selectedProject.gallery_images.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Brush className="w-6 h-6 mr-2 text-blue-600" />
                    Галерея проекта
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedProject.gallery_images.map((imagePath: string, idx: number) => (
                      <div key={idx} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={`http://localhost:8000/${imagePath}`}
                          alt={`${selectedProject.title} - изображение ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка проектов...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ошибка загрузки</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Попробовать снова
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32">
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
            Реализованные проекты
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto"
          >
            Успешные проекты с использованием декоративной нержавеющей стали InoxMetalArt
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-blue-200 max-w-3xl mx-auto mt-4"
          >
            От архитектурных фасадов до интерьерных решений - изучите наши лучшие работы
          </motion.p>
        </div>
      </section>

      {/* Categories Filter */}
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

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Project Image */}
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                    {project.main_image_path ? (
                      <img
                        src={`http://localhost:8000/${project.main_image_path}`}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {project.short_description || project.description}
                    </p>

                    {/* Project Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location || 'Местоположение не указано'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{project.completion_date || 'Дата не указана'}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{project.client || 'Клиент не указан'}</span>
                      </div>
                    </div>

                    {/* Key Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies && project.technologies.length > 0 ? (
                          project.technologies.slice(0, 3).map((tech: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {tech}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">Технологии не указаны</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        fullWidth
                        onClick={() => setSelectedProject(project)}
                      >
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
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Project Image */}
                    <div className="md:w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden rounded-l-2xl">
                      {project.main_image_path ? (
                        <img
                          src={`http://localhost:8000/${project.main_image_path}`}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {project.short_description || project.description}
                          </p>

                          {/* Project Details */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-sm">
                              <span className="text-gray-500">Локация:</span>
                              <div className="text-gray-700 font-medium">{project.location || 'Не указано'}</div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Дата:</span>
                              <div className="text-gray-700 font-medium">{project.completion_date || 'Не указано'}</div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Площадь:</span>
                              <div className="text-gray-700 font-medium">{project.area || 'Не указано'}</div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Категория:</span>
                              <div className="text-gray-700 font-medium">{project.category}</div>
                            </div>
                          </div>

                          {/* Technologies */}
                          <div className="mb-4">
                            <h4 className="text-gray-700 font-semibold mb-2">Технологии:</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies && project.technologies.length > 0 ? (
                                project.technologies.map((tech: string, idx: number) => (
                                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                    {tech}
                                  </span>
                                ))
                              ) : (
                                <span className="text-gray-400 text-sm">Технологии не указаны</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="md:ml-6 md:text-right">
                          <div className="flex flex-col space-y-2">
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Скачать кейс
                            </Button>
                            <Button 
                              variant="primary" 
                              size="sm"
                              onClick={() => setSelectedProject(project)}
                            >
                              Подробнее
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
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Проекты не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте выбрать другую категорию или свяжитесь с нами
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
              Хотите реализовать похожий проект?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Наши специалисты помогут адаптировать решения под ваши задачи. 
              Свяжитесь с нами для получения консультации и расчета стоимости.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Получить консультацию
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900">
                Запросить расчет
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Projects;

