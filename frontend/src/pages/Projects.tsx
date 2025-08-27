import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Download, 
  Eye,
  Shield,
  Palette,
  Brush,
  ArrowLeft,
  Award,
  Settings,
  Grid,
  List,
  Building,
  MapPin,
  Calendar,
  Users,
  Target,
  CheckCircle
} from 'lucide-react';
import Button from '../components/ui/Button';

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Категории проектов
  const categories = [
    { id: 'all', name: 'Все проекты', icon: Grid },
    { id: 'architecture', name: 'Архитектура', icon: Building },
    { id: 'interior', name: 'Интерьеры', icon: Palette },
    { id: 'elevators', name: 'Лифты', icon: Shield },
    { id: 'art', name: 'Арт-объекты', icon: Brush },
    { id: 'commercial', name: 'Коммерческие', icon: Building }
  ];

  // Реализованные проекты
  const projects = [
    {
      id: 1,
      name: 'Театральная лаборатория в Гиссене',
      category: 'architecture',
      location: 'Гиссен, Германия',
      year: '2023',
      client: 'Институт прикладных театральных исследований',
      description: 'Фасад здания в стиле "театральный занавес" с использованием суперзеркальной нержавеющей стали No8 с покрытием PVD/TiN золото',
      materials: [
        'Суперзеркальная нержавеющая сталь No8',
        'PVD покрытие TiN золото',
        'Специальная обработка поверхности'
      ],
      technologies: ['PVD покрытие', 'Зеркальная полировка', 'Архитектурная отделка'],
      challenges: [
        'Создание эффекта театрального занавеса',
        'Сохранение зеркального блеска в условиях улицы',
        'Сложная геометрия фасада'
      ],
      solutions: [
        'Применение суперзеркальной стали No8',
        'Золотое PVD покрытие для премиального вида',
        'Специальная защита от атмосферных воздействий'
      ],
      results: [
        'Уникальный фасад с театральной эстетикой',
        'Высокая отражающая способность',
        'Долговечность покрытия'
      ],
      images: [
        '/images/projects/theater-lab-1.jpg',
        '/images/projects/theater-lab-2.jpg',
        '/images/projects/theater-lab-3.jpg'
      ],
      specifications: {
        area: '850 м²',
        duration: '8 месяцев',
        steel_grade: 'AISI 316L',
        finish: 'No8 + PVD золото'
      },
      awards: ['Премия за инновационную архитектуру', 'Лучший фасад года']
    },
    {
      id: 2,
      name: 'Спортивный кампус "Zuiderpark"',
      category: 'architecture',
      location: 'Гаага, Нидерланды',
      year: '2022',
      client: 'Городской совет Гааги',
      description: 'Облицовка фасада спортивного комплекса с использованием зеркальной нержавеющей стали N7 с покрытием "красный-золото" INOX-SPECTRAL®',
      materials: [
        'Зеркальная нержавеющая сталь N7',
        'INOX-SPECTRAL® красный-золото',
        'Защитные покрытия'
      ],
      technologies: ['INOX-SPECTRAL®', 'Зеркальная полировка', 'Цветные покрытия'],
      challenges: [
        'Создание яркого спортивного образа',
        'Устойчивость к погодным условиям',
        'Большие площади облицовки'
      ],
      solutions: [
        'Применение INOX-SPECTRAL® покрытия',
        'Комбинация красного и золотого цветов',
        'Специальная защита от коррозии'
      ],
      results: [
        'Яркий и запоминающийся фасад',
        'Высокая устойчивость к износу',
        'Современный спортивный дизайн'
      ],
      images: [
        '/images/projects/zuiderpark-1.jpg',
        '/images/projects/zuiderpark-2.jpg',
        '/images/projects/zuiderpark-3.jpg'
      ],
      specifications: {
        area: '1200 м²',
        duration: '12 месяцев',
        steel_grade: 'AISI 304',
        finish: 'N7 + INOX-SPECTRAL®'
      },
      awards: ['Лучший спортивный объект года']
    },
    {
      id: 3,
      name: 'Форум Edifico в Барселоне',
      category: 'architecture',
      location: 'Барселона, Испания',
      year: '2021',
      client: 'Edifico Group',
      description: 'Внешняя отделка современного офисного здания с использованием суперзеркальной нержавеющей стали N8 INOX-FORM В в золотом и кобальтово-синем цветах',
      materials: [
        'Суперзеркальная нержавеющая сталь N8',
        'INOX-FORM В золото',
        'INOX-FORM В кобальтово-синий'
      ],
      technologies: ['INOX-FORM В', 'Суперзеркальная полировка', 'Цветные покрытия'],
      challenges: [
        'Создание контрастного дизайна',
        'Сохранение зеркального эффекта',
        'Интеграция с архитектурой'
      ],
      solutions: [
        'Комбинация золотого и синего цветов',
        'Применение суперзеркальной стали N8',
        'Точная подгонка элементов'
      ],
      results: [
        'Элегантный контрастный фасад',
        'Высокое качество отделки',
        'Современный корпоративный образ'
      ],
      images: [
        '/images/projects/edifico-1.jpg',
        '/images/projects/edifico-2.jpg',
        '/images/projects/edifico-3.jpg'
      ],
      specifications: {
        area: '950 м²',
        duration: '10 месяцев',
        steel_grade: 'AISI 316L',
        finish: 'N8 + INOX-FORM В'
      },
      awards: ['Премия за корпоративную архитектуру']
    },
    {
      id: 4,
      name: 'Лифты премиум-отеля "Royal Palace"',
      category: 'elevators',
      location: 'Москва, Россия',
      year: '2023',
      client: 'Royal Palace Hotel Group',
      description: 'Отделка лифтов премиум-отеля с использованием зеркальной нержавеющей стали N8 с PVD покрытием золото и антибактериальным нанопокрытием NAS™',
      materials: [
        'Зеркальная нержавеющая сталь N8',
        'PVD покрытие золото',
        'Нанопокрытие NAS™'
      ],
      technologies: ['PVD покрытие', 'Зеркальная полировка', 'NAS™ нанопокрытие'],
      challenges: [
        'Создание премиального вида',
        'Защита от бактерий',
        'Сохранение блеска'
      ],
      solutions: [
        'Зеркальная сталь N8 с золотым PVD',
        'Антибактериальное покрытие NAS™',
        'Специальная защита от царапин'
      ],
      results: [
        'Роскошный внешний вид',
        'Антибактериальная защита',
        'Долговечность отделки'
      ],
      images: [
        '/images/projects/royal-palace-1.jpg',
        '/images/projects/royal-palace-2.jpg',
        '/images/projects/royal-palace-3.jpg'
      ],
      specifications: {
        area: '180 м²',
        duration: '6 месяцев',
        steel_grade: 'AISI 316L',
        finish: 'N8 + PVD золото + NAS™'
      },
      awards: ['Лучший отель года', 'Премия за дизайн интерьеров']
    },
    {
      id: 5,
      name: 'Декоративные панели торгового центра "Metropolis"',
      category: 'interior',
      location: 'Санкт-Петербург, Россия',
      year: '2022',
      client: 'Metropolis Mall',
      description: 'Декоративные панели с травлеными узорами и рифлеными текстурами для интерьера торгового центра',
      materials: [
        'Нержавеющая сталь AISI 304',
        'Травленые узоры',
        'Рифленые текстуры'
      ],
      technologies: ['Химическое травление', 'Механическое тиснение', 'Патинирование'],
      challenges: [
        'Создание уникальных узоров',
        'Интеграция с дизайном',
        'Долговечность отделки'
      ],
      solutions: [
        '130+ готовых шаблонов узоров',
        'Комбинация травления и тиснения',
        'Защитные покрытия'
      ],
      results: [
        'Уникальные декоративные элементы',
        'Высокая эстетичность',
        'Прочность и долговечность'
      ],
      images: [
        '/images/projects/metropolis-1.jpg',
        '/images/projects/metropolis-2.jpg',
        '/images/projects/metropolis-3.jpg'
      ],
      specifications: {
        area: '450 м²',
        duration: '4 месяца',
        steel_grade: 'AISI 304',
        finish: 'Травление + тиснение'
      },
      awards: ['Лучший торговый центр года']
    },
    {
      id: 6,
      name: 'Художественная инсталляция "Металлический сад"',
      category: 'art',
      location: 'Екатеринбург, Россия',
      year: '2023',
      client: 'Екатеринбургский музей изобразительных искусств',
      description: 'Художественная инсталляция с использованием патинированной нержавеющей стали и художественной брашировки',
      materials: [
        'Патинированная нержавеющая сталь',
        'Art Brush текстуры',
        'Комбинированные отделки'
      ],
      technologies: ['Патинирование', 'Art Brush', 'Комбинированные техники'],
      challenges: [
        'Создание художественного образа',
        'Уникальность каждой детали',
        'Интеграция с музейным пространством'
      ],
      solutions: [
        'Индивидуальное патинирование',
        'Художественная брашировка',
        'Комбинация различных техник'
      ],
      results: [
        'Уникальная художественная инсталляция',
        'Высокая эстетическая ценность',
        'Интеграция с музейным пространством'
      ],
      images: [
        '/images/projects/metal-garden-1.jpg',
        '/images/projects/metal-garden-2.jpg',
        '/images/projects/metal-garden-3.jpg'
      ],
      specifications: {
        area: '120 м²',
        duration: '3 месяца',
        steel_grade: 'AISI 316L',
        finish: 'Патинирование + Art Brush'
      },
      awards: ['Лучшая художественная инсталляция года']
    },
    {
      id: 7,
      name: 'Фасад бизнес-центра "Sky Tower"',
      category: 'commercial',
      location: 'Новосибирск, Россия',
      year: '2022',
      client: 'Sky Development',
      description: 'Современный фасад бизнес-центра с использованием нанопокрытий NSR™ и NAS™ для защиты от царапин и бактерий',
      materials: [
        'Нержавеющая сталь AISI 316L',
        'Нанопокрытие NSR™',
        'Нанопокрытие NAS™'
      ],
      technologies: ['NSR™ нанопокрытие', 'NAS™ нанопокрытие', 'Сатинирование'],
      challenges: [
        'Защита от царапин',
        'Антибактериальные свойства',
        'Современный дизайн'
      ],
      solutions: [
        'NSR™ для защиты от царапин',
        'NAS™ для антибактериальных свойств',
        'Сатинированная отделка'
      ],
      results: [
        'Высокая защита от повреждений',
        'Антибактериальная поверхность',
        'Современный внешний вид'
      ],
      images: [
        '/images/projects/sky-tower-1.jpg',
        '/images/projects/sky-tower-2.jpg',
        '/images/projects/sky-tower-3.jpg'
      ],
      specifications: {
        area: '2100 м²',
        duration: '14 месяцев',
        steel_grade: 'AISI 316L',
        finish: 'Сатинирование + NSR™ + NAS™'
      },
      awards: ['Лучший бизнес-центр года', 'Премия за инновационные решения']
    },
    {
      id: 8,
      name: 'Интерьер ресторана "Golden Plate"',
      category: 'interior',
      location: 'Казань, Россия',
      year: '2023',
      client: 'Golden Plate Restaurant',
      description: 'Интерьерная отделка ресторана с использованием зеркальной нержавеющей стали N8 и PVD покрытий в золотых тонах',
      materials: [
        'Зеркальная нержавеющая сталь N8',
        'PVD покрытие золото',
        'Декоративные элементы'
      ],
      technologies: ['PVD покрытие', 'Зеркальная полировка', 'Декоративная отделка'],
      challenges: [
        'Создание роскошной атмосферы',
        'Сохранение блеска',
        'Интеграция с дизайном'
      ],
      solutions: [
        'Зеркальная сталь N8',
        'Золотое PVD покрытие',
        'Декоративные панели'
      ],
      results: [
        'Роскошная атмосфера ресторана',
        'Высокое качество отделки',
        'Долговечность покрытий'
      ],
      images: [
        '/images/projects/golden-plate-1.jpg',
        '/images/projects/golden-plate-2.jpg',
        '/images/projects/golden-plate-3.jpg'
      ],
      specifications: {
        area: '320 м²',
        duration: '5 месяцев',
        steel_grade: 'AISI 316L',
        finish: 'N8 + PVD золото'
      },
      awards: ['Лучший ресторан года', 'Премия за дизайн интерьеров']
    }
  ];

  const filteredProjects = projects.filter(project => {
    return selectedCategory === 'all' || project.category === selectedCategory;
  });

  // Детальная страница проекта
  if (selectedProject) {
    return (
      <div className="min-h-screen bg-white">
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
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                    <Building className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center space-x-4 mb-4">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">{selectedProject.location}</span>
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">{selectedProject.year}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedProject.name}</h2>
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
                      <div className="text-gray-700 font-medium">{selectedProject.specifications.area}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Длительность:</span>
                      <div className="text-gray-700 font-medium">{selectedProject.specifications.duration}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Марка стали:</span>
                      <div className="text-gray-700 font-medium">{selectedProject.specifications.steel_grade}</div>
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
                    <h4 className="font-semibold text-gray-700 mb-2">Материалы:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.materials.map((material: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Технологии:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenges and Solutions */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-blue-600" />
                  Задачи и решения
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Задачи:</h4>
                    <ul className="space-y-2">
                      {selectedProject.challenges.map((challenge: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Решения:</h4>
                    <ul className="space-y-2">
                      {selectedProject.solutions.map((solution: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Results and Awards */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Award className="w-6 h-6 mr-2 text-blue-600" />
                  Результаты и награды
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Результаты:</h4>
                    <ul className="space-y-2">
                      {selectedProject.results.map((result: string, idx: number) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600 text-sm">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {selectedProject.awards.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Награды:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.awards.map((award: string, idx: number) => (
                          <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                            {award}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
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
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                        <Building className="w-10 h-10 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {project.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {project.description}
                    </p>

                    {/* Project Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{project.year}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{project.client}</span>
                      </div>
                    </div>

                    {/* Key Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center">
                      <Button variant="outline" size="sm" fullWidth>
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
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                          <Building className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                            {project.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {project.description}
                          </p>

                          {/* Project Details */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-sm">
                              <span className="text-gray-500">Локация:</span>
                              <div className="text-gray-700 font-medium">{project.location}</div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Год:</span>
                              <div className="text-gray-700 font-medium">{project.year}</div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Площадь:</span>
                              <div className="text-gray-700 font-medium">{project.specifications.area}</div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Длительность:</span>
                              <div className="text-gray-700 font-medium">{project.specifications.duration}</div>
                            </div>
                          </div>

                          {/* Technologies */}
                          <div className="mb-4">
                            <h4 className="text-gray-700 font-semibold mb-2">Технологии:</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech: string, idx: number) => (
                                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                                  {tech}
                                </span>
                              ))}
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
                            <Button variant="primary" size="sm">
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

