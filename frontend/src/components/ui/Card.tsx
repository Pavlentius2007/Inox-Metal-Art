import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  animate?: boolean;
  delay?: number;
  onClick?: () => void;
  interactive?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  hover = false,
  animate = false,
  delay = 0,
  onClick,
  interactive = false,
  ...props
}) => {
  // Варианты стилей
  const variants = {
    default: 'bg-white border border-gray-200 shadow-sm',
    elevated: 'bg-white border border-gray-200 shadow-lg',
    outlined: 'bg-transparent border-2 border-gray-200 shadow-none',
    filled: 'bg-gray-50 border border-gray-200 shadow-sm'
  };

  // Размеры
  const sizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  // Анимации
  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: "easeOut"
      }
    },
    hover: hover ? {
      y: -4,
      transition: { duration: 0.2 }
    } : {}
  };

  const baseClasses = cn(
    'rounded-xl transition-all duration-200',
    variants[variant],
    sizes[size],
    interactive && 'cursor-pointer',
    hover && 'hover:shadow-xl hover:border-gray-300',
    className
  );

  const CardComponent = onClick || interactive ? motion.button : motion.div;

  if (animate) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={animationVariants}
        whileHover={hover ? "hover" : undefined}
      >
        <CardComponent
          className={baseClasses}
          onClick={onClick}
          whileHover={hover ? "hover" : undefined}
          {...props}
        >
          {children}
        </CardComponent>
      </motion.div>
    );
  }

  return (
    <CardComponent
      className={baseClasses}
      onClick={onClick}
      whileHover={hover ? "hover" : undefined}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

// Подкомпоненты для структурирования карточки
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className }) => (
  <div className={cn('mb-4', className)}>
    {children}
  </div>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => (
  <div className={cn('', className)}>
    {children}
  </div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className }) => (
  <div className={cn('mt-4 pt-4 border-t border-gray-100', className)}>
    {children}
  </div>
);

export default Card;
