import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CarouselProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showIndicators?: boolean;
  infinite?: boolean;
  variant?: 'default' | 'cards' | 'gallery';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
  onSlideChange?: (index: number) => void;
}

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(({
  items,
  autoPlay = false,
  autoPlayInterval = 5000,
  showArrows = true,
  showDots = true,
  showIndicators = true,
  infinite = true,
  variant = 'default',
  size = 'md',
  className,
  animate = false,
  onSlideChange,
  ...props
}, ref) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<number | null>(null);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);

  // Размеры
  const sizes = {
    sm: {
      container: 'h-48',
      arrow: 'w-8 h-8',
      dot: 'w-2 h-2'
    },
    md: {
      container: 'h-64',
      arrow: 'w-10 h-10',
      dot: 'w-3 h-3'
    },
    lg: {
      container: 'h-80',
      arrow: 'w-12 h-12',
      dot: 'w-4 h-4'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      container: 'bg-white rounded-lg shadow-md',
      arrow: 'bg-white/80 hover:bg-white text-gray-800 hover:text-gray-900 shadow-lg',
      dot: 'bg-gray-300 hover:bg-gray-400',
      dotActive: 'bg-blue-600'
    },
    cards: {
      container: 'bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-xl',
      arrow: 'bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 shadow-lg backdrop-blur-sm',
      dot: 'bg-gray-300/60 hover:bg-gray-400/80',
      dotActive: 'bg-blue-500'
    },
    gallery: {
      container: 'bg-black/5 rounded-2xl shadow-2xl',
      arrow: 'bg-black/20 hover:bg-black/40 text-white backdrop-blur-md',
      dot: 'bg-white/40 hover:bg-white/60',
      dotActive: 'bg-white'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'relative overflow-hidden',
    currentSize.container,
    currentVariant.container,
    className
  );

  const arrowClasses = cn(
    'absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    currentSize.arrow,
    currentVariant.arrow
  );

  const dotClasses = cn(
    'w-full h-full rounded-full transition-all duration-200 cursor-pointer',
    currentVariant.dot
  );

  const dotActiveClasses = cn(
    dotClasses,
    currentVariant.dotActive
  );

  // Автопрокрутка
  useEffect(() => {
    if (autoPlay && isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, isAutoPlaying, autoPlayInterval, currentIndex]);

  // Пауза автопрокрутки при наведении
  const handleMouseEnter = useCallback(() => {
    if (autoPlay) {
      setIsAutoPlaying(false);
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }
  }, [autoPlay]);

  const handleMouseLeave = useCallback(() => {
    if (autoPlay) {
      setIsAutoPlaying(true);
    }
  }, [autoPlay]);

  // Навигация
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    onSlideChange?.(index);
    
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, isTransitioning, onSlideChange]);

  const goToNext = useCallback(() => {
    if (currentIndex === items.length - 1) {
      if (infinite) {
        goToSlide(0);
      }
    } else {
      goToSlide(currentIndex + 1);
    }
  }, [currentIndex, items.length, infinite, goToSlide]);

  const goToPrevious = useCallback(() => {
    if (currentIndex === 0) {
      if (infinite) {
        goToSlide(items.length - 1);
      }
    } else {
      goToSlide(currentIndex - 1);
    }
  }, [currentIndex, items.length, infinite, goToSlide]);

  // Свайп на мобильных устройствах
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    
    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
    
    touchStartRef.current = null;
    touchEndRef.current = null;
  }, [goToNext, goToPrevious]);

  // Клавиатурная навигация
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        goToPrevious();
        break;
      case 'ArrowRight':
        e.preventDefault();
        goToNext();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(0);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(items.length - 1);
        break;
    }
  }, [goToPrevious, goToNext, goToSlide, items.length]);

  if (items.length === 0) {
    return null;
  }

  const renderArrows = () => {
    if (!showArrows) return null;

    return (
      <>
        <button
          className={cn(arrowClasses, 'left-4')}
          onClick={goToPrevious}
          disabled={!infinite && currentIndex === 0}
          aria-label="Предыдущий слайд"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          className={cn(arrowClasses, 'right-4')}
          onClick={goToNext}
          disabled={!infinite && currentIndex === items.length - 1}
          aria-label="Следующий слайд"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </>
    );
  };

  const renderDots = () => {
    if (!showDots) return null;

    return (
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              currentSize.dot
            )}
            onClick={() => goToSlide(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          >
            <div className={index === currentIndex ? dotActiveClasses : dotClasses} />
          </button>
        ))}
      </div>
    );
  };

  const renderIndicators = () => {
    if (!showIndicators) return null;

    return (
      <div className="absolute top-4 right-4 z-10 bg-black/20 text-white px-2 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
        {currentIndex + 1} / {items.length}
      </div>
    );
  };

  const renderContent = () => {
    if (animate) {
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="w-full h-full flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      );
    }

    return (
      <div className="w-full h-full flex items-center justify-center">
        {items[currentIndex]}
      </div>
    );
  };

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Карусель"
        aria-live="polite"
        {...(props as any)}
      >
        {renderContent()}
        {renderArrows()}
        {renderDots()}
        {renderIndicators()}
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className={baseClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Карусель"
      aria-live="polite"
      {...props}
    >
      {renderContent()}
      {renderArrows()}
      {renderDots()}
      {renderIndicators()}
    </div>
  );
});

Carousel.displayName = 'Carousel';

export default Carousel;
