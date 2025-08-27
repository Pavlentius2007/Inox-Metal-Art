import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, Circle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MenuItem {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  onClick?: () => void;
  children?: MenuItem[];
  checked?: boolean;
  radio?: boolean;
  group?: string;
}

interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: MenuItem[];
  trigger: React.ReactNode;
  variant?: 'default' | 'minimal' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  placement?: 'bottom' | 'top' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
  closeOnClick?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(({
  items,
  trigger,
  variant = 'default',
  size = 'md',
  placement = 'bottom',
  align = 'start',
  width = 'auto',
  className,
  animate = false,
  closeOnClick = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  onOpenChange,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [radioGroups, setRadioGroups] = useState<Map<string, string>>(new Map());
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Размеры
  const sizes = {
    sm: {
      item: 'px-2 py-1.5 text-sm',
      icon: 'w-4 h-4',
      submenuIcon: 'w-3 h-3'
    },
    md: {
      item: 'px-3 py-2 text-sm',
      icon: 'w-4 h-4',
      submenuIcon: 'w-4 h-4'
    },
    lg: {
      item: 'px-4 py-2.5 text-base',
      icon: 'w-5 h-5',
      submenuIcon: 'w-4 h-4'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      container: 'bg-white border border-gray-200 rounded-lg shadow-lg',
      item: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900',
      itemDisabled: 'text-gray-400 cursor-not-allowed hover:bg-transparent',
      itemActive: 'bg-blue-50 text-blue-700',
      divider: 'border-t border-gray-200 my-1',
      submenu: 'bg-white border border-gray-200 rounded-lg shadow-lg'
    },
    minimal: {
      container: 'bg-gray-900 text-white rounded-md shadow-xl',
      item: 'text-gray-300 hover:bg-gray-800 hover:text-white',
      itemDisabled: 'text-gray-600 cursor-not-allowed hover:bg-transparent',
      itemActive: 'bg-gray-700 text-white',
      divider: 'border-t border-gray-700 my-1',
      submenu: 'bg-gray-900 text-white rounded-md shadow-xl'
    },
    cards: {
      container: 'bg-white rounded-xl shadow-2xl border-0',
      item: 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-lg mx-1',
      itemDisabled: 'text-gray-400 cursor-not-allowed hover:bg-transparent',
      itemActive: 'bg-blue-50 text-blue-700',
      divider: 'border-t border-gray-100 my-1 mx-1',
      submenu: 'bg-white rounded-xl shadow-2xl border-0'
    }
  };

  // Ширины
  const widths = {
    auto: 'w-auto',
    sm: 'w-48',
    md: 'w-56',
    lg: 'w-64',
    xl: 'w-80'
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];
  const currentWidth = widths[width];

  const baseClasses = cn(
    'relative inline-block',
    className
  );

  const menuContainerClasses = cn(
    'absolute z-50 min-w-max',
    currentWidth,
    currentVariant.container,
    'py-1'
  );

  const getPlacementClasses = () => {
    const basePlacement = 'absolute z-50';
    
    switch (placement) {
      case 'top':
        return cn(basePlacement, 'bottom-full mb-2');
      case 'bottom':
        return cn(basePlacement, 'top-full mt-2');
      case 'left':
        return cn(basePlacement, 'right-full mr-2');
      case 'right':
        return cn(basePlacement, 'left-full ml-2');
      default:
        return cn(basePlacement, 'top-full mt-2');
    }
  };

  const getAlignClasses = () => {
    switch (align) {
      case 'center':
        return 'left-1/2 -translate-x-1/2';
      case 'end':
        return 'right-0';
      default:
        return 'left-0';
    }
  };

  const itemClasses = cn(
    'flex items-center justify-between w-full text-left transition-colors duration-150',
    currentSize.item,
    currentVariant.item
  );

  const disabledItemClasses = cn(
    itemClasses,
    currentVariant.itemDisabled
  );

  const activeItemClasses = cn(
    itemClasses,
    currentVariant.itemActive
  );

  // Обработчики событий
  const handleToggle = useCallback(() => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onOpenChange?.(newIsOpen);
    
    if (!newIsOpen) {
      setActiveSubmenu(null);
    }
  }, [isOpen, onOpenChange]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
    onOpenChange?.(false);
  }, [onOpenChange]);

  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.disabled) return;

    if (item.children) {
      setActiveSubmenu(activeSubmenu === item.id.toString() ? null : item.id.toString());
      return;
    }

    if (item.radio && item.group) {
      setRadioGroups(prev => new Map(prev).set(item.group!, item.id.toString()));
    } else if (item.checked !== undefined) {
      setSelectedItems(prev => {
        const newSet = new Set(prev);
        if (newSet.has(item.id.toString())) {
          newSet.delete(item.id.toString());
        } else {
          newSet.add(item.id.toString());
        }
        return newSet;
      });
    }

    item.onClick?.();

    if (closeOnClick) {
      handleClose();
    }
  }, [activeSubmenu, closeOnClick, handleClose]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        if (closeOnEscape) {
          e.preventDefault();
          handleClose();
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        break;
    }
  }, [closeOnEscape, handleClose]);

  // Закрытие при клике вне меню
  useEffect(() => {
    if (!closeOnOutsideClick || !isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeOnOutsideClick, isOpen, handleClose]);

  // Закрытие при нажатии Escape
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closeOnEscape, isOpen, handleClose]);

  const renderMenuItem = (item: MenuItem, level = 0) => {
    if (item.divider) {
      return (
        <div key={`divider-${item.id}`} className={currentVariant.divider} />
      );
    }

    const isActive = activeSubmenu === item.id.toString();
    const isSelected = selectedItems.has(item.id.toString());
    const isRadioSelected = item.radio && item.group && radioGroups.get(item.group) === item.id.toString();
    const hasChildren = item.children && item.children.length > 0;

    const itemContent = (
      <div
        className={cn(
          item.disabled ? disabledItemClasses : isActive ? activeItemClasses : itemClasses,
          level > 0 && 'pl-8'
        )}
        onClick={() => handleItemClick(item)}
        role="menuitem"
        tabIndex={item.disabled ? -1 : 0}
        aria-disabled={item.disabled}
        aria-expanded={hasChildren ? isActive : undefined}
        aria-checked={item.radio ? isRadioSelected : item.checked !== undefined ? isSelected : undefined}
      >
        <div className="flex items-center space-x-2">
          {item.icon && (
            <span className="flex-shrink-0">
              {item.icon}
            </span>
          )}
          
          {item.radio && (
            <Circle className={cn(
              'flex-shrink-0',
              currentSize.icon,
              isRadioSelected ? 'fill-current text-blue-600' : 'text-gray-400'
            )} />
          )}
          
          {item.checked !== undefined && (
            <Check className={cn(
              'flex-shrink-0',
              currentSize.icon,
              isSelected ? 'text-blue-600' : 'text-transparent'
            )} />
          )}
          
          <span className="flex-1">{item.label}</span>
          
          {hasChildren && (
            <ChevronRight className={cn(
              'flex-shrink-0 transition-transform duration-150',
              currentSize.submenuIcon,
              isActive ? 'rotate-90' : ''
            )} />
          )}
        </div>
      </div>
    );

    if (animate) {
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.2, 
            delay: level * 0.05,
            type: "spring",
            stiffness: 200
          }}
        >
          {itemContent}
        </motion.div>
      );
    }

    return (
      <div key={item.id}>
        {itemContent}
      </div>
    );
  };

  const renderSubmenu = (item: MenuItem) => {
    if (!item.children || !activeSubmenu) return null;

    const submenuPlacement = placement === 'right' ? 'left' : 'right';
    const submenuAlign = align === 'center' ? 'start' : align;

    return (
      <div
        className={cn(
          'absolute z-50 min-w-max',
          currentWidth,
          currentVariant.submenu,
          'py-1',
          submenuPlacement === 'right' ? 'left-full ml-1' : 'right-full mr-1',
          submenuAlign === 'center' ? 'top-1/2 -translate-y-1/2' : 
          submenuAlign === 'end' ? 'bottom-0' : 'top-0'
        )}
      >
        {item.children.map(child => renderMenuItem(child, 1))}
      </div>
    );
  };

  const renderMenu = () => (
    <div
      ref={menuRef}
      className={cn(
        menuContainerClasses,
        getPlacementClasses(),
        getAlignClasses()
      )}
      role="menu"
      onKeyDown={handleKeyDown}
    >
      {items.map(item => (
        <div key={item.id} className="relative">
          {renderMenuItem(item)}
          {item.children && renderSubmenu(item)}
        </div>
      ))}
    </div>
  );

  if (animate) {
    return (
      <div ref={ref} className={baseClasses} {...props}>
        <div ref={triggerRef} onClick={handleToggle}>
          {trigger}
        </div>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ 
                duration: 0.2,
                type: "spring",
                stiffness: 200
              }}
            >
              {renderMenu()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div ref={ref} className={baseClasses} {...props}>
      <div ref={triggerRef} onClick={handleToggle}>
        {trigger}
      </div>
      
      {isOpen && renderMenu()}
    </div>
  );
});

Menu.displayName = 'Menu';

export default Menu;
