import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  label?: string;
  error?: string;
  helpText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  onChange?: (checked: boolean) => void;
  className?: string;
  animate?: boolean;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  label,
  error,
  helpText,
  variant = 'default',
  size = 'md',
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

  // Размеры
  const sizes = {
    sm: {
      track: 'w-9 h-5',
      thumb: 'w-4 h-4',
      thumbOffset: 'translate-x-4'
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      thumbOffset: 'translate-x-5'
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      thumbOffset: 'translate-x-7'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      track: 'bg-gray-200',
      trackChecked: 'bg-blue-600',
      trackError: 'bg-red-200',
      trackDisabled: 'bg-gray-100',
      thumb: 'bg-white',
      thumbChecked: 'bg-white',
      thumbError: 'bg-white',
      thumbDisabled: 'bg-gray-300'
    },
    filled: {
      track: 'bg-gray-300',
      trackChecked: 'bg-blue-700',
      trackError: 'bg-red-300',
      trackDisabled: 'bg-gray-200',
      thumb: 'bg-white',
      thumbChecked: 'bg-white',
      thumbError: 'bg-white',
      thumbDisabled: 'bg-gray-400'
    },
    outlined: {
      track: 'bg-transparent border-2 border-gray-300',
      trackChecked: 'bg-transparent border-2 border-blue-600',
      trackError: 'bg-transparent border-2 border-red-300',
      trackDisabled: 'bg-transparent border-2 border-gray-200',
      thumb: 'bg-gray-600',
      thumbChecked: 'bg-blue-600',
      thumbError: 'bg-red-600',
      thumbDisabled: 'bg-gray-400'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'flex items-start space-x-3 transition-all duration-200',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const trackClasses = cn(
    'relative inline-flex items-center rounded-full transition-all duration-200 cursor-pointer',
    currentSize.track,
    currentVariant.track,
    isChecked && currentVariant.trackChecked,
    error && currentVariant.trackError,
    disabled && currentVariant.trackDisabled,
    isFocused && 'ring-2 ring-blue-500 ring-offset-2',
    !disabled && 'hover:opacity-80'
  );

  const thumbClasses = cn(
    'inline-block rounded-full transition-all duration-200',
    currentSize.thumb,
    currentVariant.thumb,
    isChecked && currentVariant.thumbChecked,
    error && currentVariant.thumbError,
    disabled && currentVariant.thumbDisabled
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

  const renderSwitch = () => (
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
      
      <div className={trackClasses}>
        <motion.div
          className={thumbClasses}
          animate={{
            x: isChecked ? currentSize.thumbOffset : 0
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />
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
        {renderSwitch()}
        
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
      {renderSwitch()}
      
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

Switch.displayName = 'Switch';

export default Switch;
