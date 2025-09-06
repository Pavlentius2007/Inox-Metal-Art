import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  value?: Date;
  defaultValue?: Date;
  onChange?: (time: Date) => void;
  placeholder?: string;
  format?: '12h' | '24h';
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  showSeconds?: boolean;
  showIcon?: boolean;
  className?: string;
  animate?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(({
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Выберите время',
  format = '24h',
  variant = 'default',
  size = 'md',
  disabled = false,
  readOnly = false,
  clearable = true,
  showSeconds = false,
  showIcon = true,
  className,
  animate = false,
  onOpenChange,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(controlledValue || defaultValue || null);
  const [inputValue, setInputValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Размеры
  const sizes = {
    sm: {
      container: 'h-8',
      input: 'text-sm px-2',
      icon: 'w-4 h-4',
      dropdown: 'w-48',
      option: 'px-2 py-1 text-sm'
    },
    md: {
      container: 'h-10',
      input: 'text-sm px-3',
      icon: 'w-4 h-4',
      dropdown: 'w-56',
      option: 'px-3 py-2 text-sm'
    },
    lg: {
      container: 'h-12',
      input: 'text-base px-4',
      icon: 'w-5 h-5',
      dropdown: 'w-64',
      option: 'px-4 py-2.5 text-base'
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
      dropdown: 'bg-white border border-gray-200 shadow-lg',
      option: 'text-gray-700 hover:bg-gray-50',
      optionActive: 'bg-blue-50 text-blue-700'
    },
    outlined: {
      container: 'bg-transparent border-2 border-gray-300 rounded-lg',
      containerFocus: 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20',
      containerDisabled: 'border-gray-200 bg-gray-50',
      input: 'text-gray-700 placeholder-gray-500',
      inputDisabled: 'text-gray-400 cursor-not-allowed',
      icon: 'text-gray-500',
      dropdown: 'bg-white border-2 border-gray-200 shadow-lg',
      option: 'text-gray-700 hover:bg-gray-100',
      optionActive: 'bg-blue-100 text-blue-800'
    },
    filled: {
      container: 'bg-gray-100 border border-transparent rounded-lg',
      containerFocus: 'bg-white border-blue-500 ring-1 ring-blue-500',
      containerDisabled: 'bg-gray-50',
      input: 'text-gray-900 placeholder-gray-600',
      inputDisabled: 'text-gray-400 cursor-not-allowed',
      icon: 'text-gray-500',
      dropdown: 'bg-white border border-gray-200 shadow-lg',
      option: 'text-gray-700 hover:bg-gray-50',
      optionActive: 'bg-blue-50 text-blue-700'
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

  const dropdownClasses = cn(
    'absolute top-full left-0 z-50 mt-1 rounded-lg',
    currentSize.dropdown,
    currentVariant.dropdown
  );

  const optionClasses = cn(
    'cursor-pointer transition-colors duration-150',
    currentSize.option,
    currentVariant.option
  );

  const activeOptionClasses = cn(
    optionClasses,
    currentVariant.optionActive
  );

  // Форматирование времени
  const formatTime = useCallback((date: Date, timeFormat: '12h' | '24h') => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    if (timeFormat === '12h') {
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutes}${showSeconds ? `:${seconds}` : ''} ${period}`;
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes}${showSeconds ? `:${seconds}` : ''}`;
  }, [showSeconds]);

  // Парсинг времени
  const parseTime = useCallback((timeStr: string): Date | null => {
    const time = new Date();
    
    if (format === '12h') {
      const match = timeStr.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i);
      if (!match) return null;
      
      let hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const seconds = match[3] ? parseInt(match[3]) : 0;
      const period = match[4].toUpperCase();
      
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      
      time.setHours(hours, minutes, seconds);
    } else {
      const match = timeStr.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
      if (!match) return null;
      
      const hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const seconds = match[3] ? parseInt(match[3]) : 0;
      
      time.setHours(hours, minutes, seconds);
    }
    
    return time;
  }, [format]);

  // Обновление значения
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedTime(controlledValue);
      setInputValue(controlledValue ? formatTime(controlledValue, format) : '');
    }
  }, [controlledValue, format, formatTime]);

  // Генерация опций времени
  const generateTimeOptions = useCallback(() => {
    const options = [];
    
    if (format === '12h') {
      for (let hour = 1; hour <= 12; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          const time = new Date();
          time.setHours(hour, minute, 0);
          options.push({
            value: time,
            label: formatTime(time, '12h'),
            type: 'time'
          });
        }
      }
    } else {
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          const time = new Date();
          time.setHours(hour, minute, 0);
          options.push({
            value: time,
            label: formatTime(time, '24h'),
            type: 'time'
          });
        }
      }
    }
    
    return options;
  }, [format, formatTime]);

  // Обработчики событий
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    const parsedTime = parseTime(value);
    if (parsedTime) {
      setSelectedTime(parsedTime);
      onChange?.(parsedTime);
    }
  }, [parseTime, onChange]);

  const handleInputFocus = useCallback(() => {
    if (!disabled && !readOnly) {
      setIsOpen(true);
      onOpenChange?.(true);
    }
  }, [disabled, readOnly, onOpenChange]);

  const handleInputBlur = useCallback(() => {
    // Задержка для обработки клика по выпадающему списку
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    }, 100);
  }, [onOpenChange]);

  const handleTimeSelect = useCallback((time: Date) => {
    setSelectedTime(time);
    setInputValue(formatTime(time, format));
    onChange?.(time);
    setIsOpen(false);
    onOpenChange?.(false);
    inputRef.current?.blur();
  }, [format, formatTime, onChange, onOpenChange]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedTime(null);
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
        {clearable && selectedTime && !disabled && !readOnly && (
          <button
            onClick={handleClear}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
            aria-label="Очистить время"
          >
            <X className="w-3 h-3 text-gray-400" />
          </button>
        )}
        
        {showIcon && (
          <button
            onClick={handleToggle}
            disabled={disabled || readOnly}
            className={cn(
              'p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
              iconClasses
            )}
            aria-label="Открыть выбор времени"
          >
            <Clock className="w-full h-full" />
          </button>
        )}
      </div>
    </div>
  );

  const renderTimeOptions = () => {
    const timeOptions = generateTimeOptions();
    
    return (
      <div className="max-h-64 overflow-y-auto">
        {timeOptions.map((option, index) => (
          <div
            key={index}
            className={cn(
              option.value.getTime() === selectedTime?.getTime() ? activeOptionClasses : optionClasses
            )}
            onClick={() => handleTimeSelect(option.value)}
          >
            {option.label}
          </div>
        ))}
      </div>
    );
  };

  const renderDropdown = () => (
    <AnimatePresence>
      {isOpen && (
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
          {renderTimeOptions()}
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

TimePicker.displayName = 'TimePicker';

export default TimePicker;
