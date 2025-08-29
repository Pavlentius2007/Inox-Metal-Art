import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Send, 
  ArrowRight,
  Building2,
  Award,
  FileText,
  Palette,
  Wrench,
  Star
} from 'lucide-react';
import Button from '../ui/Button';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Здесь можно добавить логику отправки email
      console.log('Email submitted:', email);
      setEmail('');
      alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    }
  };

  const footerSections = [
    {
      id: 'company',
      title: 'Компания',
      icon: Building2,
      links: [
        { label: 'О нас', path: '/about' },
        { label: 'Контакты', path: '/contacts' },
        { label: 'Наша команда', path: '/about' }
      ]
    },
    {
      id: 'products',
      title: 'Продукция',
      icon: Palette,
      links: [
        { label: 'Каталог продукции', path: '/products' },
        { label: 'ПВД покрытия', path: '/products' },
        { label: 'Художественные отделки', path: '/products' }
      ]
    },
    {
      id: 'services',
      title: 'Услуги',
      icon: Wrench,
      links: [
        { label: 'Технологии', path: '/technologies' },
        { label: 'Проекты', path: '/projects' },
        { label: 'Галерея работ', path: '/gallery' }
      ]
    },
    {
      id: 'resources',
      title: 'Документы',
      icon: FileText,
      links: [
        { label: 'Сертификаты', path: '/certificates' },
        { label: 'Техническая документация', path: '/certificates' },
        { label: 'Качество продукции', path: '/certificates' }
      ]
    }
  ];

  const contactInfo = {
    email: 'pavel@inoxmetalart.com',
    phone: '+7 953 862 8581',
    whatsapp: '+7 953 862 8581',
    telegram: '@Pavlentius2007',
    address: 'Россия, г. Москва',
    workingHours: 'Пн-Пт: 9:00-18:00 (МСК)'
  };

  const companyStats = [
    { label: '30+ лет', value: 'опыта', icon: Star },
    { label: '500+', value: 'проектов', icon: Award },
    { label: '25+', value: 'стран', icon: Building2 }
  ];

  const socialLinks = [
    { 
      label: 'WhatsApp', 
      href: `https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`,
      icon: MessageCircle 
    },
    { 
      label: 'Telegram', 
      href: `https://t.me/${contactInfo.telegram.replace('@', '')}`,
      icon: Send 
    },
    { 
      label: 'Email', 
      href: `mailto:${contactInfo.email}`,
      icon: Mail 
    }
  ];

  // Анимации для появления элементов
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 relative">
      {/* Декоративный элемент */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-transparent pointer-events-none"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            
            {/* Company Info */}
            <motion.div className="space-y-6 lg:space-y-8" variants={itemVariants}>
              {/* Logo */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">ИМ</span>
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    Инокс Металл Арт
                  </h3>
                  <p className="text-blue-600 font-medium text-sm lg:text-base">
                    Премиальная нержавеющая сталь
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6 lg:mb-8 max-w-lg text-sm lg:text-base font-medium">
                Ведущий поставщик высококачественной нержавеющей стали для промышленности, 
                строительства и дизайна. Специализируемся на ПВД покрытиях, нанопокрытиях 
                и художественных отделках.
              </p>

              {/* Company Stats */}
              <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                {companyStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    className="text-center p-3 lg:p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
                  >
                    <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-lg lg:text-xl font-bold text-gray-900 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs lg:text-sm text-gray-600 font-medium">
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  <Phone className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <a href={`tel:${contactInfo.phone}`} className="text-sm lg:text-base font-medium">
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  <Mail className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <a href={`mailto:${contactInfo.email}`} className="text-sm lg:text-base font-medium">
                    {contactInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm lg:text-base font-medium">{contactInfo.address}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-3 lg:space-y-4 pt-2">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation Grid */}
            <motion.div className="grid grid-cols-2 gap-6 lg:gap-8" variants={itemVariants}>
              {footerSections.map((section) => (
                <motion.div
                  key={section.id}
                  variants={itemVariants}
                  className="space-y-3 lg:space-y-4"
                >
                  {/* Section Header */}
                  <div className="flex items-center space-x-2 mb-3 lg:mb-4">
                    <section.icon className="w-5 h-5 text-blue-600" />
                    <h4 className="text-lg font-semibold text-gray-900">
                      {section.title}
                    </h4>
                  </div>

                  {/* Links */}
                  <ul className="space-y-2 lg:space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={`${section.id}-${linkIndex}`}>
                        <Link
                          to={link.path}
                          className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base flex items-center group font-medium"
                        >
                          <span>{link.label}</span>
                          <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 lg:p-8 text-center text-white shadow-xl"
          >
            <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">
              Получите консультацию специалиста
            </h3>
            <p className="mb-6 text-blue-100 text-sm lg:text-base">
              Оставьте заявку и мы свяжемся с вами для обсуждения вашего проекта
            </p>
            
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 lg:gap-4 max-w-md mx-auto">
              <input
                type="email"
                id="footer-email"
                name="footer-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш email"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 text-sm lg:text-base"
                aria-label="Email для консультации"
              />
              <Button
                type="submit"
                variant="secondary"
                size="md"
                className="whitespace-nowrap bg-white text-blue-600 hover:bg-blue-50"
                icon={<Send className="w-4 h-4" />}
              >
                Отправить
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
              
              {/* Copyright */}
              <div className="text-sm text-gray-600 font-medium">
                © {currentYear} Инокс Металл Арт. Все права защищены.
              </div>

              {/* Quick Links */}
              <div className="flex items-center space-x-4 lg:space-x-6">
                <Link 
                  to="/certificates" 
                  className="text-sm transition-colors duration-200 text-gray-600 hover:text-blue-600 flex items-center space-x-1 font-medium"
                >
                  <Award className="w-4 h-4" />
                  <span>Сертификаты</span>
                </Link>
                <Link 
                  to="/technologies" 
                  className="text-sm transition-colors duration-200 text-gray-600 hover:text-blue-600 flex items-center space-x-1 font-medium"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Технологии</span>
                </Link>
                <Link 
                  to="/contacts" 
                  className="text-sm transition-colors duration-200 text-gray-600 hover:text-blue-600 flex items-center space-x-1 font-medium"
                >
                  <Phone className="w-4 h-4" />
                  <span>Контакты</span>
                </Link>
              </div>

              {/* Back to Top */}
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 transition-colors duration-200 text-sm text-gray-600 hover:text-blue-600 bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-200 font-medium"
                aria-label="Вернуться наверх"
              >
                <span>Наверх</span>
                <ArrowRight className="w-4 h-4 rotate-[-90deg]" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
