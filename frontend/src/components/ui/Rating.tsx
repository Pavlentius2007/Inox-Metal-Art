import React, { forwardRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '../../lib/utils';

interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: number;
  maxValue?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  showValue?: boolean;
  showLabel?: boolean;
  label?: string;
  className?: string;
  animate?: boolean;
  allowHalf?: boolean;
  precision?: number;
}

const Rating = forwardRef<HTMLDivElement, RatingProps>(({
  value,
  maxValue = 5,
  onChange,
  readOnly = false,
  size = 'md',
  variant = 'default',
  showValue = false,
  showLabel = false,
  label,
  className,
  animate = false,
  allowHalf = false,
  precision = 1,
  ...props
}, ref) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  // Размеры
  const sizes = {
    sm: {
      star: 'w-4 h-4',
      container: 'space-x-1',
      text: 'text-sm'
    },
    md: {
      star: 'w-5 h-5',
      container: 'space-x-1',
      text: 'text-base'
    },
    lg: {
      star: 'w-6 h-6',
      container: 'space-x-2',
      text: 'text-lg'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      star: 'text-gray-300',
      starFilled: 'text-yellow-400',
      starHover: 'text-yellow-300',
      starHalf: 'text-yellow-400'
    },
    filled: {
      star: 'text-gray-200',
      starFilled: 'text-yellow-500',
      starHover: 'text-yellow-400',
      starHalf: 'text-yellow-500'
    },
    outlined: {
      star: 'text-transparent stroke-current stroke-2',
      starFilled: 'text-yellow-400 fill-current',
      starHover: 'text-yellow-300 fill-current',
      starHalf: 'text-yellow-400 fill-current'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'inline-flex items-center',
    currentSize.container,
    className
  );

  const starClasses = cn(
    'transition-all duration-200',
    currentSize.star,
    currentVariant.star
  );

  const getStarClasses = (index: number, isHalf = false) => {
    const displayValue = hoverValue !== null ? hoverValue : value;
    const starValue = index + 1;
    
    if (isHalf) {
      const halfValue = index + 0.5;
      if (displayValue >= halfValue) {
        return cn(starClasses, currentVariant.starHalf);
      }
    } else {
      if (displayValue >= starValue) {
        return cn(starClasses, currentVariant.starFilled);
      }
    }
    
    return starClasses;
  };


  const handleStarClick = useCallback((clickedValue: number) => {
    if (readOnly || !onChange) return;
    
    let newValue = clickedValue;
    
    if (allowHalf && precision === 0.5) {
      // Округляем до ближайшего 0.5
      newValue = Math.round(clickedValue * 2) / 2;
    } else if (precision === 1) {
      // Округляем до целого
      newValue = Math.round(clickedValue);
    }
    
    // Ограничиваем значение
    newValue = Math.max(0, Math.min(maxValue, newValue));
    
    onChange(newValue);
  }, [readOnly, onChange, allowHalf, precision, maxValue]);

  const handleStarHover = useCallback((hoverValue: number | null) => {
    if (readOnly) return;
    setHoverValue(hoverValue);
  }, [readOnly]);

  const handleMouseLeave = useCallback(() => {
    if (readOnly) return;
    setHoverValue(null);
  }, [readOnly]);

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const isFilled = (hoverValue !== null ? hoverValue : value) >= starValue;
    const isHalfFilled = allowHalf && (hoverValue !== null ? hoverValue : value) >= index + 0.5 && (hoverValue !== null ? hoverValue : value) < starValue;

    const starElement = (
      <div
        className={cn(
          'relative cursor-pointer transition-all duration-200',
          !readOnly && 'hover:scale-110'
        )}
        onClick={() => handleStarClick(starValue)}
        onMouseEnter={() => handleStarHover(starValue)}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={readOnly ? -1 : 0}
        aria-label={`Оценить ${starValue} из ${maxValue}`}
        aria-pressed={isFilled}
      >
        {isHalfFilled ? (
          <StarHalf className={cn(starClasses, currentVariant.starHalf)} />
        ) : (
          <Star className={cn(starClasses, getStarClasses(index))} />
        )}
      </div>
    );

    if (animate) {
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.2, 
            delay: index * 0.05,
            type: "spring",
            stiffness: 200
          }}
          whileHover={!readOnly ? { scale: 1.1 } : {}}
          whileTap={!readOnly ? { scale: 0.95 } : {}}
        >
          {starElement}
        </motion.div>
      );
    }

    return starElement;
  };

  const renderHalfStar = (index: number) => {
    if (!allowHalf) return null;
    
    const halfValue = index + 0.5;
    const isFilled = (hoverValue !== null ? hoverValue : value) >= halfValue;

    const halfStarElement = (
      <div
        className={cn(
          'relative cursor-pointer transition-all duration-200',
          !readOnly && 'hover:scale-110'
        )}
        onClick={() => handleStarClick(halfValue)}
        onMouseEnter={() => handleStarHover(halfValue)}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={readOnly ? -1 : 0}
        aria-label={`Оценить ${halfValue} из ${maxValue}`}
        aria-pressed={isFilled}
      >
        <StarHalf className={cn(starClasses, getStarClasses(index, true))} />
      </div>
    );

    if (animate) {
      return (
        <motion.div
          key={`half-${index}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.2, 
            delay: (index + 0.5) * 0.05,
            type: "spring",
            stiffness: 200
          }}
          whileHover={!readOnly ? { scale: 1.1 } : {}}
          whileTap={!readOnly ? { scale: 0.95 } : {}}
        >
          {halfStarElement}
        </motion.div>
      );
    }

    return halfStarElement;
  };

  const renderStars = () => {
    const stars = [];
    
    for (let i = 0; i < maxValue; i++) {
      if (allowHalf && i < maxValue - 1) {
        stars.push(renderHalfStar(i));
      }
      stars.push(renderStar(i));
    }
    
    return stars;
  };

  const renderValue = () => {
    if (!showValue) return null;
    
    return (
      <span className={cn(
        'ml-2 font-medium',
        currentSize.text,
        'text-gray-700'
      )}>
        {value.toFixed(precision === 0.5 ? 1 : 0)}/{maxValue}
      </span>
    );
  };

  const renderLabel = () => {
    if (!showLabel || !label) return null;
    
    return (
      <span className={cn(
        'ml-2 text-gray-600',
        currentSize.text
      )}>
        {label}
      </span>
    );
  };

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        role="group"
        aria-label={`Рейтинг: ${value} из ${maxValue}`}
        {...(props as any)}
      >
        {renderStars()}
        {renderValue()}
        {renderLabel()}
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className={baseClasses}
      role="group"
      aria-label={`Рейтинг: ${value} из ${maxValue}`}
      {...props}
    >
      {renderStars()}
      {renderValue()}
      {renderLabel()}
    </div>
  );
});

Rating.displayName = 'Rating';

export default Rating;
