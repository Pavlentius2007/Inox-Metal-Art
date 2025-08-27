import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Eye,
  Star,
  Shield,
  CheckCircle,
  Palette,
  Sparkles,
  Layers,
  Brush,
  FileText,
  ArrowLeft,
  Clock,
  Award,
  Globe,
  TestTube,
  Settings
} from 'lucide-react';
import Button from '../components/ui/Button';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Реальные категории продукции из InoxMetalArt
  const categories = [
    { id: 'all', name: 'Все категории', icon: Filter },
    { id: 'pvd-coatings', name: 'PVD покрытия', icon: Sparkles },
    { id: 'nano-coatings', name: 'Нанопокрытия', icon: Shield },
    { id: 'base-finishes', name: 'Базовые отделки', icon: Layers },
    { id: 'patina', name: 'Патинирование', icon: Palette },
    { id: 'art-finishes', name: 'Художественные отделки', icon: Brush },
    { id: 'etched-designs', name: 'Травление узоров', icon: FileText },
    { id: 'embossed-patterns', name: 'Рифленые узоры', icon: Star },
    { id: 'brushed-finishes', name: 'Брашировка', icon: Brush }
  ];

  // Реальные продукты из InoxMetalArt
  const products = [
    {
      id: 1,
      name: 'Titanium PVD покрытие',
      category: 'pvd-coatings',
      description: 'Вакуумное напыление нитридов титана на нержавеющую сталь с яркими декоративными цветами',
      specifications: {
        type: 'PVD покрытие',
        thickness: '0.3 мкм',
        hardness: '1600-1800 HV',
        colors: '12 стандартных цветов'
      },
      features: ['Яркие декоративные цвета', 'Устойчивость к коррозии', '30+ лет проверенной надежности', 'Экологичность'],
      image: '/images/products/titanium-pvd.jpg',
      price: 'от 3500 ₽/м²',
      detailed: {
        technology: 'Физическое осаждение из паровой фазы (PVD) — это технология напыления ионов титана в вакуумной камере, создающая прочную металлокерамическую пленку толщиной 0,3 мкм с твердостью 1600-1800 HV.',
        types: ['TiN', 'ZrN', 'CrN', 'TiAlN', 'TiC', 'TiCN', 'TiO'],
        colors: ['Золотой', 'Бронзовый', 'Черный', 'Радужный', 'Платиновый', 'Медный', 'Серебряный', 'Графитовый'],
        testing: 'Наши PVD-покрытия прошли 1000 часов солевого тумана, подтверждая их долговечность и устойчивость к коррозии.',
        quality: 'Для обеспечения точности цвета мы контролируем показатели цвета в 9 точках на каждом листе с помощью спектрофотометра, гарантируя однородность цвета.',
        experience: 'Все наши PVD-изделия, установленные за последние 30 лет, остаются неизменными.'
      }
    },
    {
      id: 2,
      name: 'Nano Scratch Resistant (NSR™)',
      category: 'nano-coatings',
      description: 'Нанопокрытие против царапин, в 4 раза тверже обычной стали',
      specifications: {
        type: 'Нанопокрытие',
        hardness: '578 HV',
        thickness: 'Нанослой',
        scratch_resistance: 'В 4 раза выше'
      },
      features: ['В 4 раза тверже обычной стали', 'Идеально для лифтов и кухонь', 'Защита от царапин', 'Долговечность'],
      image: '/images/products/nsr.jpg',
      price: 'от 2800 ₽/м²',
      detailed: {
        technology: 'NSR™ (Nano Scratch Resistant) — это специальное прозрачное нанопокрытие, повышающее твердость поверхности нержавеющей стали.',
        benefits: ['В 4 раза тверже незащищенного металла', 'Идеально для лифтов, кухонь и зон с интенсивным использованием', 'Сохраняется внешний вид', 'Легко моется'],
        applications: ['Двери лифтов', 'Поручни', 'Общественные пространства', 'Коммерческие кухни', 'Сервисные зоны'],
        testing: 'Уровень твердости по карандашному тесту подтверждает, что NSR в 4 раза прочнее обычной стали.'
      }
    },
    {
      id: 3,
      name: 'Nano Anti-Fingerprint (NAS™)',
      category: 'nano-coatings',
      description: 'Антиотпечатковое покрытие с антибактериальными свойствами',
      specifications: {
        type: 'Антибактериальное покрытие',
        effect: 'Уничтожает бактерии за 24 часа',
        maintenance: 'Не требует ухода',
        eco: 'Экологически чистый продукт'
      },
      features: ['Снижает расходы на обслуживание', 'Защищает от бактерий', 'Экологически чистый', 'Не оставляет отпечатков'],
      image: '/images/products/nas.jpg',
      price: 'от 3200 ₽/м²',
      detailed: {
        technology: 'NAS = Nano Anti-fingerprint Surface — это гидрофобное/олефобное покрытие, благодаря которому на нержавейке не остаются следы пальцев.',
        benefits: ['Поверхность обладает антибактериальными свойствами', 'Снижает потребность в частой чистке', 'Сокращает расходы на уход', 'Безопасно для окружающей среды'],
        applications: ['Больницы', 'Общественные места', 'Аэропорты', 'Торговые центры', 'Офисные здания'],
        features: ['Прозрачное покрытие не изменяет внешний вид стали', 'Создает тонкий барьер', 'Важно для гигиены']
      }
    },
    {
      id: 4,
      name: 'N8 Mirror Finish',
      category: 'base-finishes',
      description: 'Сверх-зеркальная полировка с шероховатостью Ra ~0.01 мкм',
      specifications: {
        type: 'Зеркальная полировка',
        roughness: 'Ra ~0.01 мкм',
        quality: 'N8 (высший класс)',
        reflection: 'Максимальное отражение'
      },
      features: ['Сверх-зеркальный блеск', 'Идеально для премиум-проектов', 'Архитектурные решения', 'Декоративные элементы'],
      image: '/images/products/n8-mirror.jpg',
      price: 'от 1800 ₽/м²',
      detailed: {
        technology: 'Сталь отполирована до зеркального блеска (качество N8) — это высочайший класс полировки (Ra ~0.01 мкм).',
        benefits: ['Такая поверхность сравнима с зеркалом', 'Используется в представительских интерьерах', 'Лифты премиум-класса', 'Декоративные элементы'],
        applications: ['Архитектурные проекты', 'Интерьерные решения', 'Люксовые проекты', 'Декоративные панели'],
        features: ['Максимальное отражение', 'Премиальный вид', 'Высшая степень полировки']
      }
    },
    {
      id: 5,
      name: 'Satin Finish (N4)',
      category: 'base-finishes',
      description: 'Классическая матовая шлифованная поверхность с однородными линиями',
      specifications: {
        type: 'Сатинирование',
        quality: 'N4',
        texture: 'Однородные линии шлифовки',
        reflection: 'Матовая поверхность'
      },
      features: ['Благородный матовый блеск', 'Популярно для лифтов', 'Менее маркий чем зеркало', 'Практичность'],
      image: '/images/products/satin-n4.jpg',
      price: 'от 1200 ₽/м²',
      detailed: {
        technology: 'Классическая матовая шлифованная поверхность (чаще всего называется "сатиновая" или «шлифованная №4»).',
        benefits: ['Имеет однородные тонкие линии шлифовки', 'Менее отражающая, чем зеркало', 'Популярна для отделки лифтов', 'Техника'],
        applications: ['Отделка лифтов', 'Бытовая техника', 'Интерьерные панели', 'Декоративные элементы'],
        features: ['Благородный матовый блеск', 'Менее маркий чем зеркало', 'Практичность']
      }
    },
    {
      id: 6,
      name: 'Hairline Finish (HL)',
      category: 'base-finishes',
      description: 'Отделка с непрерывными продольными линиями шлифовки',
      specifications: {
        type: 'Полировка "волосок"',
        texture: 'Направленные линии',
        finish: 'Более глянцевый чем satin',
        masking: 'Скрывает мелкие царапины'
      },
      features: ['Направленная текстура', 'Элитные интерьеры', 'Скрывает дефекты', 'Престижный вид'],
      image: '/images/products/hairline.jpg',
      price: 'от 1500 ₽/м²',
      detailed: {
        technology: 'Отделка с непрерывными продольными линиями шлифовки, очень ровными и тонкими, напоминающими волосы (отсюда название).',
        benefits: ['Чуть более глянцевая, чем обычный satin', 'С направленной текстурой', 'Скрывает мелкие царапины лучше, чем зеркало'],
        applications: ['Элитные интерьеры', 'Лифты премиум-класса', 'Декоративные профили', 'Панели'],
        features: ['Hairline – более престижный вид шлифовки', 'Часто применяется для декоративных профилей', 'Скрывает мелкие царапины']
      }
    },
    {
      id: 7,
      name: 'Vibration Finish (VIB)',
      category: 'base-finishes',
      description: 'Нерегулярный недирекционный рисунок шлифовки с круговыми следами',
      specifications: {
        type: 'Вибрационная отделка',
        texture: 'Круговые следы',
        direction: 'Недирекционная',
        effect: 'Мягкий шелковистый блеск'
      },
      features: ['Мягкий шелковистый блеск', 'Скрывает отпечатки', 'Практичность', 'Большие панели'],
      image: '/images/products/vibration.jpg',
      price: 'от 1400 ₽/м²',
      detailed: {
        technology: 'Нерегулярный, недирекционный (беспорядочный) рисунок шлифовки, получаемый круговыми или хаотичными движениями абразива.',
        benefits: ['На поверхности – мелкие "вихревые" или круговые следы', 'Создает равномерную матовую текстуру', 'Хорошо скрывает отпечатки и царапины'],
        applications: ['Высококачественная вибрационная отделка идеальна для архитектурного и декоративного применения', 'Отделка больших панелей'],
        features: ['Вибрационная шлифовка дает мягкий шелковистый блеск', 'Очень практична для отделки больших панелей', 'На ней менее заметны дефекты и отпечатки']
      }
    },
    {
      id: 8,
      name: 'Bead Blast Finish (BB)',
      category: 'base-finishes',
      description: 'Дробеструйная матовая обработка стеклянными шариками',
      specifications: {
        type: 'Дробеструйная обработка',
        material: 'Стеклянные/керамические шарики',
        texture: 'Равномерная матовость',
        effect: 'Самая матовая отделка'
      },
      features: ['Равномерная матовая поверхность', 'Скрывает отпечатки', 'Приятная на ощупь', 'Рассеянный блеск'],
      image: '/images/products/bead-blast.jpg',
      price: 'от 1100 ₽/м²',
      detailed: {
        technology: 'Поверхность обработана мелкими стеклянными или керамическими шариками под давлением, что придает равномерный матовый вид.',
        benefits: ['Это самая матовая из отделок', 'Без выраженных направленных рисок', 'Уместна для антибликовых поверхностей'],
        applications: ['Пол лифта', 'Декоративные элементы', 'Антибликовые поверхности', 'Интерьерные панели'],
        features: ['Дробеструйная обработка создает ровную матовую поверхность', 'Скрывает отпечатки и отражения', 'Приятная на ощупь']
      }
    },
    {
      id: 9,
      name: 'Патинирование нержавеющей стали',
      category: 'patina',
      description: 'Художественное состаривание поверхности с уникальными оттенками и текстурами',
      specifications: {
        type: 'Художественная отделка',
        process: 'Химическое состаривание',
        colors: 'Уникальные оттенки',
        texture: 'Состаренная поверхность'
      },
      features: ['Уникальные оттенки', 'Глубина и характер', 'Архитектурные проекты', 'Дизайн интерьеров'],
      image: '/images/products/patina.jpg',
      price: 'от 4500 ₽/м²',
      detailed: {
        technology: 'Патинирование — это процесс химического состаривания поверхности нержавеющей стали, создающий уникальные оттенки и текстуры.',
        benefits: ['Придает металлу глубину и характер', 'Создает уникальные цветовые решения', 'Идеально для художественных проектов', 'Долговечность покрытия'],
        applications: ['Архитектурные фасады', 'Интерьерные панели', 'Декоративные элементы', 'Художественные инсталляции', 'Рестораны и отели'],
        features: ['Каждый лист уникален', 'Возможность настройки оттенков', 'Эксклюзивный внешний вид', 'Сохраняет свойства стали'],
        process: 'Процесс включает химическую обработку поверхности с последующей фиксацией результата, что обеспечивает долговечность покрытия.',
        customization: 'Возможна настройка интенсивности состаривания и цветовых оттенков под конкретный проект.'
      }
    },
    {
      id: 10,
      name: 'Травление узоров (130+ шаблонов)',
      category: 'etched-designs',
      description: 'Химическое травление сложных узоров и рисунков на поверхности стали',
      specifications: {
        type: 'Химическое травление',
        patterns: '130+ готовых шаблонов',
        depth: 'Контролируемая глубина',
        precision: 'Высокая точность'
      },
      features: ['130+ готовых шаблонов', 'Индивидуальные узоры', 'Высокая точность', 'Декоративность'],
      image: '/images/products/etched-patterns.jpg',
      price: 'от 3800 ₽/м²',
      detailed: {
        technology: 'Травление узоров — это процесс химического или механического травления, позволяющий создавать сложные узоры и рисунки на поверхности нержавеющей стали.',
        benefits: ['Создает уникальные декоративные эффекты', 'Возможность индивидуального дизайна', 'Высокая точность воспроизведения', 'Долговечность узора'],
        applications: ['Облицовка лифтов', 'Настенные панели', 'Декоративные экраны', 'Мебельные фасады', 'Архитектурные элементы'],
        features: ['130+ готовых шаблонов на выбор', 'Возможность создания индивидуальных узоров', 'Контролируемая глубина травления', 'Сохранение всех свойств стали'],
        patterns: ['Геометрические узоры', 'Флористические мотивы', 'Абстрактные композиции', 'Классические орнаменты', 'Современные дизайны'],
        process: 'Процесс включает нанесение защитного слоя, травление открытых участков и финальную обработку поверхности.'
      }
    },
    {
      id: 11,
      name: 'Рифленые узоры (Тиснение)',
      category: 'embossed-patterns',
      description: 'Объемные рельефные узоры, созданные методом тиснения',
      specifications: {
        type: 'Механическое тиснение',
        relief: 'Объемные узоры',
        depth: 'До 2 мм',
        texture: 'Тактильная поверхность'
      },
      features: ['Объемные узоры', 'Тактильная поверхность', 'Уникальные текстуры', 'Декоративность'],
      image: '/images/products/embossed-patterns.jpg',
      price: 'от 4200 ₽/м²',
      detailed: {
        technology: 'Рифленые узоры создаются методом механического тиснения, придающим поверхности нержавеющей стали рельефный эффект.',
        benefits: ['Создает объемные текстурированные поверхности', 'Уникальный тактильный опыт', 'Высокая декоративность', 'Долговечность узора'],
        applications: ['Настенные панели', 'Двери лифтов', 'Декоративная мебель', 'Архитектурные фасады', 'Интерьерные элементы'],
        features: ['Глубина тиснения до 2 мм', 'Возможность создания индивидуальных узоров', 'Сохранение прочности материала', 'Легкость в уходе'],
        patterns: ['Классические орнаменты', 'Современные геометрические узоры', 'Природные текстуры', 'Абстрактные композиции', 'Корпоративные логотипы'],
        process: 'Процесс включает создание матрицы с нужным узором и механическое тиснение под давлением.'
      }
    },
    {
      id: 12,
      name: 'Art Brush (Художественная брашировка)',
      category: 'brushed-finishes',
      description: 'Механическая обработка поверхности с созданием художественных текстур',
      specifications: {
        type: 'Художественная брашировка',
        texture: 'Уникальные текстуры',
        direction: 'Различные направления',
        effect: 'Художественный результат'
      },
      features: ['Уникальные текстуры', 'Художественный результат', 'Индивидуальность', 'Декоративность'],
      image: '/images/products/art-brush.jpg',
      price: 'от 3600 ₽/м²',
      detailed: {
        technology: 'Art Brush — это процесс механической обработки поверхности нержавеющей стали мелкими абразивными материалами по различным направлениям.',
        benefits: ['Создает уникальные художественные текстуры', 'Возможность индивидуального дизайна', 'Высокая декоративность', 'Сохранение функциональности'],
        applications: ['Декоративные панели', 'Интерьерные элементы', 'Художественные инсталляции', 'Архитектурные детали', 'Мебельные фасады'],
        features: ['Различные направления брашировки', 'Возможность создания сложных узоров', 'Уникальность каждого листа', 'Долговечность отделки'],
        techniques: ['Линейная брашировка', 'Круговая брашировка', 'Комбинированные техники', 'Градиентные эффекты', 'Контрастные текстуры'],
        process: 'Процесс включает механическую обработку поверхности абразивными материалами с контролируемым направлением и интенсивностью.'
      }
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Детальная страница продукта
  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-white">
        {/* Back Button */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setSelectedProduct(null)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Вернуться к каталогу</span>
            </button>
          </div>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                    <Palette className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h2>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                <div className="text-3xl font-bold text-blue-600 mb-4">{selectedProduct.price}</div>
                <div className="flex space-x-4">
                  <Button variant="primary" size="lg" fullWidth>
                    <Download className="w-5 h-5 mr-2" />
                    Скачать каталог
                  </Button>
                  <Button variant="outline" size="lg" fullWidth>
                    Запросить цену
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Technology */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-6 h-6 mr-2 text-blue-600" />
                  Технология
                </h3>
                <p className="text-gray-600 leading-relaxed">{selectedProduct.detailed.technology}</p>
              </div>

              {/* Benefits */}
              {selectedProduct.detailed.benefits && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Award className="w-6 h-6 mr-2 text-blue-600" />
                    Преимущества
                  </h3>
                  <ul className="space-y-2">
                    {selectedProduct.detailed.benefits.map((benefit: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {selectedProduct.detailed.applications && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-blue-600" />
                    Применение
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.detailed.applications.map((app: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {selectedProduct.detailed.features && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Star className="w-6 h-6 mr-2 text-blue-600" />
                    Особенности
                  </h3>
                  <ul className="space-y-2">
                    {selectedProduct.detailed.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Testing */}
              {selectedProduct.detailed.testing && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <TestTube className="w-6 h-6 mr-2 text-blue-600" />
                    Тестирование
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.detailed.testing}</p>
                </div>
              )}

              {/* Quality Control */}
              {selectedProduct.detailed.quality && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-blue-600" />
                    Контроль качества
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.detailed.quality}</p>
                </div>
              )}

              {/* Experience */}
              {selectedProduct.detailed.experience && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-blue-600" />
                    Опыт применения
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.detailed.experience}</p>
                </div>
              )}

              {/* Process */}
              {selectedProduct.detailed.process && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Settings className="w-6 h-6 mr-2 text-blue-600" />
                    Процесс производства
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.detailed.process}</p>
                </div>
              )}

              {/* Customization */}
              {selectedProduct.detailed.customization && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Palette className="w-6 h-6 mr-2 text-blue-600" />
                    Возможности настройки
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProduct.detailed.customization}</p>
                </div>
              )}

              {/* Patterns */}
              {selectedProduct.detailed.patterns && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Star className="w-6 h-6 mr-2 text-blue-600" />
                    Доступные узоры
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.detailed.patterns.map((pattern: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{pattern}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Techniques */}
              {selectedProduct.detailed.techniques && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Brush className="w-6 h-6 mr-2 text-blue-600" />
                    Техники обработки
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedProduct.detailed.techniques.map((technique: string, idx: number) => (
                      <div key={idx} className="flex items-center space-x-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">{technique}</span>
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
            className="text-5xl md:text-7xl font-bold mb-6 whitespace-nowrap"
          >
            Продукция
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto"
          >
            Декоративные отделки нержавеющей стали для архитектуры, дизайна и промышленности
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-blue-200 max-w-3xl mx-auto mt-4"
          >
            От PVD-покрытий до художественных отделок - полный спектр решений для ваших проектов
          </motion.p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md lg:max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Поиск по продукции..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
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
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
                      <Palette className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {product.description}
                  </p>

                  {/* Specifications */}
                  <div className="space-y-2 mb-4">
                    {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-500 capitalize">{key.replace('_', ' ')}:</span>
                        <span className="text-gray-700 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-blue-600">
                      {product.price}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Подробнее
                      </Button>
                      <Button variant="primary" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Каталог
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Продукты не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить параметры поиска или выберите другую категорию
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
              Нужна консультация по продукции?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Наши специалисты помогут подобрать оптимальные решения для вашего проекта. 
              Свяжитесь с нами для получения подробной информации.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Получить консультацию
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900">
                Скачать полный каталог
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
