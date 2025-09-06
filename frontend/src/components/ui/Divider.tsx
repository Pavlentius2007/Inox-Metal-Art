import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'secondary' | 'muted';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  delay?: number;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  size = 'md',
  color = 'default',
  spacing = 'md',
  animate = false,
  delay = 0,
  className,
  ...props
}) => {
  // Варианты стилей
  const variants = {
    solid: 'border-style-solid',
    dashed: 'border-style-dashed',
    dotted: 'border-style-dotted',
    gradient: 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200'
  };

  // Размеры
  const sizes = {
    sm: orientation === 'horizontal' ? 'border-t' : 'border-l',
    md: orientation === 'horizontal' ? 'border-t-2' : 'border-l-2',
    lg: orientation === 'horizontal' ? 'border-t-4' : 'border-l-4'
  };

  // Цвета
  const colors = {
    default: 'border-gray-200',
    primary: 'border-blue-200',
    secondary: 'border-gray-300',
    muted: 'border-gray-100'
  };

  // Отступы
  const spacingClasses = {
    none: '',
    sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    xl: orientation === 'horizontal' ? 'my-8' : 'mx-8'
  };

  // Анимации
  const animationVariants = {
    hidden: orientation === 'horizontal' 
      ? { opacity: 0, scaleX: 0 } 
      : { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleX: orientation === 'horizontal' ? 1 : 1,
      scaleY: orientation === 'horizontal' ? 1 : 1,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: "easeOut"
      }
    }
  };

  const baseClasses = cn(
    'transition-all duration-200',
    variant === 'gradient' ? variants.gradient : cn(variants[variant], sizes[size], colors[color]),
    spacingClasses[spacing],
    orientation === 'vertical' && 'h-full',
    className
  );

  if (animate) {
    return (
      <motion.div
        className={baseClasses}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={animationVariants}
        style={{ transformOrigin: orientation === 'horizontal' ? 'left' : 'top' }}
        {...props}
      />
    );
  }

  return (
    <div className={baseClasses} {...props} />
  );
};

export default Divider;
