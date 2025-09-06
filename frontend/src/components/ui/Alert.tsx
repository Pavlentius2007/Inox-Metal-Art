import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  Info, 
  XCircle, 
  X,
  AlertTriangle
} from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from './Button';

interface AlertProps {
  title?: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  dismissible?: boolean;
  onDismiss?: () => void;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  };
  className?: string;
  animate?: boolean;
}

const Alert: React.FC<AlertProps> = ({
  title,
  message,
  variant = 'info',
  size = 'md',
  dismissible = false,
  onDismiss,
  action,
  className,
  animate = false,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  // Варианты стилей
  const variants = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: 'text-blue-600',
      title: 'text-blue-900',
      message: 'text-blue-800'
    },
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: 'text-green-600',
      title: 'text-green-900',
      message: 'text-green-800'
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: 'text-yellow-600',
      title: 'text-yellow-900',
      message: 'text-yellow-800'
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: 'text-red-600',
      title: 'text-red-900',
      message: 'text-red-800'
    }
  };

  // Иконки
  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle
  };

  // Размеры
  const sizes = {
    sm: 'p-3 text-sm',
    md: 'p-4 text-base',
    lg: 'p-6 text-lg'
  };

  const currentVariant = variants[variant];
  const IconComponent = icons[variant];
  const currentSize = sizes[size];

  // Анимации
  const alertVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  const baseClasses = cn(
    'relative border rounded-lg',
    currentVariant.container,
    currentSize,
    className
  );

  if (animate) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={baseClasses}
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-start space-x-3">
              <IconComponent className={cn('w-5 h-5 flex-shrink-0 mt-0.5', currentVariant.icon)} />
              
              <div className="flex-1 min-w-0">
                {title && (
                  <h3 className={cn('font-semibold mb-1', currentVariant.title)}>
                    {title}
                  </h3>
                )}
                <p className={cn('leading-relaxed', currentVariant.message)}>
                  {message}
                </p>
                
                {action && (
                  <div className="mt-3">
                    <Button
                      variant={action.variant || 'outline'}
                      size="sm"
                      onClick={action.onClick}
                    >
                      {action.label}
                    </Button>
                  </div>
                )}
              </div>

              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className={cn(
                    'flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors duration-200',
                    currentVariant.icon
                  )}
                  aria-label="Закрыть уведомление"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (!isVisible) return null;

  return (
    <div className={baseClasses} role="alert" aria-live="polite">
      <div className="flex items-start space-x-3">
        <IconComponent className={cn('w-5 h-5 flex-shrink-0 mt-0.5', currentVariant.icon)} />
        
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={cn('font-semibold mb-1', currentVariant.title)}>
              {title}
            </h3>
          )}
          <p className={cn('leading-relaxed', currentVariant.message)}>
            {message}
          </p>
          
          {action && (
            <div className="mt-3">
              <Button
                variant={action.variant || 'outline'}
                size="sm"
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            </div>
          )}
        </div>

        {dismissible && (
          <button
            onClick={handleDismiss}
            className={cn(
              'flex-shrink-0 p-1 rounded-md hover:bg-black/5 transition-colors duration-200',
              currentVariant.icon
            )}
            aria-label="Закрыть уведомление"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
