import React, { forwardRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, XCircle, Bell } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NotificationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id?: string | number;
  title?: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info' | 'default';
  variant?: 'default' | 'minimal' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  duration?: number;
  dismissible?: boolean;
  showIcon?: boolean;
  showProgress?: boolean;
  onClose?: () => void;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
  animate?: boolean;
  autoClose?: boolean;
}

const Notification = forwardRef<HTMLDivElement, NotificationProps>(({
  id,
  title,
  message,
  type = 'default',
  variant = 'default',
  size = 'md',
  duration = 5000,
  dismissible = true,
  showIcon = true,
  showProgress = false,
  onClose,
  onAction,
  actionLabel,
  className,
  animate = false,
  autoClose = true,
  ...props
}, ref) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  // Размеры
  const sizes = {
    sm: {
      container: 'p-3',
      title: 'text-sm',
      message: 'text-xs',
      icon: 'w-4 h-4',
      closeButton: 'w-5 h-5'
    },
    md: {
      container: 'p-4',
      title: 'text-base',
      message: 'text-sm',
      icon: 'w-5 h-5',
      closeButton: 'w-6 h-6'
    },
    lg: {
      container: 'p-5',
      title: 'text-lg',
      message: 'text-base',
      icon: 'w-6 h-6',
      closeButton: 'w-7 h-7'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      success: 'bg-green-50 border-green-200 text-green-800',
      error: 'bg-red-50 border-red-200 text-red-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      default: 'bg-gray-50 border-gray-200 text-gray-800'
    },
    minimal: {
      success: 'bg-green-500 text-white',
      error: 'bg-red-500 text-white',
      warning: 'bg-yellow-500 text-white',
      info: 'bg-blue-500 text-white',
      default: 'bg-gray-500 text-white'
    },
    bordered: {
      success: 'bg-white border-2 border-green-500 text-green-700',
      error: 'bg-white border-2 border-red-500 text-red-700',
      warning: 'bg-white border-2 border-yellow-500 text-yellow-700',
      info: 'bg-white border-2 border-blue-500 text-blue-700',
      default: 'bg-white border-2 border-gray-500 text-gray-700'
    }
  };

  // Иконки
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
    default: Bell
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];
  const IconComponent = icons[type];

  const baseClasses = cn(
    'relative overflow-hidden rounded-lg border shadow-lg transition-all duration-200',
    currentSize.container,
    currentVariant[type],
    'hover:shadow-xl',
    className
  );

  const iconClasses = cn(
    'flex-shrink-0',
    currentSize.icon
  );

  const titleClasses = cn(
    'font-semibold leading-tight',
    currentSize.title
  );

  const messageClasses = cn(
    'leading-relaxed',
    currentSize.message
  );

  const closeButtonClasses = cn(
    'flex-shrink-0 p-1 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    variant === 'minimal' 
      ? 'hover:bg-white/20 focus:ring-white/50' 
      : 'hover:bg-black/5 focus:ring-black/20',
    currentSize.closeButton
  );

  const actionButtonClasses = cn(
    'px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    variant === 'minimal'
      ? 'bg-white/20 text-white hover:bg-white/30 focus:ring-white/50'
      : variant === 'bordered'
        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500'
        : 'bg-black/10 text-current hover:bg-black/20 focus:ring-black/30'
  );

  const progressBarClasses = cn(
    'absolute bottom-0 left-0 h-1 transition-all duration-100 ease-linear',
    type === 'success' ? 'bg-green-500' :
    type === 'error' ? 'bg-red-500' :
    type === 'warning' ? 'bg-yellow-500' :
    type === 'info' ? 'bg-blue-500' :
    'bg-gray-500'
  );

  // Автозакрытие
  useEffect(() => {
    if (!autoClose || !isVisible) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      if (!isPaused) {
        const now = Date.now();
        const remaining = Math.max(0, endTime - now);
        const newProgress = (remaining / duration) * 100;
        setProgress(newProgress);

        if (remaining <= 0) {
          handleClose();
        }
      }
    };

    const interval = setInterval(updateProgress, 10);
    return () => clearInterval(interval);
  }, [autoClose, duration, isVisible, isPaused]);

  // Обработчики событий
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const handleMouseEnter = () => {
    if (autoClose) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (autoClose) {
      setIsPaused(false);
    }
  };

  const handleAction = () => {
    onAction?.();
    if (actionLabel) {
      handleClose();
    }
  };

  const renderIcon = () => {
    if (!showIcon) return null;

    return (
      <IconComponent className={iconClasses} />
    );
  };

  const renderContent = () => (
    <div className="flex-1 min-w-0">
      {title && (
        <h3 className={titleClasses}>{title}</h3>
      )}
      <p className={cn(
        messageClasses,
        title && 'mt-1'
      )}>
        {message}
      </p>
    </div>
  );

  const renderAction = () => {
    if (!actionLabel || !onAction) return null;

    return (
      <button
        onClick={handleAction}
        className={actionButtonClasses}
      >
        {actionLabel}
      </button>
    );
  };

  const renderCloseButton = () => {
    if (!dismissible) return null;

    return (
      <button
        onClick={handleClose}
        className={closeButtonClasses}
        aria-label="Закрыть уведомление"
      >
        <X className="w-full h-full" />
      </button>
    );
  };

  const renderProgressBar = () => {
    if (!showProgress || !autoClose) return null;

    return (
      <div
        className={progressBarClasses}
        style={{ width: `${progress}%` }}
      />
    );
  };

  const renderNotification = () => (
    <div
      ref={ref}
      className={baseClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
      aria-live="polite"
      {...props}
    >
      <div className="flex items-start space-x-3">
        {renderIcon()}
        {renderContent()}
        <div className="flex items-center space-x-2">
          {renderAction()}
          {renderCloseButton()}
        </div>
      </div>
      {renderProgressBar()}
    </div>
  );

  if (animate) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            layout
          >
            {renderNotification()}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  if (!isVisible) return null;

  return renderNotification();
});

Notification.displayName = 'Notification';

export default Notification;
