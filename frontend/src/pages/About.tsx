import React from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Target, 
  CheckCircle, 
  Globe,
  Factory,
  Lightbulb,
  MapPin,
  Clock,
  Shield,
  Zap
} from 'lucide-react';

const About: React.FC = () => {
  // Реальная статистика из InoxMetalArt
  const stats = [
    { number: '1991', label: 'Год основания', icon: Award },
    { number: '30+', label: 'Лет опыта', icon: Clock },
    { number: '500+', label: 'Реализованных проектов', icon: CheckCircle },
    { number: '15+', label: 'Стран поставок', icon: Globe }
  ];

  // Реальные ценности из InoxMetalArt
  const values = [
    {
      icon: Target,
      title: 'Качество',
      description: 'Сочетание японских технологий, сырья Nisshin и низких производственных издержек в Таиланде для выпуска продукции высочайшего качества'
    },
    {
      icon: Shield,
      title: 'Надежность',
      description: '30+ лет опыта участия в крупных международных проектах с самыми высокими требованиями. Зарекомендовали себя как надежного поставщика'
    },
    {
      icon: Users,
      title: 'Сервис',
      description: 'Помогаем дизайнерам подбирать наиболее подходящие и доступные отделки для конкретного применения. Внимательный подход к каждому клиенту'
    },
    {
      icon: Zap,
      title: 'Инновации',
      description: 'Постоянное внедрение новых технологий: NAS™ (антибактериальное), NSR™ (антицарапинное), PVD-покрытия и экологичные решения'
    }
  ];

  // Реальная история InoxMetalArt
  const timeline = [
    {
      year: '1991',
      title: 'Основание компании',
      description: 'Создание Hwa Lin Stainless Steel Industry Co., Ltd. в Бангкоке, Таиланд для производства устойчивых художественных отделок на листах нержавеющей стали'
    },
    {
      year: '1995',
      title: 'Первые международные проекты',
      description: 'Начало поставок для крупных архитектурных объектов в Азии. Сочетание японских технологий с тайским производством'
    },
    {
      year: '2005',
      title: 'Расширение технологий',
      description: 'Внедрение PVD-покрытий и нанотехнологий. Разработка собственных решений для декоративной отделки'
    },
    {
      year: '2015',
      title: 'Глобальное присутствие',
      description: 'Участие в знаковых проектах: Dubai Frame, Eye of Qatar, Lusail Marina Twin Towers. Работа в 15+ странах'
    },
    {
      year: '2020',
      title: 'Инновационные покрытия',
      description: 'Запуск NAS™ (Nano Anti-Fingerprint) и NSR™ (Nano Scratch Resistant) покрытий для премиум-сегмента'
    },
    {
      year: '2025',
      title: 'Выход на рынок США',
      description: 'Расширение на американский рынок с новыми нано-покрытиями. Продолжение инновационного развития'
    }
  ];

  // Реальные международные проекты
  const projects = [
    {
      name: 'Dubai Frame',
      location: 'Дубай, ОАЭ',
      description: 'Золотая фасадная рама с PVD-покрытием. Знаковый архитектурный объект',
      year: '2018'
    },
    {
      name: 'Eye of Qatar',
      location: 'Доха, Катар',
      description: 'Облицовка скульптуры нержавеющей сталью. Символ города',
      year: '2019'
    },
    {
      name: 'Lusail Marina Twin Towers',
      location: 'Доха, Катар',
      description: 'Фасадные панели из дуплекс-стали для престижного района',
      year: '2020'
    },
    {
      name: 'Проекты в Кувейте',
      location: 'Кувейт',
      description: 'Множественные объекты с использованием декоративной нержавеющей стали',
      year: '2017-2022'
    },
    {
      name: 'Европейские проекты',
      location: 'Франция, Италия',
      description: 'Архитектурные решения для престижных объектов в Европе',
      year: '2016-2023'
    }
  ];

  // Технологии производства
  const technologies = [
    {
      icon: Factory,
      title: 'Японские технологии',
      description: 'Использование передовых японских методов обработки и контроля качества'
    },
    {
      icon: Shield,
      title: 'Сырье Nisshin',
      description: 'Высококачественное сырье от ведущего японского производителя Nisshin Steel'
    },
    {
      icon: MapPin,
      title: 'Тайское производство',
      description: 'Низкие производственные издержки в Таиланде при сохранении высочайшего качества'
    },
    {
      icon: Lightbulb,
      title: 'Собственные разработки',
      description: 'Инновационные покрытия NAS™ и NSR™, разработанные в собственных лабораториях'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-6 whitespace-nowrap"
            >
              О компании
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto px-4"
            >
              Декоративная нержавеющая сталь – эксперты с 1991 года
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-blue-200 max-w-5xl mx-auto px-4 mt-4"
            >
              Основана в Таиланде для производства устойчивых художественных отделок. 
              Сочетаем японские технологии, сырье Nisshin и низкие производственные издержки
            </motion.p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Наши достижения в цифрах
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              За 30+ лет работы мы заслужили доверие клиентов по всему миру и реализовали 
              множество знаковых проектов
            </p>
          </motion.div>

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
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Наша миссия
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Предоставлять клиентам инновационные и долговечные декоративные решения из нержавеющей стали, 
                соответствующие самым высоким стандартам качества и дизайна. Мы стремимся быть надежным партнером 
                для архитекторов, дизайнеров и строителей по всему миру.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Сочетание японских технологий с тайским производством</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">30+ лет опыта в крупных международных проектах</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-gray-700">Инновационные нанопокрытия NAS™ и NSR™</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Технологии и производство
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Уникальное сочетание японских технологий, высококачественного сырья и тайского производства
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <tech.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {tech.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
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
              История развития
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Путь от небольшой компании в Таиланде до международного лидера в области декоративной нержавеющей стали
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="text-2xl font-bold text-blue-600 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* International Projects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Международные проекты
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Наши материалы использованы в престижных архитектурных объектах по всему миру
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm text-blue-600 font-medium">{project.year}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.name}
                </h3>
                <div className="text-blue-600 font-medium mb-3">
                  {project.location}
                </div>
                <p className="text-gray-600 text-sm">
                  {project.description}
                </p>
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
              Готовы к сотрудничеству?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Свяжитесь с нами для обсуждения вашего проекта. Мы поможем подобрать оптимальные решения 
              из нашего ассортимента декоративной нержавеющей стали.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contacts" className="inline-block">
                <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                  Связаться с нами
                </button>
              </a>
              <a href="/products" className="inline-block">
                <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200">
                  Посмотреть продукцию
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

