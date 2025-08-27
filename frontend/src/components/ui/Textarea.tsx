import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  variant?: 'default' | 'filled' | 'outlined' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  showCharacterCount?: boolean;
  maxLength?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  className?: string;
  animate?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helpText,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  showCharacterCount = false,
  maxLength,
  resize = 'vertical',
  className,
  animate = false,
  disabled,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(props.value || props.defaultValue || '');

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
    'transition-all duration-200 rounded-lg',
    fullWidth && 'w-full',
    className
  );

  const textareaClasses = cn(
    'w-full outline-none placeholder-gray-400 transition-all duration-200',
    currentVariant.container,
    currentSize,
    isFocused && !error && currentVariant.focus,
    error && currentVariant.error,
    disabled && currentVariant.disabled,
    resize === 'none' && 'resize-none',
    resize === 'vertical' && 'resize-y',
    resize === 'horizontal' && 'resize-x',
    resize === 'both' && 'resize',
    'focus:outline-none'
  );

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    props.onChange?.(e);
  };

  const characterCount = String(value).length;
  const isOverLimit = maxLength && characterCount > maxLength;

  const renderTextarea = () => (
    <div className="relative">
      <textarea
        ref={ref}
        className={textareaClasses}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        maxLength={maxLength}
        {...props}
      />
      
      {showCharacterCount && maxLength && (
        <div className="absolute bottom-2 right-2 text-xs text-gray-400">
          <span className={cn(isOverLimit && 'text-red-500')}>
            {characterCount}
          </span>
          <span className="text-gray-400">/{maxLength}</span>
        </div>
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
          <motion.label
            className="block text-sm font-medium text-gray-700 mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </motion.label>
        )}
        
        {renderTextarea()}
        
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
    <div className={baseClasses}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {renderTextarea()}
      
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

Textarea.displayName = 'Textarea';

export default Textarea;
