import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Send, 
  ArrowRight
} from 'lucide-react';
import Button from '../ui/Button';
import LegalModal from '../modals/LegalModal';
import { useLegalModal } from '../../hooks/useLegalModal';
import { legalDocuments } from '../../data/legalDocuments';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const { isOpen, currentDocument, openModal, closeModal } = useLegalModal();
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Здесь можно добавить логику отправки email
      console.log('Email submitted:', email);
      setEmail('');
      alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    }
  };



  const contactInfo = {
    email: 'pavel@inoxmetalart.com',
    phone: '+7 953 862 8581',
    whatsapp: '+7 953 862 8581',
    telegram: '@Pavlentius2007',
    office: {
      address: '61/271-272 Rama 9 Road, HuayKwang, Bangkok 10310 Thailand',
      mapLink: 'https://maps.app.goo.gl/NXYcgoUz6vAMFSN66?g_st=aw'
    },
    factory: {
      address: '7RQ3+783, Nong Chumphon, Khao Yoi District, Phetchaburi 76140, Таиланд',
      mapLink: 'https://maps.app.goo.gl/tXCwNfqSrTMATTvK8'
    },
    workingHours: 'Пн-Пт: 9:00-18:00 (МСК)'
  };



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
                  <span className="text-white font-bold text-2xl">IM</span>
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    INOX METAL ART
                  </h3>
                  <p className="text-blue-600 font-medium text-sm lg:text-base">
                    By HWA LIN Stainless Steel
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6 lg:mb-8 max-w-lg text-sm lg:text-base font-medium">
                Leading supplier of high-quality stainless steel for industry, 
                construction and design. Specializing in PVD coatings, nano-coatings 
                and artistic finishes. Part of HWA LIN Stainless Steel manufacturing group.
              </p>





              {/* Social Links */}
              <div className="flex items-center space-x-3 pt-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl flex-shrink-0"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-8 lg:gap-12">
              {/* Navigation Column */}
              <motion.div className="space-y-6" variants={itemVariants}>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Навигация</h4>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="/about"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium flex items-center group"
                    >
                      <span>О компании</span>
                      <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/products"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium flex items-center group"
                    >
                      <span>Каталог продукции</span>
                      <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/projects"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium flex items-center group"
                    >
                      <span>Проекты</span>
                      <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/materials"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium flex items-center group"
                    >
                      <span>Материалы</span>
                      <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faq"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium flex items-center group"
                    >
                      <span>FAQ</span>
                      <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contacts"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-base font-medium flex items-center group"
                    >
                      <span>Контакты</span>
                      <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </li>
                </ul>
              </motion.div>

              {/* Contacts Column */}
              <motion.div className="space-y-6" variants={itemVariants}>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Контакты</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700 font-medium">+7 953 862 8581</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-700 font-medium">pavel@inoxmetalart.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium">Офис в Таиланде: {contactInfo.office.address}</span>
                      <a 
                        href={contactInfo.office.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm transition-colors duration-200"
                      >
                        Посмотреть на карте
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <div className="flex flex-col">
                      <span className="text-gray-700 font-medium">Завод: {contactInfo.factory.address}</span>
                      <a 
                        href={contactInfo.factory.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm transition-colors duration-200"
                      >
                        Посмотреть на карте
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
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
            <div className="flex flex-col space-y-4">
              
              {/* Top Row - Navigation and Back to Top */}
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                {/* Quick Links */}
                <div className="flex items-center space-x-4 lg:space-x-6">
                  <Link 
                    to="/projects" 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-sm transition-colors duration-200 text-gray-600 hover:text-blue-600 font-medium"
                  >
                    Проекты
                  </Link>
                  <Link 
                    to="/materials" 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-sm transition-colors duration-200 text-gray-600 hover:text-blue-600 font-medium"
                  >
                    Материалы
                  </Link>
                  <Link 
                    to="/faq" 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-sm transition-colors duration-200 text-gray-600 hover:text-blue-600 font-medium"
                  >
                    FAQ
                  </Link>
                  <Link 
                    to="/contacts" 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-sm transition-colors duration-200 text-gray-600 hover:text-blue-600 font-medium"
                  >
                    Контакты
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

              {/* Bottom Row - Legal Links and Copyright */}
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 pt-4 border-t border-gray-200">
                {/* Copyright */}
                <div className="text-sm text-gray-600 font-medium">
                  © {currentYear} INOX METAL ART by HWA LIN Stainless Steel. All rights reserved.
                </div>

                {/* Legal Links */}
                <div className="flex items-center space-x-4 lg:space-x-6">
                  <button
                    onClick={() => openModal(legalDocuments.cookies.title, legalDocuments.cookies.content)}
                    className="text-sm transition-colors duration-200 text-gray-600 hover:text-blue-600 font-medium"
                  >
                    Cookies
                  </button>
                  <button
                    onClick={() => openModal(legalDocuments.privacy.title, legalDocuments.privacy.content)}
                    className="text-sm transition-colors duration-200 text-gray-600 hover:text-blue-600 font-medium"
                  >
                    Политика конфиденциальности
                  </button>
                  <button
                    onClick={() => openModal(legalDocuments.terms.title, legalDocuments.terms.content)}
                    className="text-sm transition-colors duration-200 text-gray-600 hover:text-blue-600 font-medium"
                  >
                    Пользовательское соглашение
                  </button>
                </div>

                {/* Developer Info */}
                <div className="text-sm text-gray-500">
                  Сайт создан <span className="font-medium text-gray-700">Sianoro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {currentDocument && (
        <LegalModal
          isOpen={isOpen}
          onClose={closeModal}
          title={currentDocument.title}
          content={currentDocument.content}
        />
      )}
    </footer>
  );
};

export default Footer;
