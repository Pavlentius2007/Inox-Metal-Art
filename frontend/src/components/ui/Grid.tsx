import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  colsSm?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  colsLg?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  colsXl?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  gapX?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  gapY?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  stagger?: boolean;
  delay?: number;
  as?: keyof JSX.IntrinsicElements;
}

const Grid: React.FC<GridProps> = ({
  children,
  className,
  cols = 1,
  colsSm,
  colsMd,
  colsLg,
  colsXl,
  gap = 'md',
  gapX,
  gapY,
  animate = false,
  stagger = false,
  delay = 0,
  as: Component = 'div',
  ...props
}) => {
  // Количество колонок
  const getColsClasses = () => {
    const base = `grid-cols-${cols}`;
    const sm = colsSm ? `sm:grid-cols-${colsSm}` : '';
    const md = colsMd ? `md:grid-cols-${colsMd}` : '';
    const lg = colsLg ? `lg:grid-cols-${colsLg}` : '';
    const xl = colsXl ? `xl:grid-cols-${colsXl}` : '';
    
    return cn(base, sm, md, lg, xl);
  };

  // Отступы
  const getGapClasses = () => {
    const gapMap = {
      xs: 'gap-2',
      sm: 'gap-4',
      md: 'gap-6',
      lg: 'gap-8',
      xl: 'gap-12'
    };

    const baseGap = gapMap[gap];
    const gapXClass = gapX ? `gap-x-${gapX === 'xs' ? '2' : gapX === 'sm' ? '4' : gapX === 'md' ? '6' : gapX === 'lg' ? '8' : '12'}` : '';
    const gapYClass = gapY ? `gap-y-${gapY === 'xs' ? '2' : gapY === 'sm' ? '4' : gapY === 'md' ? '6' : gapY === 'lg' ? '8' : '12'}` : '';

    if (gapX || gapY) {
      return cn(gapXClass, gapYClass);
    }

    return baseGap;
  };

  // Анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger ? 0.1 : 0,
        delayChildren: delay
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const baseClasses = cn(
    'grid',
    getColsClasses(),
    getGapClasses(),
    className
  );

  if (animate) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={stagger ? containerVariants : itemVariants}
      >
        <Component className={baseClasses} {...props}>
          {stagger ? (
            React.Children.map(children, (child, index) => (
              <motion.div
                variants={itemVariants}
                custom={index}
              >
                {child}
              </motion.div>
            ))
          ) : (
            children
          )}
        </Component>
      </motion.div>
    );
  }

  return (
    <Component className={baseClasses} {...props}>
      {children}
    </Component>
  );
};

export default Grid;
