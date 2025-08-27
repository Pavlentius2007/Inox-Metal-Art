import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helpText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  animate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  error,
  helpText,
  variant = 'default',
  size = 'md',
  indeterminate = false,
  onChange,
  className,
  animate = false,
  disabled,
  checked,
  defaultChecked,
  ...props
}, ref) => {
  const [isChecked, setIsChecked] = useState(defaultChecked || checked || false);
  const [isFocused, setIsFocused] = useState(false);

  // Обновление состояния при изменении props
  React.useEffect(() => {
    if (checked !== undefined) {
      setIsChecked(checked);
    }
  }, [checked]);

  // Установка indeterminate состояния
  React.useEffect(() => {
    if (ref && typeof ref === 'object' && ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate, ref]);

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
      checked: 'border-blue-600 bg-blue-600',
      focus: 'ring-2 ring-blue-500 ring-offset-2',
      error: 'border-red-300',
      disabled: 'border-gray-200 bg-gray-50'
    },
    filled: {
      container: 'border-2 border-gray-300 bg-gray-100',
      checked: 'border-blue-600 bg-blue-600',
      focus: 'ring-2 ring-blue-500 ring-offset-2',
      error: 'border-red-300',
      disabled: 'border-gray-200 bg-gray-50'
    },
    outlined: {
      container: 'border-2 border-gray-300 bg-transparent',
      checked: 'border-blue-600 bg-blue-600',
      focus: 'ring-2 ring-blue-500 ring-offset-2',
      error: 'border-red-300',
      disabled: 'border-gray-200 bg-gray-50'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'flex items-start space-x-3 transition-all duration-200',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const checkboxClasses = cn(
    'relative flex items-center justify-center rounded transition-all duration-200 cursor-pointer',
    currentSize,
    currentVariant.container,
    isChecked && currentVariant.checked,
    isFocused && currentVariant.focus,
    error && currentVariant.error,
    disabled && currentVariant.disabled,
    !disabled && 'hover:border-gray-400'
  );

  const labelClasses = cn(
    'text-sm font-medium cursor-pointer select-none',
    disabled && 'cursor-not-allowed',
    error ? 'text-red-700' : 'text-gray-700'
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const renderCheckbox = () => (
    <div className="relative">
      <input
        ref={ref}
        type="checkbox"
        className="sr-only"
        checked={isChecked}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        {...props}
      />
      
      <div className={checkboxClasses}>
        {isChecked && !indeterminate && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="w-3 h-3 text-white" />
          </motion.div>
        )}
        
        {indeterminate && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-2 h-0.5 bg-white rounded"
          />
        )}
      </div>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderCheckbox()}
        
        {label && (
          <motion.label
            className={labelClasses}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {label}
          </motion.label>
        )}
        
        {error && (
          <motion.div
            className="w-full mt-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <p className="text-sm text-red-600">{error}</p>
          </motion.div>
        )}
        
        {helpText && !error && (
          <motion.div
            className="w-full mt-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.3 }}
          >
            <p className="text-sm text-gray-500">{helpText}</p>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses}>
      {renderCheckbox()}
      
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      
      {error && (
        <div className="w-full mt-2">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      {helpText && !error && (
        <div className="w-full mt-2">
          <p className="text-sm text-gray-500">{helpText}</p>
        </div>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;
