import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, Loader2, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SearchResult {
  id: string | number;
  title: string;
  description?: string;
  type?: string;
  url?: string;
  icon?: React.ReactNode;
}

interface SearchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  showIcon?: boolean;
  showClearButton?: boolean;
  showFilters?: boolean;
  showResults?: boolean;
  results?: SearchResult[];
  loading?: boolean;
  minQueryLength?: number;
  debounceMs?: number;
  className?: string;
  animate?: boolean;
  onResultClick?: (result: SearchResult) => void;
  onFilterChange?: (filters: Record<string, any>) => void;
}

const Search = forwardRef<HTMLDivElement, SearchProps>(({
  value: controlledValue,
  defaultValue = '',
  onChange,
  onSearch,
  placeholder = 'Поиск...',
  variant = 'default',
  size = 'md',
  disabled = false,
  readOnly = false,
  clearable = true,
  showIcon = true,
  showClearButton = true,
  showFilters = false,
  showResults = true,
  results = [],
  loading = false,
  minQueryLength = 2,
  debounceMs = 300,
  className,
  animate = false,
  onResultClick,
  onFilterChange,
  ...props
}, ref) => {
  const [searchValue, setSearchValue] = useState(controlledValue || defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [debouncedValue, setDebouncedValue] = useState(searchValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Размеры
  const sizes = {
    sm: {
      container: 'h-8',
      input: 'text-sm px-2',
      icon: 'w-4 h-4',
      button: 'p-1',
      dropdown: 'mt-1'
    },
    md: {
      container: 'h-10',
      input: 'text-sm px-3',
      icon: 'w-4 h-4',
      button: 'p-1.5',
      dropdown: 'mt-1'
    },
    lg: {
      container: 'h-12',
      input: 'text-base px-4',
      icon: 'w-5 h-5',
      button: 'p-2',
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
      dropdown: 'bg-white border border-gray-200 shadow-lg'
    },
    outlined: {
      container: 'bg-transparent border-2 border-gray-300 rounded-lg',
      containerFocus: 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20',
      containerDisabled: 'border-gray-200 bg-gray-50',
      input: 'text-gray-700 placeholder-gray-500',
      inputDisabled: 'text-gray-400 cursor-not-allowed',
      icon: 'text-gray-500',
      button: 'text-gray-500 hover:text-gray-700',
      dropdown: 'bg-white border-2 border-gray-200 shadow-lg'
    },
    filled: {
      container: 'bg-gray-100 border border-transparent rounded-lg',
      containerFocus: 'bg-white border-blue-500 ring-1 ring-blue-500',
      containerDisabled: 'bg-gray-50',
      input: 'text-gray-900 placeholder-gray-600',
      inputDisabled: 'text-gray-400 cursor-not-allowed',
      icon: 'text-gray-500',
      button: 'text-gray-500 hover:text-gray-700',
      dropdown: 'bg-white border border-gray-200 shadow-lg'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'relative inline-block w-full',
    className
  );

  const containerClasses = cn(
    'flex items-center w-full transition-all duration-200',
    currentSize.container,
    currentVariant.container,
    isFocused && currentVariant.containerFocus,
    disabled && currentVariant.containerDisabled,
    className
  );

  const inputClasses = cn(
    'flex-1 bg-transparent border-none outline-none placeholder-gray-500 transition-colors duration-200',
    currentSize.input,
    currentVariant.input,
    disabled && currentVariant.inputDisabled
  );

  const iconClasses = cn(
    'flex-shrink-0',
    currentSize.icon,
    currentVariant.icon
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

  // Debounce для поиска
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchValue, debounceMs]);

  // Выполнение поиска при изменении debounced значения
  useEffect(() => {
    if (debouncedValue && debouncedValue.length >= minQueryLength) {
      onSearch?.(debouncedValue);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [debouncedValue, minQueryLength, onSearch]);

  // Обновление значения
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSearchValue(controlledValue);
    }
  }, [controlledValue]);

  // Обработчики событий
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onChange?.(value);
  }, [onChange]);

  const handleInputFocus = useCallback(() => {
    if (!disabled && !readOnly) {
      setIsFocused(true);
      if (searchValue && searchValue.length >= minQueryLength) {
        setShowDropdown(true);
      }
    }
  }, [disabled, readOnly, searchValue, minQueryLength]);

  const handleInputBlur = useCallback(() => {
    // Задержка для обработки клика по результатам
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsFocused(false);
        setShowDropdown(false);
      }
    }, 100);
  }, []);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchValue && searchValue.length >= minQueryLength) {
        onSearch?.(searchValue);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  }, [searchValue, minQueryLength, onSearch]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchValue('');
    onChange?.('');
    setShowDropdown(false);
    inputRef.current?.focus();
  }, [onChange]);

  const handleResultClick = useCallback((result: SearchResult) => {
    onResultClick?.(result);
    setShowDropdown(false);
    inputRef.current?.blur();
  }, [onResultClick]);

  const handleFilterChange = useCallback((key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  }, [filters, onFilterChange]);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const renderInput = () => (
    <div className={containerClasses}>
      {showIcon && (
        <SearchIcon className={iconClasses} />
      )}
      
      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={inputClasses}
        autoComplete="off"
        role="searchbox"
        aria-label="Поиск"
      />
      
      <div className="flex items-center space-x-1 pr-2">
        {loading && (
          <Loader2 className={cn('animate-spin', iconClasses)} />
        )}
        
        {showClearButton && searchValue && !disabled && !readOnly && (
          <button
            onClick={handleClear}
            className={buttonClasses}
            aria-label="Очистить поиск"
          >
            <X className="w-full h-full" />
          </button>
        )}
        
        {showFilters && (
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={cn(
              buttonClasses,
              showDropdown && 'text-blue-600'
            )}
            aria-label="Показать фильтры"
          >
            <Filter className="w-full h-full" />
          </button>
        )}
      </div>
    </div>
  );

  const renderFilters = () => {
    if (!showFilters) return null;

    return (
      <div className="p-3 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Фильтры</h3>
        <div className="space-y-2">
          {/* Пример фильтров */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Тип</label>
            <select
              value={filters.type || ''}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full text-xs border border-gray-300 rounded px-2 py-1"
            >
              <option value="">Все типы</option>
              <option value="article">Статьи</option>
              <option value="product">Товары</option>
              <option value="page">Страницы</option>
            </select>
          </div>
        </div>
      </div>
    );
  };

  const renderResults = () => {
    if (!showResults || !showDropdown) return null;

    if (loading) {
      return (
        <div className="p-4 text-center">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Поиск...</p>
        </div>
      );
    }

    if (results.length === 0 && searchValue && searchValue.length >= minQueryLength) {
      return (
        <div className="p-4 text-center">
          <p className="text-sm text-gray-500">Ничего не найдено</p>
          <p className="text-xs text-gray-400 mt-1">Попробуйте изменить запрос</p>
        </div>
      );
    }

    if (results.length === 0) return null;

    return (
      <div className="max-h-64 overflow-y-auto">
        {results.map((result) => (
          <button
            key={result.id}
            className="w-full text-left p-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
            onClick={() => handleResultClick(result)}
          >
            <div className="flex items-start space-x-3">
              {result.icon && (
                <div className="flex-shrink-0 mt-0.5">
                  {result.icon}
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {result.title}
                </p>
                {result.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {result.description}
                  </p>
                )}
                {result.type && (
                  <span className="inline-block text-xs text-gray-400 mt-1 px-2 py-0.5 bg-gray-100 rounded">
                    {result.type}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  const renderDropdown = () => (
    <AnimatePresence>
      {showDropdown && (
        <motion.div
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
          {renderFilters()}
          {renderResults()}
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
        {...props}
      >
        <div ref={containerRef} className="relative">
          {renderInput()}
          {renderDropdown()}
        </div>
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={baseClasses} {...props}>
      <div ref={containerRef} className="relative">
        {renderInput()}
        {renderDropdown()}
      </div>
    </div>
  );
});

Search.displayName = 'Search';

export default Search;
