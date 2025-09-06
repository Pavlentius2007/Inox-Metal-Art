import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';

interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
  separator?: React.ReactNode;
  className?: string;
  animate?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items = [],
  showHome = true,
  separator = <ChevronRight className="w-4 h-4 text-gray-400" />,
  className,
  animate = false,
}) => {
  const location = useLocation();

  // Автоматическое определение хлебных крошек на основе текущего маршрута
  const getAutoBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];
    
    let currentPath = '';
    
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      
      // Преобразуем сегмент в читаемый текст
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        label,
        path: currentPath
      });
    });
    
    return breadcrumbs;
  };

  // Используем переданные элементы или автоматически определяем
  const breadcrumbItems = items.length > 0 ? items : getAutoBreadcrumbs();

  // Анимации
  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const baseClasses = cn(
    'flex items-center space-x-2 text-sm font-medium text-gray-600',
    className
  );

  if (animate) {
    return (
      <motion.nav
        className={baseClasses}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        aria-label="Хлебные крошки"
      >
        {showHome && (
          <motion.div variants={itemVariants}>
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200"
              aria-label="Главная страница"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Главная</span>
            </Link>
          </motion.div>
        )}

        {breadcrumbItems.map((item, index) => (
          <motion.div key={item.path} className="flex items-center space-x-2" variants={itemVariants}>
            {index > 0 && <span className="text-gray-400">{separator}</span>}
            
            {index === breadcrumbItems.length - 1 ? (
              // Последний элемент (текущая страница)
              <span className="text-gray-900 font-semibold flex items-center space-x-1">
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </span>
            ) : (
              // Обычные ссылки
              <Link
                to={item.path}
                className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200"
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </Link>
            )}
          </motion.div>
        ))}
      </motion.nav>
    );
  }

  return (
    <nav className={baseClasses} aria-label="Хлебные крошки">
      {showHome && (
        <div>
          <Link
            to="/"
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200"
            aria-label="Главная страница"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Главная</span>
          </Link>
        </div>
      )}

      {breadcrumbItems.map((item, index) => (
        <div key={item.path} className="flex items-center space-x-2">
          {index > 0 && <span className="text-gray-400">{separator}</span>}
          
          {index === breadcrumbItems.length - 1 ? (
            // Последний элемент (текущая страница)
            <span className="text-gray-900 font-semibold flex items-center space-x-1">
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
            </span>
          ) : (
            // Обычные ссылки
            <Link
              to={item.path}
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200"
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
