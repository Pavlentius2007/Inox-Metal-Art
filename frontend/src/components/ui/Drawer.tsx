import React, { forwardRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  isOpen: boolean;
  onClose: () => void;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  title?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  overlay?: boolean;
  overlayClassName?: string;
  className?: string;
  animate?: boolean;
  children: React.ReactNode;
}

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(({
  isOpen,
  onClose,
  placement = 'right',
  size = 'md',
  title,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  overlay = true,
  overlayClassName,
  className,
  animate = false,
  children,
  ...props
}, ref) => {
  // Размеры
  const sizes = {
    sm: {
      left: 'w-64',
      right: 'w-64',
      top: 'h-64',
      bottom: 'h-64'
    },
    md: {
      left: 'w-80',
      right: 'w-80',
      top: 'h-80',
      bottom: 'h-80'
    },
    lg: {
      left: 'w-96',
      right: 'w-96',
      top: 'h-96',
      bottom: 'h-96'
    },
    xl: {
      left: 'w-[28rem]',
      right: 'w-[28rem]',
      top: 'h-[28rem]',
      bottom: 'h-[28rem]'
    },
    full: {
      left: 'w-full',
      right: 'w-full',
      top: 'h-full',
      bottom: 'h-full'
    }
  };

  // Позиционирование
  const getPlacementClasses = () => {
    const currentSize = sizes[size];
    
    switch (placement) {
      case 'left':
        return {
          container: cn(
            'fixed top-0 left-0 h-full z-50',
            currentSize.left
          ),
          animation: {
            initial: { x: '-100%' },
            animate: { x: 0 },
            exit: { x: '-100%' }
          }
        };
      case 'right':
        return {
          container: cn(
            'fixed top-0 right-0 h-full z-50',
            currentSize.right
          ),
          animation: {
            initial: { x: '100%' },
            animate: { x: 0 },
            exit: { x: '100%' }
          }
        };
      case 'top':
        return {
          container: cn(
            'fixed top-0 left-0 w-full z-50',
            currentSize.top
          ),
          animation: {
            initial: { y: '-100%' },
            animate: { y: 0 },
            exit: { y: '-100%' }
          }
        };
      case 'bottom':
        return {
          container: cn(
            'fixed bottom-0 left-0 w-full z-50',
            currentSize.bottom
          ),
          animation: {
            initial: { y: '100%' },
            animate: { y: 0 },
            exit: { y: '100%' }
          }
        };
      default:
        return {
          container: cn(
            'fixed top-0 right-0 h-full z-50',
            currentSize.right
          ),
          animation: {
            initial: { x: '100%' },
            animate: { x: 0 },
            exit: { x: '100%' }
          }
        };
    }
  };

  const baseClasses = cn(
    'bg-white shadow-2xl flex flex-col',
    className
  );

  const headerClasses = cn(
    'flex items-center justify-between px-6 py-4 border-b border-gray-200',
    placement === 'top' || placement === 'bottom' ? 'flex-row' : 'flex-col space-y-2'
  );

  const contentClasses = cn(
    'flex-1 overflow-auto p-6',
    placement === 'top' || placement === 'bottom' ? 'px-6 py-4' : 'px-6 py-4'
  );

  const closeButtonClasses = cn(
    'p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
  );

  // Обработчики событий
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (closeOnEscape && e.key === 'Escape') {
      onClose();
    }
  };

  // Блокировка прокрутки body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const placementConfig = getPlacementClasses();

  const renderHeader = () => {
    if (!title && !showCloseButton) return null;

    return (
      <div className={headerClasses}>
        {title && (
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        )}
        {showCloseButton && (
          <button
            onClick={onClose}
            className={closeButtonClasses}
            aria-label="Закрыть"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        )}
      </div>
    );
  };

  const renderContent = () => (
    <div className={contentClasses}>
      {children}
    </div>
  );

  const renderDrawer = () => (
    <div
      ref={ref}
      className={cn(
        placementConfig.container,
        baseClasses
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'drawer-title' : undefined}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {renderHeader()}
      {renderContent()}
    </div>
  );

  if (animate) {
    return (
      <>
        {/* Overlay */}
        <AnimatePresence>
          {isOpen && overlay && (
            <motion.div
              className={cn(
                'fixed inset-0 bg-black/50 z-40',
                overlayClassName
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleOverlayClick}
            />
          )}
        </AnimatePresence>

        {/* Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              {...placementConfig.animation}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              {renderDrawer()}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && overlay && (
        <div
          className={cn(
            'fixed inset-0 bg-black/50 z-40',
            overlayClassName
          )}
          onClick={handleOverlayClick}
        />
      )}

      {/* Drawer */}
      {isOpen && renderDrawer()}
    </>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;
