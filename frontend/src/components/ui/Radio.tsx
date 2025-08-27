import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helpText?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  layout?: 'vertical' | 'horizontal' | 'grid';
  columns?: 1 | 2 | 3;
  className?: string;
  animate?: boolean;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  label,
  error,
  helpText,
  options,
  value,
  onChange,
  variant = 'default',
  size = 'md',
  layout = 'vertical',
  columns = 1,
  className,
  animate = false,
  disabled,
  name,
  ...props
}, ref) => {
  const [focusedValue, setFocusedValue] = useState<string | null>(null);

  // Размеры
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Варианты стилей
  const variants = {
    default: {
      container: 'border-2 border-gray-300 bg-white',
      checked: 'border-blue-600',
      focus: 'ring-2 ring-blue-500 ring-offset-2',
      error: 'border-red-300',
      disabled: 'border-gray-200 bg-gray-50'
    },
    filled: {
      container: 'border-2 border-gray-300 bg-gray-100',
      checked: 'border-blue-600',
      focus: 'ring-2 ring-blue-500 ring-offset-2',
      error: 'border-red-300',
      disabled: 'border-gray-200 bg-gray-50'
    },
    outlined: {
      container: 'border-2 border-gray-300 bg-transparent',
      checked: 'border-blue-600',
      focus: 'ring-2 ring-blue-500 ring-offset-2',
      error: 'border-red-300',
      disabled: 'border-gray-200 bg-gray-50'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'space-y-3',
    disabled && 'opacity-50',
    className
  );

  const layoutClasses = {
    vertical: 'space-y-3',
    horizontal: 'flex flex-wrap gap-4',
    grid: `grid grid-cols-1 gap-4 ${columns > 1 ? `md:grid-cols-${columns}` : ''}`
  };

  const radioClasses = cn(
    'relative flex items-start space-x-3 transition-all duration-200 cursor-pointer',
    disabled && 'cursor-not-allowed'
  );

  const radioInputClasses = cn(
    'relative flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer',
    currentSize,
    currentVariant.container,
    'focus-within:outline-none'
  );

  const labelClasses = cn(
    'text-sm font-medium cursor-pointer select-none',
    disabled && 'cursor-not-allowed',
    error ? 'text-red-700' : 'text-gray-700'
  );

  const descriptionClasses = cn(
    'text-xs text-gray-500 mt-1',
    disabled && 'text-gray-400'
  );

  const handleChange = (optionValue: string) => {
    if (disabled) return;
    onChange?.(optionValue);
  };

  const handleFocus = (optionValue: string) => {
    setFocusedValue(optionValue);
  };

  const handleBlur = () => {
    setFocusedValue(null);
  };

  const renderRadioOption = (option: RadioOption) => {
    const isChecked = option.value === value;
    const isFocused = focusedValue === option.value;
    const isDisabled = disabled || option.disabled;

    return (
      <div key={option.value} className={radioClasses}>
        <div className="relative">
          <input
            ref={ref}
            type="radio"
            name={name}
            value={option.value}
            checked={isChecked}
            onChange={() => handleChange(option.value)}
            onFocus={() => handleFocus(option.value)}
            onBlur={handleBlur}
            disabled={isDisabled}
            className="sr-only"
            {...props}
          />
          
          <div className={cn(
            radioInputClasses,
            isChecked && currentVariant.checked,
            isFocused && currentVariant.focus,
            error && currentVariant.error,
            isDisabled && currentVariant.disabled,
            !isDisabled && 'hover:border-gray-400'
          )}>
            {isChecked && (
              <motion.div
                className="w-2 h-2 bg-blue-600 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <label className={labelClasses}>
            {option.label}
          </label>
          
          {option.description && (
            <p className={descriptionClasses}>
              {option.description}
            </p>
          )}
        </div>
      </div>
    );
  };

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
            className="block text-sm font-medium text-gray-700 mb-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </motion.label>
        )}
        
        <motion.div
          className={layoutClasses[layout]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {options.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              {renderRadioOption(option)}
            </motion.div>
          ))}
        </motion.div>
        
        {error && (
          <motion.p
            className="mt-3 text-sm text-red-600"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.4 }}
          >
            {error}
          </motion.p>
        )}
        
        {helpText && !error && (
          <motion.p
            className="mt-3 text-sm text-gray-500"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.5 }}
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
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className={layoutClasses[layout]}>
        {options.map(renderRadioOption)}
      </div>
      
      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helpText && !error && (
        <p className="mt-3 text-sm text-gray-500">
          {helpText}
        </p>
      )}
    </div>
  );
});

Radio.displayName = 'Radio';

export default Radio;
