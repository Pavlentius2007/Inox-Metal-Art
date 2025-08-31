import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Download, 
  Eye,
  Award,
  Grid,
  List,
  Building,
  Calendar,
  Target,
  CheckCircle,
  Award as AwardIcon,
  Shield as ShieldIcon,
  Globe as GlobeIcon,
  CheckCircle as CheckCircleIcon,
  Info,
  FileCheck,
  ArrowLeft,
  FileText
} from 'lucide-react';
import Button from '../components/ui/Button';

const Certificates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  // Категории сертификатов
  const categories = [
    { id: 'all', name: 'Все сертификаты', icon: Grid },
    { id: 'quality', name: 'Качество продукции', icon: AwardIcon },
    { id: 'management', name: 'Система менеджмента', icon: ShieldIcon },
    { id: 'environmental', name: 'Экологические стандарты', icon: GlobeIcon },
    { id: 'safety', name: 'Безопасность', icon: CheckCircleIcon }
  ];

  // Сертификаты и документы
  const certificates = [
    {
      id: 1,
      name: 'Сертификат соответствия ISO 9001:2015',
      category: 'management',
      type: 'Система менеджмента качества',
      issuer: 'TÜV SÜD',
      issueDate: '2023-01-15',
      expiryDate: '2026-01-15',
      status: 'Действующий',
      description: 'Сертификат подтверждает соответствие системы менеджмента качества международному стандарту ISO 9001:2015',
      scope: 'Проектирование, разработка, производство и поставка декоративной нержавеющей стали',
      requirements: [
        'Планирование и контроль качества',
        'Управление ресурсами',
        'Процессы жизненного цикла продукции',
        'Измерение, анализ и улучшение'
      ],
      benefits: [
        'Международное признание качества',
        'Повышение эффективности процессов',
        'Улучшение удовлетворенности клиентов',
        'Конкурентные преимущества'
      ],
      documentNumber: 'ISO-9001-2023-001',
      fileSize: '2.4 MB',
      format: 'PDF',
      downloadUrl: '/certificates/iso-9001-2015.pdf',
      icon: AwardIcon,
      color: 'blue'
    },
    {
      id: 2,
      name: 'Сертификат соответствия ISO 14001:2015',
      category: 'environmental',
      type: 'Система экологического менеджмента',
      issuer: 'TÜV SÜD',
      issueDate: '2023-02-20',
      expiryDate: '2026-02-20',
      status: 'Действующий',
      description: 'Сертификат подтверждает соответствие системы экологического менеджмента международному стандарту ISO 14001:2015',
      scope: 'Экологически безопасное производство декоративной нержавеющей стали',
      requirements: [
        'Экологическая политика',
        'Планирование экологических аспектов',
        'Внедрение и функционирование',
        'Проверка и корректирующие действия'
      ],
      benefits: [
        'Снижение экологического воздействия',
        'Соответствие экологическим требованиям',
        'Улучшение экологической эффективности',
        'Репутация экологически ответственной компании'
      ],
      documentNumber: 'ISO-14001-2023-001',
      fileSize: '1.8 MB',
      format: 'PDF',
      downloadUrl: '/certificates/iso-14001-2015.pdf',
      icon: GlobeIcon,
      color: 'green'
    },
    {
      id: 3,
      name: 'Сертификат соответствия ISO 45001:2018',
      category: 'safety',
      type: 'Система менеджмента охраны труда и безопасности',
      issuer: 'TÜV SÜD',
      issueDate: '2023-03-10',
      expiryDate: '2026-03-10',
      status: 'Действующий',
      description: 'Сертификат подтверждает соответствие системы менеджмента охраны труда и безопасности международному стандарту ISO 45001:2018',
      scope: 'Безопасные условия труда при производстве декоративной нержавеющей стали',
      requirements: [
        'Политика в области ОТ и ПБ',
        'Планирование действий по устранению рисков',
        'Внедрение и функционирование',
        'Оценка результатов и улучшение'
      ],
      benefits: [
        'Снижение рисков для здоровья и безопасности',
        'Соответствие требованиям законодательства',
        'Улучшение условий труда',
        'Снижение количества несчастных случаев'
      ],
      documentNumber: 'ISO-45001-2023-001',
      fileSize: '2.1 MB',
      format: 'PDF',
      downloadUrl: '/certificates/iso-45001-2018.pdf',
      icon: ShieldIcon,
      color: 'orange'
    },
    {
      id: 4,
      name: 'Сертификат качества продукции PVD покрытий',
      category: 'quality',
      type: 'Качество продукции',
      issuer: 'Российский центр испытаний и сертификации',
      issueDate: '2023-04-05',
      expiryDate: '2026-04-05',
      status: 'Действующий',
      description: 'Сертификат подтверждает соответствие PVD покрытий требованиям технических регламентов и стандартов',
      scope: 'PVD покрытия на нержавеющей стали для архитектурных и декоративных применений',
      requirements: [
        'Соответствие техническим регламентам',
        'Требования к физико-механическим свойствам',
        'Требования к химической стойкости',
        'Требования к декоративным свойствам'
      ],
      benefits: [
        'Гарантия качества PVD покрытий',
        'Соответствие российским стандартам',
        'Доверие клиентов к продукции',
        'Возможность участия в государственных тендерах'
      ],
      documentNumber: 'PVD-QUALITY-2023-001',
      fileSize: '3.2 MB',
      format: 'PDF',
      downloadUrl: '/certificates/pvd-quality-2023.pdf',
      icon: AwardIcon,
      color: 'purple'
    },
    {
      id: 5,
      name: 'Сертификат экологической безопасности',
      category: 'environmental',
      type: 'Экологическая безопасность',
      issuer: 'Федеральная служба по надзору в сфере природопользования',
      issueDate: '2023-05-12',
      expiryDate: '2026-05-12',
      status: 'Действующий',
      description: 'Сертификат подтверждает экологическую безопасность производственных процессов и продукции',
      scope: 'Производство декоративной нержавеющей стали с применением экологически безопасных технологий',
      requirements: [
        'Соответствие экологическим нормам',
        'Безопасность для окружающей среды',
        'Эффективное использование ресурсов',
        'Минимизация отходов'
      ],
      benefits: [
        'Подтверждение экологической ответственности',
        'Соответствие экологическим требованиям',
        'Улучшение экологической репутации',
        'Возможность работы с экологически сознательными клиентами'
      ],
      documentNumber: 'ECO-SAFETY-2023-001',
      fileSize: '2.7 MB',
      format: 'PDF',
      downloadUrl: '/certificates/eco-safety-2023.pdf',
      icon: GlobeIcon,
      color: 'green'
    },
    {
      id: 6,
      name: 'Сертификат пожарной безопасности',
      category: 'safety',
      type: 'Пожарная безопасность',
      issuer: 'Всероссийский научно-исследовательский институт противопожарной обороны',
      issueDate: '2023-06-18',
      expiryDate: '2026-06-18',
      status: 'Действующий',
      description: 'Сертификат подтверждает соответствие продукции требованиям пожарной безопасности',
      scope: 'Декоративная нержавеющая сталь для применения в строительстве и отделке',
      requirements: [
        'Соответствие требованиям пожарной безопасности',
        'Огнестойкость материалов',
        'Безопасность при пожаре',
        'Соответствие строительным нормам'
      ],
      benefits: [
        'Гарантия пожарной безопасности',
        'Соответствие строительным нормам',
        'Возможность применения в общественных зданиях',
        'Доверие архитекторов и проектировщиков'
      ],
      documentNumber: 'FIRE-SAFETY-2023-001',
      fileSize: '2.9 MB',
      format: 'PDF',
      downloadUrl: '/certificates/fire-safety-2023.pdf',
      icon: ShieldIcon,
      color: 'red'
    },
    {
      id: 7,
      name: 'Сертификат соответствия ГОСТ Р',
      category: 'quality',
      type: 'Национальные стандарты',
      issuer: 'Ростест',
      issueDate: '2023-07-22',
      expiryDate: '2026-07-22',
      status: 'Действующий',
      description: 'Сертификат подтверждает соответствие продукции национальным стандартам Российской Федерации',
      scope: 'Декоративная нержавеющая сталь для строительных и отделочных работ',
      requirements: [
        'Соответствие ГОСТ Р',
        'Требования к механическим свойствам',
        'Требования к химическому составу',
        'Требования к качеству поверхности'
      ],
      benefits: [
        'Соответствие российским стандартам',
        'Возможность применения в государственных проектах',
        'Доверие российских клиентов',
        'Соответствие техническим условиям'
      ],
      documentNumber: 'GOST-R-2023-001',
      fileSize: '2.5 MB',
      format: 'PDF',
      downloadUrl: '/certificates/gost-r-2023.pdf',
      icon: AwardIcon,
      color: 'blue'
    },
    {
      id: 8,
      name: 'Сертификат международного качества',
      category: 'quality',
      type: 'Международные стандарты',
      issuer: 'SGS Group',
      issueDate: '2023-08-30',
      expiryDate: '2026-08-30',
      status: 'Действующий',
      description: 'Сертификат подтверждает соответствие продукции международным стандартам качества',
      scope: 'Декоративная нержавеющая сталь для международных проектов',
      requirements: [
        'Соответствие международным стандартам',
        'Высокие требования к качеству',
        'Глобальные стандарты производства',
        'Международные нормы безопасности'
      ],
      benefits: [
        'Международное признание качества',
        'Возможность экспорта продукции',
        'Работа с международными клиентами',
        'Повышение конкурентоспособности'
      ],
      documentNumber: 'INT-QUALITY-2023-001',
      fileSize: '3.5 MB',
      format: 'PDF',
      downloadUrl: '/certificates/int-quality-2023.pdf',
      icon: AwardIcon,
      color: 'gold'
    }
  ];

  const filteredCertificates = certificates.filter(cert => {
    return selectedCategory === 'all' || cert.category === selectedCategory;
  });

  // Детальная страница сертификата
  if (selectedCertificate) {
    return (
      <div className="min-h-screen bg-white pt-32">
        {/* Back Button */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setSelectedCertificate(null)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Вернуться к сертификатам</span>
            </button>
          </div>
        </div>

        {/* Certificate Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Certificate Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${selectedCertificate.color}-600 to-${selectedCertificate.color}-800 rounded-2xl flex items-center justify-center`}>
                    <selectedCertificate.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900">{selectedCertificate.name}</h1>
                    <p className="text-xl text-gray-600">{selectedCertificate.type}</p>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FileCheck className="w-6 h-6 mr-2 text-blue-600" />
                    Детали сертификата
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-500">Выдающий орган:</span>
                      <div className="text-gray-700 font-medium">{selectedCertificate.issuer}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Номер документа:</span>
                      <div className="text-gray-700 font-medium">{selectedCertificate.documentNumber}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Дата выдачи:</span>
                      <div className="text-gray-700 font-medium">{selectedCertificate.issueDate}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Срок действия:</span>
                      <div className="text-gray-700 font-medium">{selectedCertificate.expiryDate}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Статус:</span>
                      <div className="text-gray-700 font-medium">{selectedCertificate.status}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Формат:</span>
                      <div className="text-gray-700 font-medium">{selectedCertificate.format}</div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-blue-600" />
                    Описание
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{selectedCertificate.description}</p>
                </div>

                {/* Scope */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Target className="w-6 h-6 mr-2 text-blue-600" />
                    Область применения
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{selectedCertificate.scope}</p>
                </div>
              </div>
            </motion.div>

            {/* Requirements and Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Requirements */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-blue-600" />
                  Требования стандарта
                </h3>
                <ul className="space-y-2">
                  {selectedCertificate.requirements.map((req: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Award className="w-6 h-6 mr-2 text-blue-600" />
                  Преимущества сертификации
                </h3>
                <ul className="space-y-2">
                  {selectedCertificate.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Download Section */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Download className="w-6 h-6 mr-2 text-blue-600" />
                  Скачать сертификат
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Размер файла:</span>
                    <span className="text-gray-700 font-medium">{selectedCertificate.fileSize}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Формат:</span>
                    <span className="text-gray-700 font-medium">{selectedCertificate.format}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Статус:</span>
                    <span className="text-green-600 font-medium">{selectedCertificate.status}</span>
                  </div>
                  <Button variant="primary" size="lg" fullWidth>
                    <Download className="w-5 h-5 mr-2" />
                    Скачать PDF
                  </Button>
                </div>
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
            Сертификаты качества
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto"
          >
            Документы, подтверждающие высокое качество продукции InoxMetalArt
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-blue-200 max-w-3xl mx-auto mt-4"
          >
            Международные стандарты, экологическая безопасность и соответствие требованиям
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

      {/* Certificates Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCertificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 cursor-pointer"
                  onClick={() => setSelectedCertificate(cert)}
                >
                  {/* Certificate Icon */}
                  <div className={`h-48 bg-gradient-to-br from-${cert.color}-100 to-${cert.color}-200 relative overflow-hidden`}>
                    <div className={`absolute inset-0 bg-gradient-to-br from-${cert.color}-600/20 to-transparent`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-24 h-24 bg-gradient-to-br from-${cert.color}-600 to-${cert.color}-800 rounded-full flex items-center justify-center`}>
                        <cert.icon className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Certificate Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                      {cert.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {cert.type}
                    </p>

                    {/* Certificate Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Building className="w-4 h-4" />
                        <span>{cert.issuer}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>До {cert.expiryDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FileText className="w-4 h-4" />
                        <span>{cert.documentNumber}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        cert.status === 'Действующий' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cert.status}
                      </span>
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
              {filteredCertificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                  onClick={() => setSelectedCertificate(cert)}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Certificate Icon */}
                    <div className={`md:w-48 h-48 bg-gradient-to-br from-${cert.color}-100 to-${cert.color}-200 relative overflow-hidden rounded-l-2xl`}>
                      <div className={`absolute inset-0 bg-gradient-to-br from-${cert.color}-600/20 to-transparent`}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-20 h-20 bg-gradient-to-br from-${cert.color}-600 to-${cert.color}-800 rounded-full flex items-center justify-center`}>
                          <cert.icon className="w-10 h-10 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Certificate Info */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                            {cert.name}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {cert.type}
                          </p>

                          {/* Certificate Details */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-sm">
                              <span className="text-gray-500">Выдающий орган:</span>
                              <div className="text-gray-700 font-medium">{cert.issuer}</div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Номер:</span>
                              <div className="text-gray-700 font-medium">{cert.documentNumber}</div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Выдан:</span>
                              <div className="text-gray-700 font-medium">{cert.issueDate}</div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-500">Действует до:</span>
                              <div className="text-gray-700 font-medium">{cert.expiryDate}</div>
                            </div>
                          </div>

                          {/* Status and Format */}
                          <div className="mb-4">
                            <div className="flex items-center space-x-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                cert.status === 'Действующий' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {cert.status}
                              </span>
                              <span className="text-sm text-gray-500">
                                Формат: {cert.format}
                              </span>
                              <span className="text-sm text-gray-500">
                                Размер: {cert.fileSize}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="md:ml-6 md:text-right">
                          <div className="flex flex-col space-y-2">
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Скачать
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
          {filteredCertificates.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Сертификаты не найдены
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
              Нужны дополнительные сертификаты?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Наши специалисты помогут получить необходимые сертификаты для вашего проекта. 
              Свяжитесь с нами для получения консультации.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Получить консультацию
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900">
                Запросить сертификацию
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Certificates;

