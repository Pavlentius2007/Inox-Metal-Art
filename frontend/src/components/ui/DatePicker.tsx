import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import CalendarComponent from './Calendar';

interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  format?: string;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  showCalendarIcon?: boolean;
  className?: string;
  animate?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(({
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Выберите дату',
  format = 'dd.MM.yyyy',
  variant = 'default',
  size = 'md',
  disabled = false,
  readOnly = false,
  clearable = true,
  showCalendarIcon = true,
  className,
  animate = false,
  onOpenChange,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(controlledValue || defaultValue || null);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Размеры
  const sizes = {
    sm: {
      container: 'h-8',
      input: 'text-sm px-2',
      icon: 'w-4 h-4',
      calendar: 'w-64'
    },
    md: {
      container: 'h-10',
      input: 'text-sm px-3',
      icon: 'w-4 h-4',
      calendar: 'w-72'
    },
    lg: {
      container: 'h-12',
      input: 'text-base px-4',
      icon: 'w-5 h-5',
      calendar: 'w-80'
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
      icon: 'text-gray-400'
    },
    outlined: {
      container: 'bg-transparent border-2 border-gray-300 rounded-lg',
      containerFocus: 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20',
      containerDisabled: 'border-gray-200 bg-gray-50',
      input: 'text-gray-700 placeholder-gray-500',
      inputDisabled: 'text-gray-400 cursor-not-allowed',
      icon: 'text-gray-500'
    },
    filled: {
      container: 'bg-gray-100 border border-transparent rounded-lg',
      containerFocus: 'bg-white border-blue-500 ring-1 ring-blue-500',
      containerDisabled: 'bg-gray-50',
      input: 'text-gray-900 placeholder-gray-600',
      inputDisabled: 'text-gray-400 cursor-not-allowed',
      icon: 'text-gray-500'
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
    'flex-shrink-0 p-1',
    currentSize.icon,
    currentVariant.icon
  );

  const calendarClasses = cn(
    'absolute top-full left-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg',
    currentSize.calendar
  );

  // Форматирование даты
  const formatDate = useCallback((date: Date, formatStr: string) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return formatStr
      .replace('dd', day)
      .replace('MM', month)
      .replace('yyyy', year.toString());
  }, []);

  // Парсинг даты
  const parseDate = useCallback((dateStr: string): Date | null => {
    const parts = dateStr.split('.');
    if (parts.length !== 3) return null;
    
    const [day, month, year] = parts.map(Number);
    if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
    
    const date = new Date(year, month - 1, day);
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
      return null;
    }
    
    return date;
  }, []);

  // Обновление значения
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedDate(controlledValue);
      setInputValue(controlledValue ? formatDate(controlledValue, format) : '');
    }
  }, [controlledValue, format, formatDate]);

  // Обработчики событий
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const parsedDate = parseDate(value);
    if (parsedDate) {
      setSelectedDate(parsedDate);
      onChange?.(parsedDate);
    }
  }, [parseDate, onChange]);

  const handleInputFocus = useCallback(() => {
    if (!disabled && !readOnly) {
      setIsOpen(true);
      onOpenChange?.(true);
    }
  }, [disabled, readOnly, onOpenChange]);

  const handleInputBlur = useCallback(() => {
    // Задержка для обработки клика по календарю
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    }, 100);
  }, [onOpenChange]);

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    setInputValue(formatDate(date, format));
    onChange?.(date);
    setIsOpen(false);
    onOpenChange?.(false);
    inputRef.current?.blur();
  }, [format, format, onChange, onOpenChange]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(null);
    setInputValue('');
    onChange?.(null as any);
  }, [onChange]);

  const handleToggle = useCallback(() => {
    if (disabled || readOnly) return;
    
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onOpenChange?.(newIsOpen);
    
    if (newIsOpen) {
      inputRef.current?.focus();
    }
  }, [disabled, readOnly, isOpen, onOpenChange]);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  // Закрытие при нажатии Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        onOpenChange?.(false);
        inputRef.current?.blur();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onOpenChange]);

  const renderInput = () => (
    <div className={containerClasses}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={inputClasses}
        autoComplete="off"
      />
      
      <div className="flex items-center space-x-1 pr-2">
        {clearable && selectedDate && !disabled && !readOnly && (
          <button
            onClick={handleClear}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
            aria-label="Очистить дату"
          >
            <X className="w-3 h-3 text-gray-400" />
          </button>
        )}
        
        {showCalendarIcon && (
          <button
            onClick={handleToggle}
            disabled={disabled || readOnly}
            className={cn(
              'p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
              iconClasses
            )}
            aria-label="Открыть календарь"
          >
            <Calendar className="w-full h-full" />
          </button>
        )}
      </div>
    </div>
  );

  const renderCalendar = () => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={calendarClasses}
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
          <CalendarComponent
            value={selectedDate || undefined}
            onChange={handleDateSelect}
            animate={animate}
            showHeader={true}
            showNavigation={true}
            showToday={true}
          />
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
          {renderCalendar()}
        </div>
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={baseClasses} {...props}>
      <div ref={containerRef} className="relative">
        {renderInput()}
        {renderCalendar()}
      </div>
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
