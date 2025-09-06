import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: 'default' | 'outlined' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  className?: string;
  animate?: boolean;
}

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'default',
  size = 'md',
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className,
  animate = false,
  ...props
}, ref) => {
  // Размеры
  const sizes = {
    sm: {
      button: 'px-2 py-1 text-sm',
      icon: 'w-4 h-4'
    },
    md: {
      button: 'px-3 py-2 text-sm',
      icon: 'w-4 h-4'
    },
    lg: {
      button: 'px-4 py-2 text-base',
      icon: 'w-5 h-5'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      button: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400',
      buttonActive: 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700',
      buttonDisabled: 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed',
      buttonHover: 'hover:bg-gray-50'
    },
    outlined: {
      button: 'bg-transparent text-gray-700 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400',
      buttonActive: 'bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50',
      buttonDisabled: 'bg-transparent text-gray-400 border-2 border-gray-200 cursor-not-allowed',
      buttonHover: 'hover:bg-gray-50'
    },
    minimal: {
      button: 'bg-transparent text-gray-700 border-none hover:bg-gray-100',
      buttonActive: 'bg-blue-100 text-blue-700 border-none hover:bg-blue-200',
      buttonDisabled: 'bg-transparent text-gray-400 border-none cursor-not-allowed',
      buttonHover: 'hover:bg-gray-100'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'flex items-center justify-center space-x-1',
    className
  );

  const buttonClasses = cn(
    'flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    currentSize.button,
    currentVariant.button
  );

  const activeButtonClasses = cn(
    buttonClasses,
    currentVariant.buttonActive
  );

  const disabledButtonClasses = cn(
    buttonClasses,
    currentVariant.buttonDisabled
  );

  // Генерация видимых страниц
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages: (number | string)[] = [];

    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderButton = (page: number | string, isActive = false, isDisabled = false) => {
    if (page === '...') {
      return (
        <motion.div
          key={`ellipsis-${Math.random()}`}
          className="flex items-center justify-center px-2 py-2 text-gray-500"
          initial={animate ? { opacity: 0, scale: 0.8 } : {}}
          animate={animate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.2 }}
        >
          <MoreHorizontal className={currentSize.icon} />
        </motion.div>
      );
    }

    const pageNum = page as number;
    const buttonClass = isActive 
      ? activeButtonClasses 
      : isDisabled 
        ? disabledButtonClasses 
        : buttonClasses;

    const button = (
      <button
        key={pageNum}
        className={buttonClass}
        onClick={() => handlePageChange(pageNum)}
        disabled={isDisabled}
        aria-label={`Перейти на страницу ${pageNum}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {pageNum}
      </button>
    );

    if (animate) {
      return (
        <motion.div
          key={pageNum}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {button}
        </motion.div>
      );
    }

    return button;
  };

  const renderNavigationButton = (
    icon: React.ReactNode,
    onClick: () => void,
    disabled: boolean,
    label: string,
    direction: 'left' | 'right'
  ) => {
    const buttonClass = disabled ? disabledButtonClasses : buttonClasses;

    const button = (
      <button
        className={buttonClass}
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
      >
        {direction === 'left' ? (
          <>
            {icon}
            <span className="hidden sm:inline">Предыдущая</span>
          </>
        ) : (
          <>
            <span className="hidden sm:inline">Следующая</span>
            {icon}
          </>
        )}
      </button>
    );

    if (animate) {
      return (
        <motion.div
          initial={{ opacity: 0, x: direction === 'left' ? 10 : -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          {button}
        </motion.div>
      );
    }

    return button;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return null;
  }

  if (animate) {
    return (
      <motion.nav
        ref={ref}
        className={baseClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Навигация по страницам"
        {...(props as any)}
      >
        {/* Кнопка "Первая страница" */}
        {showFirstLast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {renderButton(1, false, currentPage === 1)}
          </motion.div>
        )}

        {/* Кнопка "Предыдущая" */}
        {showPrevNext && (
          renderNavigationButton(
            <ChevronLeft className={currentSize.icon} />,
            () => handlePageChange(currentPage - 1),
            currentPage <= 1,
            'Перейти на предыдущую страницу',
            'left'
          )
        )}

        {/* Номера страниц */}
        {visiblePages.map((page, index) => (
          <motion.div
            key={`page-${page}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.2 + index * 0.05 }}
          >
            {renderButton(page, page === currentPage)}
          </motion.div>
        ))}

        {/* Кнопка "Следующая" */}
        {showPrevNext && (
          renderNavigationButton(
            <ChevronRight className={currentSize.icon} />,
            () => handlePageChange(currentPage + 1),
            currentPage >= totalPages,
            'Перейти на следующую страницу',
            'right'
          )
        )}

        {/* Кнопка "Последняя страница" */}
        {showFirstLast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.3 }}
          >
            {renderButton(totalPages, false, currentPage === totalPages)}
          </motion.div>
        )}
      </motion.nav>
    );
  }

  return (
    <nav
      ref={ref}
      className={baseClasses}
      aria-label="Навигация по страницам"
      {...props}
    >
      {/* Кнопка "Первая страница" */}
      {showFirstLast && (
        renderButton(1, false, currentPage === 1)
      )}

      {/* Кнопка "Предыдущая" */}
      {showPrevNext && (
        renderNavigationButton(
          <ChevronLeft className={currentSize.icon} />,
          () => handlePageChange(currentPage - 1),
          currentPage <= 1,
          'Перейти на предыдущую страницу',
          'left'
        )
      )}

      {/* Номера страниц */}
      {visiblePages.map((page, index) => (
        <div key={`page-${page}-${index}`}>
          {renderButton(page, page === currentPage)}
        </div>
      ))}

      {/* Кнопка "Следующая" */}
      {showPrevNext && (
        renderNavigationButton(
          <ChevronRight className={currentSize.icon} />,
          () => handlePageChange(currentPage + 1),
          currentPage >= totalPages,
          'Перейти на следующую страницу',
          'right'
        )
      )}

      {/* Кнопка "Последняя страница" */}
      {showFirstLast && (
        renderButton(totalPages, false, currentPage === totalPages)
      )}
    </nav>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
