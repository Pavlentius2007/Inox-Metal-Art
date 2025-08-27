import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import Container from './Container';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  containerPadding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'default' | 'light' | 'dark' | 'gradient' | 'pattern';
  animate?: boolean;
  delay?: number;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  containerSize = 'lg',
  containerPadding = 'md',
  padding = 'lg',
  background = 'default',
  animate = false,
  delay = 0,
  id,
  ...props
}) => {
  // Отступы секции
  const paddingClasses = {
    none: '',
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16 lg:py-20',
    xl: 'py-20 lg:py-24 xl:py-32'
  };

  // Фоны
  const backgroundClasses = {
    default: 'bg-white',
    light: 'bg-gray-50',
    dark: 'bg-gray-900 text-white',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    pattern: 'bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'
  };

  // Анимации
  const animationVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: "easeOut"
      }
    }
  };

  const baseClasses = cn(
    'relative',
    paddingClasses[padding],
    backgroundClasses[background],
    className
  );

  if (animate) {
    return (
      <motion.section
        id={id}
        className={baseClasses}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={animationVariants}
        {...props}
      >
        <Container size={containerSize} padding={containerPadding}>
          {children}
        </Container>
      </motion.section>
    );
  }

  return (
    <section id={id} className={baseClasses} {...props}>
      <Container size={containerSize} padding={containerPadding}>
        {children}
      </Container>
    </section>
  );
};

export default Section;
