import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрытие мобильного меню при изменении маршрута
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Главная' },
    { path: '/about', label: 'О компании' },
    { path: '/products', label: 'Продукция' },
    { path: '/gallery', label: 'Галерея' },
    { path: '/technologies', label: 'Технологии' },
    { path: '/projects', label: 'Проекты' },
    { path: '/certificates', label: 'Сертификаты' },
    { path: '/contacts', label: 'Контакты' }
  ];

  const isActive = (path: string) => location.pathname === path;

  // Динамические классы для адаптивного цвета
  const headerClasses = isScrolled 
    ? {
        // При прокрутке - белый фон, темный текст
        textMain: 'text-gray-900',
        textSecondary: 'text-gray-700',
        textHover: 'hover:text-blue-700',
        activeText: 'text-blue-700',
        bg: 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
      }
    : {
        // Вверху страницы - прозрачный фон, белый текст
        textMain: 'text-white',
        textSecondary: 'text-gray-200',
        textHover: 'hover:text-blue-200',
        activeText: 'text-blue-200',
        bg: 'bg-transparent'
      };

  // Анимации для мобильного меню
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClasses.bg}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/" className="flex items-center space-x-2" aria-label="Главная страница">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg lg:text-xl">ИМ</span>
              </div>
              <div className="hidden sm:block">
                <h1 className={`text-lg lg:text-xl font-bold ${headerClasses.textMain} whitespace-nowrap`}>
                  Инокс Металл Арт
                </h1>
                <p className={`text-xs lg:text-sm ${headerClasses.textSecondary} whitespace-nowrap font-medium`}>
                  Премиальная нержавеющая сталь
                </p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Основная навигация">
            {navItems.map((item) => (
              <motion.div key={item.path} whileHover={{ y: -2 }}>
                <Link
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap rounded-md ${
                    isActive(item.path)
                      ? `${headerClasses.activeText} bg-blue-50/10`
                      : `${headerClasses.textSecondary} ${headerClasses.textHover}`
                  }`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-800"
                      layoutId="activeTab"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link to="/application">
              <motion.button
                className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-sm lg:text-base hover:from-blue-800 hover:to-blue-900"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Оставить заявку"
              >
                Оставить заявку
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-lg transition-colors duration-200 ${headerClasses.textSecondary} ${headerClasses.textHover} hover:bg-white/10`}
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="lg:hidden bg-white border-t border-gray-100 shadow-lg"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            role="navigation"
            aria-label="Мобильная навигация"
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 whitespace-nowrap ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-700'
                  }`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Link to="/application" className="block">
                  <button className="w-full bg-gradient-to-r from-blue-700 to-blue-900 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-800 hover:to-blue-900 transition-all duration-200">
                    Оставить заявку
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

