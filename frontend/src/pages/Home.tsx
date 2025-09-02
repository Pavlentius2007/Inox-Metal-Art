import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Shield, 
  Award,
  Users,
  ChevronRight,
  Download,
  Globe,
  Factory,
  Palette
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useApplicationModal } from '../App';
import '../styles/home.css';

const Home: React.FC = () => {
  // Состояние для модального окна заявки
  const { isApplicationModalOpen, setIsApplicationModalOpen } = useApplicationModal();
  
  // Функция для открытия модального окна
  const openApplicationModal = () => {
    setIsApplicationModalOpen(true);
  };

  // Проверка поддержки видео
  useEffect(() => {
    const video = document.createElement('video');
    const canPlayMP4 = video.canPlayType('video/mp4');
    
    if (canPlayMP4 === 'probably' || canPlayMP4 === 'maybe') {
      document.querySelector('.home-hero')?.classList.add('video-supported');
    } else {
      document.querySelector('.home-hero')?.classList.remove('video-supported');
    }
  }, []);

  // Функция скачивания каталога
  const handleDownloadCatalog = async () => {
    try {
      // Показываем индикатор загрузки
      const button = document.querySelector('[data-catalog-download]');
      if (button) {
        button.innerHTML = '<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>Скачивание...';
        button.setAttribute('disabled', 'true');
      }

      // Скачиваем каталог
      const response = await fetch('http://localhost:8000/uploads/materials/ИноксМеталАрт - Декоративная Нержавейка.pdf');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ИноксМеталАрт - Декоративная Нержавейка.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Показываем уведомление об успехе
        if (button) {
          button.innerHTML = '<CheckCircle className="w-5 h-5 mr-2" />Скачано!';
          setTimeout(() => {
            if (button) {
              button.innerHTML = '<Download className="w-5 h-5 mr-2" />Скачать каталог';
              button.removeAttribute('disabled');
            }
          }, 2000);
        }
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Ошибка скачивания каталога:', error);
      alert('Ошибка при скачивании каталога');
      
      // Восстанавливаем кнопку
      const button = document.querySelector('[data-catalog-download]');
      if (button) {
        button.innerHTML = '<Download className="w-5 h-5 mr-2" />Скачать каталог';
        button.removeAttribute('disabled');
      }
    }
  };

  // Реальные преимущества из оригинального сайта InoxMetalArt
  const features = [
    {
      icon: Shield,
      title: 'Качество',
      description: 'Сочетание японских технологий, сырья Nisshin и низких производственных издержек в Таиланде для выпуска продукции высочайшего качества'
    },
    {
      icon: Award,
      title: 'Надежность',
      description: '30+ лет опыта участия в крупных международных проектах с самыми высокими требованиями. Зарекомендовали себя как надежного поставщика'
    },
    {
      icon: Users,
      title: 'Сервис',
      description: 'Помогаем дизайнерам подбирать наиболее подходящие и доступные отделки для конкретного применения. Внимательный подход к каждому клиенту'
    },
    {
      icon: Factory,
      title: 'Логистика',
      description: 'Организовали логистику для быстрой поставки небольших заказов с нашего основного склада. Работаем по всему миру'
    }
  ];

  // Реальная статистика из оригинального сайта
  const stats = [
    { number: '1991', label: 'Год основания' },
    { number: '30+', label: 'Лет опыта' },
    { number: '500+', label: 'Реализованных проектов' },
    { number: '15+', label: 'Стран поставок' }
  ];

  // Продукты будут загружаться с API
  const products: any[] = [];

  // Реальные проекты из оригинального сайта
  const projects = [
    {
      name: 'Dubai Frame',
      location: 'Дубай, ОАЭ',
      description: 'Золотая фасадная рама с PVD-покрытием',
      image: '/images/projects/dubai-frame.jpg'
    },
    {
      name: 'Eye of Qatar',
      location: 'Доха, Катар',
      description: 'Облицовка скульптуры нержавеющей сталью',
      image: '/images/projects/eye-qatar.jpg'
    },
    {
      name: 'Lusail Marina Twin Towers',
      location: 'Доха, Катар',
      description: 'Фасадные панели из дуплекс-стали',
      image: '/images/projects/lusail-towers.jpg'
    }
  ];

  // Реальные отзывы (адаптированные)
  const testimonials = [
    {
      name: 'Международный проект',
      company: 'Dubai Frame, ОАЭ',
      text: 'InoxMetalArt поставила высококачественную нержавеющую сталь с золотым PVD-покрытием для знакового архитектурного объекта',
      rating: 5
    },
    {
      name: 'Архитектурное бюро',
      company: 'Eye of Qatar, Катар',
      text: 'Отличное качество материалов и профессиональный подход к реализации сложных проектов',
      rating: 5
    },
    {
      name: 'Строительная компания',
      company: 'Lusail Marina, Катар',
      text: 'Долгосрочное сотрудничество, всегда качество и сроки соблюдены. Рекомендуем как надежного партнера',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden home-hero">
        {/* Видео фон */}
        <video 
          className="home-hero-video"
          autoPlay 
          muted 
          loop 
          playsInline
          poster="/images/home-hero-poster.jpg"
        >
          <source src="/videos/home-hero-bg.mp4" type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
        
        {/* Затемнение поверх видео */}
        <div className="home-hero-overlay"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full home-hero-content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              >
                Инокс Металл Арт
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl md:text-2xl lg:text-3xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed"
              >
                Декоративная нержавеющая сталь – эксперты с 1991 года
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-lg md:text-xl text-blue-200 mb-8 max-w-5xl mx-auto leading-relaxed"
              >
                Основана в 1991 году в Таиланде для производства устойчивых художественных отделок на листах нержавеющей стали. 
                Мы сочетаем японские технологии, сырье Nisshin и низкие производственные издержки в Таиланде.
              </motion.p>
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <button
                  className="bg-gray-700 hover:bg-gray-800 text-white text-lg px-8 py-4 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl relative z-20"
                  onClick={openApplicationModal}
                >
                  Оставить заявку
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </button>
                

                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-900"
                  onClick={handleDownloadCatalog}
                  data-catalog-download
                >
                  <Download className="w-5 h-5 mr-2" />
                  Скачать каталог
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section - Наши преимущества */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Наши преимущества
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              За 30+ лет мы накопили опыт производства для мега-проектов с самыми высокими требованиями
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Наша продукция
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Широкий ассортимент декоративных отделок нержавеющей стали для любых задач
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                      <Palette className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" fullWidth>
                    Подробнее
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link to="/products">
              <Button variant="primary" size="lg">
                Смотреть весь каталог
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Знаковые проекты */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Знаковые проекты
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Наши материалы использованы в престижных международных проектах
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {project.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {project.location}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  <Button variant="outline" size="sm" fullWidth>
                    Подробнее
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Наши достижения
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Участие в крупных международных проектах подтверждает нашу экспертизу
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-blue-600">
                    {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              Готовы начать проект?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Свяжитесь с нами для получения консультации и расчета стоимости. 
              Мы поможем подобрать оптимальное решение для ваших задач.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/application">
                <Button variant="secondary" size="lg">
                  Оставить заявку
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contacts">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Modal */}
    </div>
  );
};

export default Home;

