import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
  group?: string;
}

interface MultiSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  options: Option[];
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (value: (string | number)[]) => void;
  placeholder?: string;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  showSelectedCount?: boolean;
  maxDisplayItems?: number;
  maxItems?: number;
  className?: string;
  animate?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  onSearch?: (query: string) => void;
}

const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(({
  options,
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = 'Выберите элементы...',
  variant = 'default',
  size = 'md',
  disabled = false,
  readOnly = false,
  clearable = true,
  searchable = true,
  showSelectedCount = true,
  maxDisplayItems = 3,
  maxItems,
  className,
  animate = false,
  onOpenChange,
  onSearch,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(controlledValue || defaultValue);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Размеры
  const sizes = {
    sm: {
      container: 'h-8',
      input: 'text-sm px-2',
      icon: 'w-4 h-4',
      button: 'p-1',
      tag: 'px-2 py-0.5 text-xs',
      dropdown: 'mt-1'
    },
    md: {
      container: 'min-h-10',
      input: 'text-sm px-3',
      icon: 'w-4 h-4',
      button: 'p-1.5',
      tag: 'px-2 py-1 text-xs',
      dropdown: 'mt-1'
    },
    lg: {
      container: 'min-h-12',
      input: 'text-base px-4',
      icon: 'w-5 h-5',
      button: 'p-2',
      tag: 'px-3 py-1.5 text-sm',
      dropdown: 'mt-2'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      container: 'bg-white border border-gray-300 rounded-md shadow-sm',
      containerFocus: 'border-blue-500 ring-1 ring-blue-500',
      containerDisabled: 'bg-gray-50 border-gray-200',
      input: 'text-gray-900 placeholder-gray-500',
      inputDisabled: 'text-gray-500 cursor-not-allowed',
      icon: 'text-gray-400',
      button: 'text-gray-400 hover:text-gray-600',
      dropdown: 'bg-white border border-gray-200 shadow-lg',
      tag: 'bg-blue-100 text-blue-800 border-blue-200',
      tagRemove: 'text-blue-600 hover:bg-blue-200'
    },
    outlined: {
      container: 'bg-transparent border-2 border-gray-300 rounded-lg',
      containerFocus: 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20',
      containerDisabled: 'border-gray-200 bg-gray-50',
      input: 'text-gray-700 placeholder-gray-500',
      inputDisabled: 'text-gray-400 cursor-not-allowed',
      icon: 'text-gray-500',
      button: 'text-gray-500 hover:text-gray-700',
      dropdown: 'bg-white border-2 border-gray-200 shadow-lg',
      tag: 'bg-blue-50 text-blue-700 border-blue-300',
      tagRemove: 'text-blue-600 hover:bg-blue-100'
    },
    filled: {
      container: 'bg-gray-100 border border-transparent rounded-lg',
      containerFocus: 'bg-white border-blue-500 ring-1 ring-blue-500',
      containerDisabled: 'bg-gray-50',
      input: 'text-gray-900 placeholder-gray-600',
      inputDisabled: 'text-gray-400 cursor-not-allowed',
      icon: 'text-gray-500',
      button: 'text-gray-500 hover:text-gray-700',
      dropdown: 'bg-white border border-gray-200 shadow-lg',
      tag: 'bg-blue-100 text-blue-800 border-blue-200',
      tagRemove: 'text-blue-600 hover:bg-blue-200'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'relative inline-block w-full',
    className
  );

  const containerClasses = cn(
    'flex flex-wrap items-center w-full transition-all duration-200',
    currentSize.container,
    currentVariant.container,
    isOpen && currentVariant.containerFocus,
    disabled && currentVariant.containerDisabled,
    className
  );

  const inputClasses = cn(
    'flex-1 bg-transparent border-none outline-none placeholder-gray-500 transition-colors duration-200 min-w-0',
    currentSize.input,
    currentVariant.input,
    disabled && currentVariant.inputDisabled
  );


  const buttonClasses = cn(
    'flex-shrink-0 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    currentSize.button,
    currentVariant.button
  );

  const dropdownClasses = cn(
    'absolute top-full left-0 right-0 z-50 rounded-lg',
    currentSize.dropdown,
    currentVariant.dropdown
  );

  const tagClasses = cn(
    'inline-flex items-center space-x-1 rounded-full border transition-colors duration-200',
    currentSize.tag,
    currentVariant.tag
  );

  const tagRemoveClasses = cn(
    'rounded-full p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    currentVariant.tagRemove
  );

  // Обновление значения
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedValues(controlledValue);
    }
  }, [controlledValue]);

  // Фильтрация опций по поиску
  const filteredOptions = useCallback(() => {
    if (!searchQuery) return options;
    
    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  // Получение выбранных опций
  const selectedOptions = useCallback(() => {
    return options.filter(option => selectedValues.includes(option.value));
  }, [options, selectedValues]);

  // Обработчики событий
  const handleToggle = useCallback(() => {
    if (disabled || readOnly) return;
    
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onOpenChange?.(newIsOpen);
    
    if (newIsOpen) {
      inputRef.current?.focus();
    }
  }, [disabled, readOnly, isOpen, onOpenChange]);

  const handleOptionToggle = useCallback((optionValue: string | number) => {
    if (disabled || readOnly) return;
    
    const newSelectedValues = selectedValues.includes(optionValue)
      ? selectedValues.filter(v => v !== optionValue)
      : [...selectedValues, optionValue];
    
    if (maxItems && newSelectedValues.length > maxItems) {
      return; // Превышен лимит
    }
    
    setSelectedValues(newSelectedValues);
    onChange?.(newSelectedValues);
  }, [disabled, readOnly, selectedValues, onChange, maxItems]);

  const handleOptionRemove = useCallback((optionValue: string | number) => {
    if (disabled || readOnly) return;
    
    const newSelectedValues = selectedValues.filter(v => v !== optionValue);
    setSelectedValues(newSelectedValues);
    onChange?.(newSelectedValues);
  }, [disabled, readOnly, selectedValues, onChange]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedValues([]);
    onChange?.([]);
  }, [onChange]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  }, [onSearch]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0) {
        const filteredOpts = filteredOptions();
        if (filteredOpts[focusedIndex]) {
          handleOptionToggle(filteredOpts[focusedIndex].value);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const filteredOpts = filteredOptions();
      setFocusedIndex(prev => 
        prev < filteredOpts.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      onOpenChange?.(false);
      inputRef.current?.blur();
    }
  }, [focusedIndex, filteredOptions, handleOptionToggle, onOpenChange]);

  const handleInputFocus = useCallback(() => {
    if (!disabled && !readOnly) {
      setIsOpen(true);
      onOpenChange?.(true);
    }
  }, [disabled, readOnly, onOpenChange]);

  const handleInputBlur = useCallback(() => {
    // Задержка для обработки клика по опциям
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        onOpenChange?.(false);
        setFocusedIndex(-1);
      }
    }, 100);
  }, [onOpenChange]);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  // Сброс фокуса при закрытии
  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1);
      setSearchQuery('');
    }
  }, [isOpen]);

  const renderTags = () => {
    const selected = selectedOptions();
    const displayCount = Math.min(selected.length, maxDisplayItems);
    const remainingCount = selected.length - displayCount;
    
    return (
      <div className="flex flex-wrap items-center gap-1">
        {selected.slice(0, displayCount).map(option => (
          <span key={option.value} className={tagClasses}>
            <span className="truncate">{option.label}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleOptionRemove(option.value);
              }}
              className={tagRemoveClasses}
              aria-label={`Удалить ${option.label}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        
        {remainingCount > 0 && (
          <span className="text-sm text-gray-500">
            +{remainingCount} еще
          </span>
        )}
      </div>
    );
  };

  const renderInput = () => (
    <div className="flex-1 min-w-0">
      {selectedValues.length > 0 && renderTags()}
      
      <input
        ref={inputRef}
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        placeholder={selectedValues.length === 0 ? placeholder : ''}
        disabled={disabled}
        readOnly={readOnly || !searchable}
        className={inputClasses}
        autoComplete="off"
      />
    </div>
  );

  const renderOptions = () => {
    const filtered = filteredOptions();
    
    if (filtered.length === 0) {
      return (
        <div className="p-4 text-center">
          <p className="text-sm text-gray-500">Ничего не найдено</p>
          <p className="text-xs text-gray-400 mt-1">Попробуйте изменить запрос</p>
        </div>
      );
    }

    return (
      <div className="max-h-64 overflow-y-auto">
        {filtered.map((option, index) => {
          const isSelected = selectedValues.includes(option.value);
          const isFocused = index === focusedIndex;
          
          return (
            <button
              key={option.value}
              className={cn(
                'w-full text-left p-3 transition-colors duration-150 border-b border-gray-100 last:border-b-0',
                isSelected ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50',
                isFocused && 'bg-gray-100',
                option.disabled && 'opacity-50 cursor-not-allowed'
              )}
              onClick={() => !option.disabled && handleOptionToggle(option.value)}
              disabled={option.disabled}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {isSelected ? (
                    <Check className="w-4 h-4 text-blue-600" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-gray-300 rounded" />
                  )}
                </div>
                
                {option.icon && (
                  <div className="flex-shrink-0">
                    {option.icon}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {option.label}
                  </p>
                  {option.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  const renderDropdown = () => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          className={dropdownClasses}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ 
            duration: 0.2,
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {renderOptions()}
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...(props as any)}
      >
        <div ref={containerRef} className="relative">
          <div className={containerClasses}>
            {renderInput()}
            
            <div className="flex items-center space-x-1 pr-2">
              {showSelectedCount && selectedValues.length > 0 && (
                <span className="text-xs text-gray-500 px-2">
                  {selectedValues.length}
                </span>
              )}
              
              {clearable && selectedValues.length > 0 && !disabled && !readOnly && (
                <button
                  onClick={handleClear}
                  className={buttonClasses}
                  aria-label="Очистить все"
                >
                  <X className="w-full h-full" />
                </button>
              )}
              
              <button
                onClick={handleToggle}
                disabled={disabled || readOnly}
                className={cn(
                  buttonClasses,
                  'transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
                aria-label="Открыть/закрыть список"
              >
                <ChevronDown className="w-full h-full" />
              </button>
            </div>
          </div>
          
          {renderDropdown()}
        </div>
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={baseClasses} {...props}>
      <div ref={containerRef} className="relative">
        <div className={containerClasses}>
          {renderInput()}
          
          <div className="flex items-center space-x-1 pr-2">
            {showSelectedCount && selectedValues.length > 0 && (
              <span className="text-xs text-gray-500 px-2">
                {selectedValues.length}
              </span>
            )}
            
            {clearable && selectedValues.length > 0 && !disabled && !readOnly && (
              <button
                onClick={handleClear}
                className={buttonClasses}
                aria-label="Очистить все"
              >
                <X className="w-full h-full" />
              </button>
            )}
            
            <button
              onClick={handleToggle}
              disabled={disabled || readOnly}
              className={cn(
                buttonClasses,
                'transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
              aria-label="Открыть/закрыть список"
            >
              <ChevronDown className="w-full h-full" />
            </button>
          </div>
        </div>
        
        {renderDropdown()}
      </div>
    </div>
  );
});

MultiSelect.displayName = 'MultiSelect';

export default MultiSelect;
