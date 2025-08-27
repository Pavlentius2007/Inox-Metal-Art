import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TimelineItem {
  id: string | number;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming' | 'error';
  variant?: 'default' | 'minimal' | 'cards';
}

interface TimelineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: TimelineItem[];
  variant?: 'default' | 'minimal' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'vertical' | 'horizontal';
  showConnectors?: boolean;
  className?: string;
  animate?: boolean;
  onItemClick?: (item: TimelineItem) => void;
}

const Timeline = forwardRef<HTMLDivElement, TimelineProps>(({
  items,
  variant = 'default',
  size = 'md',
  orientation = 'vertical',
  showConnectors = true,
  className,
  animate = false,
  onItemClick,
  ...props
}, ref) => {
  // Размеры
  const sizes = {
    sm: {
      container: 'space-y-3',
      item: 'text-sm',
      icon: 'w-4 h-4',
      connector: orientation === 'vertical' ? 'w-px h-8' : 'h-px w-8'
    },
    md: {
      container: 'space-y-4',
      item: 'text-base',
      icon: 'w-5 h-5',
      connector: orientation === 'vertical' ? 'w-px h-12' : 'h-px w-12'
    },
    lg: {
      container: 'space-y-6',
      item: 'text-lg',
      icon: 'w-6 h-6',
      connector: orientation === 'vertical' ? 'w-px h-16' : 'h-px w-16'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      container: 'relative',
      item: 'flex items-start space-x-4',
      icon: 'flex-shrink-0 rounded-full p-2 shadow-sm',
      iconCompleted: 'bg-green-100 text-green-600',
      iconCurrent: 'bg-blue-100 text-blue-600',
      iconUpcoming: 'bg-gray-100 text-gray-400',
      iconError: 'bg-red-100 text-red-600',
      content: 'flex-1 min-w-0',
      title: 'font-medium text-gray-900',
      description: 'text-gray-600',
      date: 'text-sm text-gray-500',
      connector: 'bg-gray-200'
    },
    minimal: {
      container: 'relative',
      item: 'flex items-center space-x-3',
      icon: 'flex-shrink-0 rounded-full p-1',
      iconCompleted: 'bg-green-500',
      iconCurrent: 'bg-blue-500',
      iconUpcoming: 'bg-gray-300',
      iconError: 'bg-red-500',
      content: 'flex-1 min-w-0',
      title: 'font-medium text-gray-700',
      description: 'text-gray-500',
      date: 'text-xs text-gray-400',
      connector: 'bg-gray-200'
    },
    cards: {
      container: 'relative',
      item: 'relative',
      icon: 'absolute top-4 left-4 flex-shrink-0 rounded-full p-2 shadow-sm',
      iconCompleted: 'bg-green-100 text-green-600',
      iconCurrent: 'bg-blue-100 text-blue-600',
      iconUpcoming: 'bg-gray-100 text-gray-400',
      iconError: 'bg-red-100 text-red-600',
      content: 'bg-white rounded-lg border border-gray-200 p-4 pl-12 shadow-sm hover:shadow-md transition-shadow',
      title: 'font-semibold text-gray-900',
      description: 'text-gray-600 mt-1',
      date: 'text-sm text-gray-500 mt-2',
      connector: 'bg-gray-200'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    currentVariant.container,
    orientation === 'vertical' ? currentSize.container : 'flex space-x-4',
    className
  );

  const itemClasses = cn(
    currentVariant.item,
    orientation === 'horizontal' && 'flex-col items-center text-center'
  );

  const getIconClasses = (status: TimelineItem['status']) => {
    const baseIconClasses = cn(
      'flex items-center justify-center',
      currentSize.icon,
      currentVariant.icon
    );

    switch (status) {
      case 'completed':
        return cn(baseIconClasses, currentVariant.iconCompleted);
      case 'current':
        return cn(baseIconClasses, currentVariant.iconCurrent);
      case 'error':
        return cn(baseIconClasses, currentVariant.iconError);
      default:
        return cn(baseIconClasses, currentVariant.iconUpcoming);
    }
  };

  const getConnectorClasses = () => cn(
    'flex-shrink-0',
    currentVariant.connector,
    currentSize.connector
  );

  const renderConnector = (index: number, isLast: boolean) => {
    if (!showConnectors || isLast) return null;

    if (orientation === 'vertical') {
      return (
        <div className="absolute left-5 top-8 z-0">
          <div className={getConnectorClasses()} />
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center">
        <div className={getConnectorClasses()} />
      </div>
    );
  };

  const renderItem = (item: TimelineItem, index: number) => {
    const isLast = index === items.length - 1;
    const isClickable = !!onItemClick;

    const itemContent = (
      <div className={itemClasses}>
        {/* Иконка */}
        <div className={getIconClasses(item.status)}>
          {item.icon || (
            <div className="w-full h-full rounded-full bg-current" />
          )}
        </div>

        {/* Контент */}
        <div className={currentVariant.content}>
          <h3 className={currentVariant.title}>{item.title}</h3>
          {item.description && (
            <p className={currentVariant.description}>{item.description}</p>
          )}
          {item.date && (
            <time className={currentVariant.date}>{item.date}</time>
          )}
        </div>

        {/* Коннектор */}
        {renderConnector(index, isLast)}
      </div>
    );

    if (isClickable) {
      return (
        <button
          key={item.id}
          className="w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
          onClick={() => onItemClick(item)}
          aria-label={`Подробнее о ${item.title}`}
        >
          {itemContent}
        </button>
      );
    }

    return (
      <div key={item.id}>
        {itemContent}
      </div>
    );
  };

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: orientation === 'vertical' ? 0 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 100
            }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={baseClasses} {...props}>
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
});

Timeline.displayName = 'Timeline';

export default Timeline;
