import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number | number[];
  defaultValue?: number | number[];
  onChange?: (value: number | number[]) => void;
  onValueChange?: (value: number | number[]) => void;
  label?: string;
  error?: string;
  helpText?: string;
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  range?: boolean;
  disabled?: boolean;
  showValue?: boolean;
  showMarks?: boolean;
  marks?: { value: number; label: string }[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  animate?: boolean;
}

const Slider = forwardRef<HTMLDivElement, SliderProps>(({
  min = 0,
  max = 100,
  step = 1,
  value: controlledValue,
  defaultValue = 0,
  onChange,
  onValueChange,
  label,
  error,
  helpText,
  variant = 'default',
  size = 'md',
  range = false,
  disabled = false,
  showValue = true,
  showMarks = false,
  marks = [],
  orientation = 'horizontal',
  className,
  animate = false,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState<number | number[]>(
    controlledValue !== undefined ? controlledValue : defaultValue
  );
  const [isDragging, setIsDragging] = useState(false);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Обновление внутреннего значения при изменении контролируемого значения
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  // Размеры
  const sizes = {
    sm: {
      track: orientation === 'horizontal' ? 'h-1' : 'w-1',
      thumb: 'w-3 h-3',
      thumbActive: 'w-4 h-4'
    },
    md: {
      track: orientation === 'horizontal' ? 'h-2' : 'w-2',
      thumb: 'w-4 h-4',
      thumbActive: 'w-5 h-5'
    },
    lg: {
      track: orientation === 'horizontal' ? 'h-3' : 'w-3',
      thumb: 'w-5 h-5',
      thumbActive: 'w-6 h-6'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      track: 'bg-gray-200',
      trackFilled: 'bg-blue-600',
      trackError: 'bg-red-200',
      trackDisabled: 'bg-gray-100',
      thumb: 'bg-white border-2 border-blue-600',
      thumbActive: 'bg-blue-600 border-2 border-blue-700',
      thumbError: 'bg-white border-2 border-red-600',
      thumbDisabled: 'bg-gray-300 border-2 border-gray-400'
    },
    filled: {
      track: 'bg-gray-300',
      trackFilled: 'bg-blue-700',
      trackError: 'bg-red-300',
      trackDisabled: 'bg-gray-200',
      thumb: 'bg-white border-2 border-blue-700',
      thumbActive: 'bg-blue-700 border-2 border-blue-800',
      thumbError: 'bg-white border-2 border-red-700',
      thumbDisabled: 'bg-gray-400 border-2 border-gray-500'
    },
    outlined: {
      track: 'bg-transparent border-2 border-gray-300',
      trackFilled: 'bg-transparent border-2 border-blue-600',
      trackError: 'bg-transparent border-2 border-red-300',
      trackDisabled: 'bg-transparent border-2 border-gray-200',
      thumb: 'bg-gray-600 border-2 border-gray-700',
      thumbActive: 'bg-blue-600 border-2 border-blue-700',
      thumbError: 'bg-red-600 border-2 border-red-700',
      thumbDisabled: 'bg-gray-400 border-2 border-gray-500'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'relative',
    orientation === 'vertical' ? 'h-full' : 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const trackClasses = cn(
    'relative rounded-full transition-all duration-200',
    currentSize.track,
    currentVariant.track,
    error && currentVariant.trackError,
    disabled && currentVariant.trackDisabled,
    orientation === 'horizontal' ? 'w-full' : 'h-full'
  );

  const getThumbClasses = (_index: number, isActive: boolean) => cn(
    'absolute rounded-full shadow-lg transition-all duration-200 cursor-pointer',
    currentSize.thumb,
    isActive && currentSize.thumbActive,
    currentVariant.thumb,
    isActive && currentVariant.thumbActive,
    error && currentVariant.thumbError,
    disabled && currentVariant.thumbDisabled,
    orientation === 'horizontal' ? 'top-1/2 -translate-y-1/2' : 'left-1/2 -translate-x-1/2'
  );

  const getValuePosition = (val: number) => {
    const percentage = ((val - min) / (max - min)) * 100;
    return orientation === 'horizontal' ? `${percentage}%` : `${100 - percentage}%`;
  };

  const getFilledTrackStyle = () => {
    if (range && Array.isArray(internalValue)) {
      const [minVal, maxVal] = internalValue;
      const minPos = ((minVal - min) / (max - min)) * 100;
      const maxPos = ((maxVal - min) / (max - min)) * 100;
      
      if (orientation === 'horizontal') {
        return {
          left: `${minPos}%`,
          width: `${maxPos - minPos}%`
        };
      } else {
        return {
          bottom: `${minPos}%`,
          height: `${maxPos - minPos}%`
        };
      }
    } else {
      const val = Array.isArray(internalValue) ? internalValue[0] : internalValue;
      const percentage = ((val - min) / (max - min)) * 100;
      
      if (orientation === 'horizontal') {
        return { width: `${percentage}%` };
      } else {
        return { height: `${percentage}%` };
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent, thumbIndex: number) => {
    if (disabled) return;
    
    e.preventDefault();
    setIsDragging(true);
    setActiveThumb(thumbIndex);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !sliderRef.current) return;
      
      const rect = sliderRef.current.getBoundingClientRect();
      let newValue: number;
      
      if (orientation === 'horizontal') {
        const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        newValue = min + percentage * (max - min);
      } else {
        const percentage = Math.max(0, Math.min(1, (rect.bottom - e.clientY) / rect.height));
        newValue = min + percentage * (max - min);
      }
      
      newValue = Math.round(newValue / step) * step;
      newValue = Math.max(min, Math.min(max, newValue));
      
      if (range && Array.isArray(internalValue)) {
        const newValues = [...internalValue];
        newValues[thumbIndex] = newValue;
        
        // Предотвращаем пересечение значений
        if (thumbIndex === 0 && newValue > newValues[1]) {
          newValues[0] = newValues[1];
        } else if (thumbIndex === 1 && newValue < newValues[0]) {
          newValues[1] = newValues[0];
        } else {
          newValues[thumbIndex] = newValue;
        }
        
        setInternalValue(newValues);
        onValueChange?.(newValues);
        onChange?.(newValues);
      } else {
        setInternalValue(newValue);
        onValueChange?.(newValue);
        onChange?.(newValue);
      }
    };
    
    const handleMouseUp = () => {
      setIsDragging(false);
      setActiveThumb(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTrackClick = (e: React.MouseEvent) => {
    if (disabled || range) return;
    
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    let newValue: number;
    
    if (orientation === 'horizontal') {
      const percentage = (e.clientX - rect.left) / rect.width;
      newValue = min + percentage * (max - min);
    } else {
      const percentage = (rect.bottom - e.clientY) / rect.height;
      newValue = min + percentage * (max - min);
    }
    
    newValue = Math.round(newValue / step) * step;
    newValue = Math.max(min, Math.min(max, newValue));
    
    setInternalValue(newValue);
    onValueChange?.(newValue);
    onChange?.(newValue);
  };

  const renderThumb = (index: number) => {
    const val = Array.isArray(internalValue) ? internalValue[index] : internalValue;
    const isActive = activeThumb === index;
    
    return (
      <motion.div
        key={index}
        ref={(el) => (thumbRefs.current[index] = el)}
        className={getThumbClasses(index, isActive)}
        style={{
          [orientation === 'horizontal' ? 'left' : 'bottom']: getValuePosition(val)
        }}
        onMouseDown={(e) => handleMouseDown(e, index)}
        whileHover={!disabled ? { scale: 1.1 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      />
    );
  };

  const renderMarks = () => {
    if (!showMarks) return null;
    
    const markItems = marks.length > 0 ? marks : [
      { value: min, label: min.toString() },
      { value: max, label: max.toString() }
    ];
    
    return markItems.map((mark) => (
      <div
        key={mark.value}
        className="absolute text-xs text-gray-500"
        style={{
          [orientation === 'horizontal' ? 'left' : 'bottom']: getValuePosition(mark.value),
          [orientation === 'horizontal' ? 'top' : 'left']: orientation === 'horizontal' ? '1rem' : '0.5rem'
        }}
      >
        {mark.label}
      </div>
    ));
  };

  const renderValue = () => {
    if (!showValue) return null;
    
    const displayValue = Array.isArray(internalValue) 
      ? `${internalValue[0]} - ${internalValue[1]}`
      : internalValue;
    
    return (
      <div className={cn(
        'text-sm font-medium',
        orientation === 'horizontal' ? 'mt-2' : 'ml-2',
        error ? 'text-red-600' : 'text-gray-700'
      )}>
        {displayValue}
      </div>
    );
  };

  const renderSlider = () => (
    <div className="relative">
      <div
        ref={sliderRef}
        className={cn(
          'relative',
          orientation === 'horizontal' ? 'w-full' : 'h-full'
        )}
        onClick={handleTrackClick}
      >
        {/* Основная дорожка */}
        <div className={trackClasses} />
        
        {/* Заполненная часть дорожки */}
        <div
          className={cn(
            'absolute rounded-full transition-all duration-200',
            currentVariant.trackFilled,
            orientation === 'horizontal' ? 'top-0 h-full' : 'left-0 w-full'
          )}
          style={getFilledTrackStyle()}
        />
        
        {/* Метки */}
        {renderMarks()}
        
        {/* Ползунки */}
        {range && Array.isArray(internalValue) 
          ? internalValue.map((_, index) => renderThumb(index))
          : renderThumb(0)
        }
      </div>
      
      {/* Отображение значения */}
      {renderValue()}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        {...(props as any)}
      >
        {label && (
          <motion.label
            className={cn(
              'block text-sm font-medium mb-2',
              error ? 'text-red-700' : 'text-gray-700'
            )}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {label}
          </motion.label>
        )}
        
        {renderSlider()}
        
        {error && (
          <motion.p
            className="mt-2 text-sm text-red-600"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {error}
          </motion.p>
        )}
        
        {helpText && !error && (
          <motion.p
            className="mt-2 text-sm text-gray-500"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            {helpText}
          </motion.p>
        )}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={baseClasses} {...props}>
      {label && (
        <label className={cn(
          'block text-sm font-medium mb-2',
          error ? 'text-red-700' : 'text-gray-700'
        )}>
          {label}
        </label>
      )}
      
      {renderSlider()}
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
});

Slider.displayName = 'Slider';

export default Slider;
