import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Eye,
  Shield,
  Sparkles,
  Brush,
  ArrowLeft,
  Award,
  Globe,
  TestTube,
  Grid,
  Layers,
  Cpu,
  Factory,
  Microscope,
  Gauge,
  CheckCircle
} from 'lucide-react';
import Button from '../components/ui/Button';

const Technologies: React.FC = () => {
  const [selectedTechnology, setSelectedTechnology] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Категории технологий
  const categories = [
    { id: 'all', name: 'Все технологии', icon: Grid },
    { id: 'pvd', name: 'PVD покрытия', icon: Sparkles },
    { id: 'nano', name: 'Нанопокрытия', icon: Shield },
    { id: 'surface', name: 'Поверхностная обработка', icon: Layers },
    { id: 'chemical', name: 'Химическая обработка', icon: TestTube },
    { id: 'mechanical', name: 'Механическая обработка', icon: Cpu },
    { id: 'quality', name: 'Контроль качества', icon: Microscope }
  ];

  // Технологии производства
  const technologies = [
    {
      id: 1,
      name: 'Физическое осаждение из паровой фазы (PVD)',
      category: 'pvd',
      description: 'Вакуумная технология напыления металлокерамических покрытий',
      icon: Sparkles,
      process: {
        steps: [
          'Подготовка поверхности нержавеющей стали',
          'Помещение в вакуумную камеру',
          'Нагрев до рабочей температуры',
          'Испарение титана или других металлов',
          'Ионизация и осаждение на поверхность',
          'Формирование металлокерамической пленки'
        ],
        duration: '2-4 часа',
        temperature: '200-400°C',
        pressure: '10⁻⁴ - 10⁻⁶ мбар'
      },
      specifications: {
        thickness: '0.3 мкм',
        hardness: '1600-1800 HV',
        adhesion: 'Отличная',
        corrosion_resistance: 'Высокая',
        color_stability: '30+ лет'
      },
      advantages: [
        'Яркие декоративные цвета',
        'Высокая твердость и износостойкость',
        'Отличная адгезия к стали',
        'Экологичность процесса',
        'Долговечность покрытия'
      ],
      applications: [
        'Архитектурные элементы',
        'Лифты премиум-класса',
        'Декоративные панели',
        'Мебельные фасады',
        'Художественные инсталляции'
      ],
      quality_control: [
        'Контроль толщины покрытия',
        'Измерение твердости',
        'Тест на адгезию',
        'Проверка цвета спектрофотометром',
        'Коррозионные испытания'
      ]
    },
    {
      id: 2,
      name: 'Нанопокрытие против царапин (NSR™)',
      category: 'nano',
      description: 'Прозрачное нанопокрытие, повышающее твердость поверхности',
      icon: Shield,
      process: {
        steps: [
          'Очистка поверхности от загрязнений',
          'Активация поверхности',
          'Нанесение нанодисперсии',
          'Полимеризация покрытия',
          'Формирование защитного слоя',
          'Контроль качества'
        ],
        duration: '30-60 минут',
        temperature: '20-25°C',
        pressure: 'Атмосферное'
      },
      specifications: {
        thickness: 'Нанослой',
        hardness: '578 HV',
        transparency: '100%',
        scratch_resistance: 'В 4 раза выше',
        durability: '5+ лет'
      },
      advantages: [
        'В 4 раза тверже незащищенной стали',
        'Полностью прозрачное покрытие',
        'Сохраняет внешний вид',
        'Легко моется',
        'Экологически безопасно'
      ],
      applications: [
        'Двери лифтов',
        'Поручни и перила',
        'Общественные пространства',
        'Коммерческие кухни',
        'Сервисные зоны'
      ],
      quality_control: [
        'Тест твердости по карандашу',
        'Проверка прозрачности',
        'Тест на царапины',
        'Измерение толщины',
        'Проверка адгезии'
      ]
    },
    {
      id: 3,
      name: 'Антибактериальное нанопокрытие (NAS™)',
      category: 'nano',
      description: 'Гидрофобное покрытие с антибактериальными свойствами',
      icon: Shield,
      process: {
        steps: [
          'Подготовка поверхности',
          'Нанесение антибактериального агента',
          'Формирование гидрофобного слоя',
          'Активация антибактериальных свойств',
          'Финальная обработка',
          'Тестирование эффективности'
        ],
        duration: '45-90 минут',
        temperature: '20-30°C',
        pressure: 'Атмосферное'
      },
      specifications: {
        type: 'Гидрофобное/олефобное',
        antibacterial_effect: '99.9%',
        maintenance: 'Не требуется',
        eco_friendly: 'Да',
        durability: '3+ лет'
      },
      advantages: [
        'Уничтожает бактерии за 24 часа',
        'Не оставляет отпечатков пальцев',
        'Снижает потребность в чистке',
        'Экологически безопасно',
        'Сокращает расходы на обслуживание'
      ],
      applications: [
        'Больницы и клиники',
        'Аэропорты и вокзалы',
        'Торговые центры',
        'Офисные здания',
        'Общественные места'
      ],
      quality_control: [
        'Антибактериальные тесты',
        'Проверка гидрофобности',
        'Тест на отпечатки',
        'Измерение толщины',
        'Проверка долговечности'
      ]
    },
    {
      id: 4,
      name: 'Зеркальная полировка (N8)',
      category: 'surface',
      description: 'Высококачественная полировка до зеркального блеска',
      icon: Layers,
      process: {
        steps: [
          'Грубая шлифовка абразивами',
          'Средняя шлифовка',
          'Тонкая шлифовка',
          'Полировка алмазными пастами',
          'Финальная полировка',
          'Контроль качества поверхности'
        ],
        duration: '2-6 часов',
        temperature: '20-25°C',
        pressure: 'Контролируемое'
      },
      specifications: {
        finish: 'N8 (зеркальный)',
        roughness: 'Ra ~0.01 мкм',
        reflection: 'Максимальное',
        quality: 'Высший класс',
        appearance: 'Зеркальный блеск'
      },
      advantages: [
        'Максимальный зеркальный блеск',
        'Высшая степень полировки',
        'Идеально для премиум-проектов',
        'Долговечность отделки',
        'Профессиональный вид'
      ],
      applications: [
        'Архитектурные проекты',
        'Интерьерные решения',
        'Лифты премиум-класса',
        'Декоративные панели',
        'Люксовые проекты'
      ],
      quality_control: [
        'Измерение шероховатости',
        'Проверка отражения',
        'Визуальный контроль',
        'Тест на царапины',
        'Проверка однородности'
      ]
    },
    {
      id: 5,
      name: 'Сатинирование (N4)',
      category: 'surface',
      description: 'Классическая матовая шлифованная поверхность',
      icon: Layers,
      process: {
        steps: [
          'Подготовка поверхности',
          'Шлифовка абразивными лентами',
          'Создание однородных линий',
          'Контроль направления шлифовки',
          'Финальная обработка',
          'Проверка качества'
        ],
        duration: '1-3 часа',
        temperature: '20-25°C',
        pressure: 'Контролируемое'
      },
      specifications: {
        finish: 'N4 (сатиновая)',
        texture: 'Однородные линии',
        reflection: 'Матовая',
        roughness: 'Ra 0.1-0.3 мкм',
        appearance: 'Благородный матовый блеск'
      },
      advantages: [
        'Благородный матовый блеск',
        'Менее маркая чем зеркало',
        'Популярна для лифтов',
        'Практичность в использовании',
        'Классический вид'
      ],
      applications: [
        'Отделка лифтов',
        'Бытовая техника',
        'Интерьерные панели',
        'Декоративные элементы',
        'Офисные интерьеры'
      ],
      quality_control: [
        'Проверка направления линий',
        'Измерение шероховатости',
        'Визуальный контроль',
        'Проверка однородности',
        'Тест на царапины'
      ]
    },
    {
      id: 6,
      name: 'Химическое травление узоров',
      category: 'chemical',
      description: 'Создание декоративных узоров химическим травлением',
      icon: TestTube,
      process: {
        steps: [
          'Подготовка поверхности',
          'Нанесение защитного слоя',
          'Создание трафарета узора',
          'Химическое травление',
          'Удаление защитного слоя',
          'Финальная обработка'
        ],
        duration: '1-4 часа',
        temperature: '20-40°C',
        pressure: 'Атмосферное'
      },
      specifications: {
        depth: '0.1-0.3 мм',
        precision: 'Высокая',
        patterns: '130+ шаблонов',
        customization: 'Индивидуальные узоры',
        quality: 'Профессиональная'
      },
      advantages: [
        '130+ готовых шаблонов',
        'Возможность индивидуального дизайна',
        'Высокая точность воспроизведения',
        'Долговечность узора',
        'Сохранение свойств стали'
      ],
      applications: [
        'Облицовка лифтов',
        'Настенные панели',
        'Декоративные экраны',
        'Мебельные фасады',
        'Архитектурные элементы'
      ],
      quality_control: [
        'Проверка глубины травления',
        'Контроль точности узора',
        'Визуальный контроль',
        'Проверка однородности',
        'Тест на долговечность'
      ]
    },
    {
      id: 7,
      name: 'Механическое тиснение (Рифленые узоры)',
      category: 'mechanical',
      description: 'Создание объемных рельефных узоров',
      icon: Cpu,
      process: {
        steps: [
          'Подготовка поверхности',
          'Создание матрицы с узором',
          'Установка в пресс',
          'Механическое тиснение',
          'Контроль глубины',
          'Финальная обработка'
        ],
        duration: '30-120 минут',
        temperature: '20-25°C',
        pressure: 'Высокое (до 1000 т)'
      },
      specifications: {
        depth: 'До 2 мм',
        relief: 'Объемный',
        texture: 'Тактильная',
        patterns: 'Индивидуальные',
        quality: 'Профессиональная'
      },
      advantages: [
        'Создает объемные текстуры',
        'Уникальный тактильный опыт',
        'Высокая декоративность',
        'Долговечность узора',
        'Сохранение прочности материала'
      ],
      applications: [
        'Настенные панели',
        'Двери лифтов',
        'Декоративная мебель',
        'Архитектурные фасады',
        'Интерьерные элементы'
      ],
      quality_control: [
        'Измерение глубины тиснения',
        'Проверка качества узора',
        'Контроль прочности',
        'Визуальный контроль',
        'Тест на долговечность'
      ]
    },
    {
      id: 8,
      name: 'Художественная брашировка (Art Brush)',
      category: 'mechanical',
      description: 'Механическая обработка с созданием художественных текстур',
      icon: Brush,
      process: {
        steps: [
          'Подготовка поверхности',
          'Выбор направления брашировки',
          'Механическая обработка',
          'Создание текстуры',
          'Контроль качества',
          'Финальная обработка'
        ],
        duration: '1-3 часа',
        temperature: '20-25°C',
        pressure: 'Контролируемое'
      },
      specifications: {
        technique: 'Механическая',
        texture: 'Художественная',
        direction: 'Различные',
        customization: 'Индивидуальная',
        quality: 'Профессиональная'
      },
      advantages: [
        'Уникальные художественные текстуры',
        'Возможность индивидуального дизайна',
        'Высокая декоративность',
        'Сохранение функциональности',
        'Долговечность отделки'
      ],
      applications: [
        'Декоративные панели',
        'Интерьерные элементы',
        'Художественные инсталляции',
        'Архитектурные детали',
        'Мебельные фасады'
      ],
      quality_control: [
        'Проверка направления текстуры',
        'Контроль качества обработки',
        'Визуальный контроль',
        'Проверка однородности',
        'Тест на долговечность'
      ]
    }
  ];

  const filteredTechnologies = technologies.filter(tech => {
    return selectedCategory === 'all' || tech.category === selectedCategory;
  });

  // Детальная страница технологии
  if (selectedTechnology) {
    return (
      <div className="min-h-screen bg-white pt-32">
        {/* Back Button */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setSelectedTechnology(null)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Вернуться к технологиям</span>
            </button>
          </div>
        </div>

        {/* Technology Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Technology Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center">
                    <selectedTechnology.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900">{selectedTechnology.name}</h1>
                    <p className="text-xl text-gray-600">{selectedTechnology.description}</p>
                  </div>
                </div>

                {/* Specifications */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Gauge className="w-6 h-6 mr-2 text-blue-600" />
                    Технические характеристики
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedTechnology.specifications).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-gray-500 capitalize">{key.replace(/_/g, ' ')}:</span>
                        <div className="text-gray-700 font-medium">{String(value)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advantages */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="w-6 h-6 mr-2 text-blue-600" />
                    Преимущества технологии
                  </h3>
                  <ul className="space-y-2">
                    {selectedTechnology.advantages.map((advantage: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{advantage}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Process and Applications */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Process */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Factory className="w-6 h-6 mr-2 text-blue-600" />
                  Процесс производства
                </h3>
                <div className="bg-blue-50 p-6 rounded-xl">
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Длительность:</span>
                      <div className="text-gray-700 font-medium">{selectedTechnology.process.duration}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Температура:</span>
                      <div className="text-gray-700 font-medium">{selectedTechnology.process.temperature}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Давление:</span>
                      <div className="text-gray-700 font-medium">{selectedTechnology.process.pressure}</div>
                    </div>
                  </div>
                  <ol className="space-y-2">
                    {selectedTechnology.process.steps.map((step: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Applications */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-6 h-6 mr-2 text-blue-600" />
                  Применение
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedTechnology.applications.map((app: string, idx: number) => (
                    <div key={idx} className="flex items-center space-x-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{app}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Control */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Microscope className="w-6 h-6 mr-2 text-blue-600" />
                  Контроль качества
                </h3>
                <ul className="space-y-2">
                  {selectedTechnology.quality_control.map((control: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{control}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
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
            Технологии
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto"
          >
            Передовые технологии обработки нержавеющей стали от InoxMetalArt
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-blue-200 max-w-3xl mx-auto mt-4"
          >
            От PVD-покрытий до художественных отделок - изучите наши инновационные процессы
          </motion.p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
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
        </div>
      </section>

      {/* Technologies Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTechnologies.map((tech, index) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer"
                onClick={() => setSelectedTechnology(tech)}
              >
                {/* Technology Icon */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                      <tech.icon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>

                {/* Technology Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {tech.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {tech.description}
                  </p>

                  {/* Key Specifications */}
                  <div className="space-y-2 mb-4">
                    {Object.entries(tech.specifications).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-500 capitalize">{key.replace(/_/g, ' ')}:</span>
                        <span className="text-gray-700 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Process Info */}
                  <div className="bg-blue-50 p-3 rounded-lg mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Длительность:</span>
                      <span className="text-blue-700 font-medium">{tech.process.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Температура:</span>
                      <span className="text-blue-700 font-medium">{tech.process.temperature}</span>
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

          {/* No Results */}
          {filteredTechnologies.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Технологии не найдены
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
              Нужна консультация по технологиям?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Наши технологи помогут подобрать оптимальные решения для вашего проекта. 
              Свяжитесь с нами для получения подробной информации.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Получить консультацию
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900">
                Скачать техническую документацию
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Technologies;
