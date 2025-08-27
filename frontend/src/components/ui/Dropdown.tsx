import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DropdownItem {
  id: string;
  label: string;
  value?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect?: (item: DropdownItem) => void;
  variant?: 'default' | 'menu' | 'select';
  size?: 'sm' | 'md' | 'lg';
  placement?: 'bottom' | 'top' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  onSelect,
  variant = 'default',
  size = 'md',
  placement = 'bottom',
  align = 'start',
  width = 'auto',
  className,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled || item.divider) return;

    if (variant === 'select') {
      setSelectedItem(item);
    }

    if (onSelect) {
      onSelect(item);
    }

    if (variant !== 'menu') {
      setIsOpen(false);
    }
  };

  // Размеры
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  // Ширины
  const widths = {
    auto: 'w-auto',
    sm: 'w-48',
    md: 'w-56',
    lg: 'w-64',
    xl: 'w-80'
  };

  // Позиционирование
  const getPlacementClasses = () => {
    const base = 'absolute z-50';
    
    switch (placement) {
      case 'top':
        return `${base} bottom-full mb-2`;
      case 'bottom':
        return `${base} top-full mt-2`;
      case 'left':
        return `${base} right-full mr-2`;
      case 'right':
        return `${base} left-full ml-2`;
      default:
        return `${base} top-full mt-2`;
    }
  };

  const getAlignClasses = () => {
    switch (align) {
      case 'start':
        return 'left-0';
      case 'center':
        return 'left-1/2 transform -translate-x-1/2';
      case 'end':
        return 'right-0';
      default:
        return 'left-0';
    }
  };

  // Анимации
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: placement === 'top' ? 10 : -10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      y: placement === 'top' ? 10 : -10,
      transition: {
        duration: 0.15
      }
    }
  };

  const baseClasses = cn(
    'relative inline-block',
    className
  );

  const dropdownClasses = cn(
    'bg-white border border-gray-200 rounded-lg shadow-lg py-1',
    sizes[size],
    widths[width],
    getPlacementClasses(),
    getAlignClasses()
  );

  if (disabled) {
    return (
      <div className={cn(baseClasses, 'opacity-50 cursor-not-allowed')}>
        {trigger}
      </div>
    );
  }

  return (
    <div className={baseClasses} ref={dropdownRef}>
      <div
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={dropdownClasses}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="menu"
            aria-orientation="vertical"
          >
            {items.map((item, index) => {
              if (item.divider) {
                return (
                  <div
                    key={`divider-${index}`}
                    className="border-t border-gray-200 my-1"
                    role="separator"
                  />
                );
              }

              const isSelected = selectedItem?.id === item.id;
              const isDisabled = item.disabled;

              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  disabled={isDisabled}
                  className={cn(
                    'w-full px-4 py-2 text-left flex items-center space-x-3 transition-colors duration-200 focus:outline-none focus:bg-gray-50 focus:text-gray-900',
                    isSelected && 'bg-blue-50 text-blue-700',
                    !isSelected && !isDisabled && 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
                    isDisabled && 'text-gray-400 cursor-not-allowed',
                    variant === 'select' && 'justify-between'
                  )}
                  role="menuitem"
                  aria-disabled={isDisabled}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    {item.icon && (
                      <span className="flex-shrink-0">{item.icon}</span>
                    )}
                    <span className="truncate">{item.label}</span>
                  </div>
                  
                  {variant === 'select' && isSelected && (
                    <Check className="w-4 h-4 flex-shrink-0 text-blue-600" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
