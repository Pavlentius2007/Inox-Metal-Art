import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted' | 'white';
  className?: string;
  animate?: boolean;
  delay?: number;
  spin?: boolean;
  pulse?: boolean;
}

const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  size = 'md',
  color = 'default',
  className,
  animate = false,
  delay = 0,
  spin = false,
  pulse = false,
  ...props
}) => {
  // Размеры
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-12 h-12'
  };

  // Цвета
  const colors = {
    default: 'text-gray-700',
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    muted: 'text-gray-400',
    white: 'text-white'
  };

  // Анимации
  const animationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeOut"
      }
    }
  };

  const baseClasses = cn(
    'transition-all duration-200',
    sizes[size],
    colors[color],
    spin && 'animate-spin',
    pulse && 'animate-pulse',
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
        <IconComponent className={baseClasses} {...props} />
      </motion.div>
    );
  }

  return (
    <IconComponent className={baseClasses} {...props} />
  );
};

export default Icon;
