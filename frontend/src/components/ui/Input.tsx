import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Search, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled' | 'outlined' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  className?: string;
  animate?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helpText,
  leftIcon,
  rightIcon,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  clearable = false,
  onClear,
  className,
  animate = false,
  type = 'text',
  disabled,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

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

  const inputContainerClasses = cn(
    'flex items-center transition-all duration-200',
    currentVariant.container,
    currentSize,
    isFocused && !error && currentVariant.focus,
    error && currentVariant.error,
    disabled && currentVariant.disabled,
    'focus-within:outline-none'
  );

  const inputClasses = cn(
    'flex-1 bg-transparent outline-none placeholder-gray-400',
    disabled && 'cursor-not-allowed',
    leftIcon && 'ml-2',
    rightIcon && 'mr-2',
    (clearable || isPassword) && 'mr-8'
  );

  const iconClasses = cn(
    'flex-shrink-0 text-gray-400',
    size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'
  );

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleClear = () => {
    if (onClear) {
      onClear();
    } else {
      // Если onClear не передан, очищаем значение через ref
      if (ref && typeof ref === 'object' && ref.current) {
        ref.current.value = '';
        // Вызываем событие change для обновления React state
        const event = new Event('input', { bubbles: true });
        ref.current.dispatchEvent(event);
      }
    }
  };

  const renderInput = () => (
    <div className={inputContainerClasses}>
      {leftIcon && (
        <span className={iconClasses}>
          {leftIcon}
        </span>
      )}
      
      <input
        ref={ref}
        type={inputType}
        className={inputClasses}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      
      {rightIcon && (
        <span className={iconClasses}>
          {rightIcon}
        </span>
      )}
      
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          disabled={disabled}
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      )}
      
      {clearable && props.value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          disabled={disabled}
        >
          <X className="w-4 h-4" />
        </button>
      )}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        {renderInput()}
        
        {error && (
          <motion.p
            className="mt-2 text-sm text-red-600"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
        
        {helpText && !error && (
          <motion.p
            className="mt-2 text-sm text-gray-500"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {helpText}
          </motion.p>
        )}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {renderInput()}
      
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

Input.displayName = 'Input';

export default Input;
