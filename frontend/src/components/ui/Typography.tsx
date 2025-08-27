import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'lead';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  children: React.ReactNode;
  className?: string;
  color?: 'default' | 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'warning' | 'error';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right' | 'justify';
  animate?: boolean;
  delay?: number;
}

const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  as,
  children,
  className,
  color = 'default',
  weight = 'normal',
  align = 'left',
  animate = false,
  delay = 0,
  ...props
}) => {
  // Определяем HTML тег на основе variant
  const getTag = () => {
    if (as) return as;
    if (variant.startsWith('h')) return variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    return 'p';
  };

  // Классы для вариантов
  const variantClasses = {
    h1: 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight',
    h2: 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight',
    h3: 'text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-tight',
    h4: 'text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold leading-tight',
    h5: 'text-base md:text-lg lg:text-xl xl:text-2xl font-semibold leading-tight',
    h6: 'text-sm md:text-base lg:text-lg xl:text-xl font-semibold leading-tight',
    body: 'text-sm md:text-base lg:text-lg leading-relaxed',
    caption: 'text-xs md:text-sm leading-relaxed',
    lead: 'text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed'
  };

  // Классы для цветов
  const colorClasses = {
    default: 'text-gray-900 dark:text-gray-100',
    primary: 'text-blue-600 dark:text-blue-400',
    secondary: 'text-gray-700 dark:text-gray-300',
    muted: 'text-gray-500 dark:text-gray-400',
    accent: 'text-yellow-600 dark:text-yellow-400',
    success: 'text-green-600 dark:text-green-400',
    warning: 'text-orange-600 dark:text-orange-400',
    error: 'text-red-600 dark:text-red-400'
  };

  // Классы для веса
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold'
  };

  // Классы для выравнивания
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
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
    }
  };

  const Component = getTag();
  const classes = cn(
    variantClasses[variant],
    colorClasses[color],
    weightClasses[weight],
    alignClasses[align],
    className
  );

  if (animate) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={animationVariants}
      >
        <Component className={classes} {...props}>
          {children}
        </Component>
      </motion.div>
    );
  }

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Typography;
