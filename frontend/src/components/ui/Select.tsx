import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface SelectProps {
  label?: string;
  error?: string;
  helpText?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  variant?: 'default' | 'filled' | 'outlined' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  className?: string;
  animate?: boolean;
}

const Select = forwardRef<HTMLDivElement, SelectProps>(({
  label,
  error,
  helpText,
  options,
  value,
  onChange,
  placeholder = 'Выберите опцию',
  variant = 'default',
  size = 'md',
  fullWidth = false,
  disabled = false,
  required = false,
  searchable = false,
  multiple = false,
  clearable = false,
  className,
  animate = false,
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState<string[]>(multiple ? (value ? [value] : []) : []);
  const containerRef = useRef<HTMLDivElement>(null);

  // Обработка значения для множественного выбора
  useEffect(() => {
    if (multiple && value) {
      setSelectedValues(Array.isArray(value) ? value : [value]);
    }
  }, [value, multiple]);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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

  // Закрытие по Escape
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

  // Размеры
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  };

  // Варианты стилей
  const variants = {
    default: {
      container: 'border border-gray-300 bg-white',
      focus: 'border-blue-500 ring-2 ring-blue-500/20',
      error: 'border-red-300 ring-2 ring-red-500/20',
      disabled: 'bg-gray-50 border-gray-200'
    },
    filled: {
      container: 'border-0 bg-gray-100',
      focus: 'bg-white border border-blue-500 ring-2 ring-blue-500/20',
      error: 'bg-red-50 border border-red-300 ring-2 ring-red-500/20',
      disabled: 'bg-gray-50'
    },
    outlined: {
      container: 'border-2 border-gray-200 bg-transparent',
      focus: 'border-blue-500 ring-2 ring-blue-500/20',
      error: 'border-red-300 ring-2 ring-red-500/20',
      disabled: 'border-gray-200 bg-gray-50'
    },
    minimal: {
      container: 'border-b-2 border-gray-200 bg-transparent rounded-none',
      focus: 'border-blue-500',
      error: 'border-red-300',
      disabled: 'border-gray-200 bg-gray-50'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'relative transition-all duration-200 rounded-lg',
    fullWidth && 'w-full',
    className
  );

  const selectClasses = cn(
    'w-full flex items-center justify-between cursor-pointer transition-all duration-200',
    currentVariant.container,
    currentSize,
    isOpen && !error && currentVariant.focus,
    error && currentVariant.error,
    disabled && currentVariant.disabled,
    !disabled && 'hover:border-gray-400',
    'focus:outline-none'
  );

  // Фильтрация опций по поиску
  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Получение выбранных опций
  const getSelectedOptions = () => {
    if (multiple) {
      return options.filter(option => selectedValues.includes(option.value));
    }
    return options.filter(option => option.value === value);
  };

  const selectedOptions = getSelectedOptions();

  // Обработчики
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setSearchTerm('');
      }
    }
  };

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const newValues = selectedValues.includes(optionValue)
        ? selectedValues.filter(v => v !== optionValue)
        : [...selectedValues, optionValue];
      
      setSelectedValues(newValues);
      onChange?.(newValues as any);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    if (multiple) {
      setSelectedValues([]);
      onChange?.([] as any);
    } else {
      onChange?.('');
    }
  };

  const renderSelectedValue = () => {
    if (multiple) {
      if (selectedValues.length === 0) {
        return <span className="text-gray-400">{placeholder}</span>;
      }
      if (selectedValues.length === 1) {
        const option = options.find(opt => opt.value === selectedValues[0]);
        return <span className="text-gray-900">{option?.label}</span>;
      }
      return (
        <span className="text-gray-900">
          Выбрано {selectedValues.length} элементов
        </span>
      );
    }

    if (!value) {
      return <span className="text-gray-400">{placeholder}</span>;
    }

    const option = options.find(opt => opt.value === value);
    return <span className="text-gray-900">{option?.label}</span>;
  };

  const renderSelect = () => (
    <div className="relative" ref={containerRef}>
      <div
        className={selectClasses}
        onClick={handleToggle}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
      >
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          {renderSelectedValue()}
        </div>
        
        <div className="flex items-center space-x-2">
          {clearable && ((multiple && selectedValues.length > 0) || (!multiple && value)) && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              disabled={disabled}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          
          <ChevronDown
            className={cn(
              'w-4 h-4 text-gray-400 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {searchable && (
              <div className="p-2 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    autoFocus
                  />
                </div>
              </div>
            )}

            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">
                  Ничего не найдено
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = multiple
                    ? selectedValues.includes(option.value)
                    : option.value === value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleOptionClick(option.value)}
                      disabled={option.disabled}
                      className={cn(
                        'w-full px-4 py-2 text-left flex items-center space-x-2 transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:bg-gray-50',
                        isSelected && 'bg-blue-50 text-blue-700',
                        option.disabled && 'opacity-50 cursor-not-allowed'
                      )}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={option.disabled}
                    >
                      {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                      <span className="flex-1">{option.label}</span>
                      {isSelected && <Check className="w-4 h-4 flex-shrink-0" />}
                    </button>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <motion.label
            className="block text-sm font-medium text-gray-700 mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </motion.label>
        )}
        
        {renderSelect()}
        
        {error && (
          <motion.p
            className="mt-2 text-sm text-red-600"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            {error}
          </motion.p>
        )}
        
        {helpText && !error && (
          <motion.p
            className="mt-2 text-sm text-gray-500"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
          >
            {helpText}
          </motion.p>
        )}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses} ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {renderSelect()}
      
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="mt-2 text-sm text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
