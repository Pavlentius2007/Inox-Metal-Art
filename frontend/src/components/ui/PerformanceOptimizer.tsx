import React, { memo, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePerformanceMonitor } from '../../hooks/usePerformance';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  componentName: string;
  enableMemoization?: boolean;
  enableCallbackOptimization?: boolean;
  enableIntersectionObserver?: boolean;
}

const PerformanceOptimizer: React.FC<PerformanceOptimizerProps> = memo(({
  children,
  componentName,
  enableMemoization = true,
  enableCallbackOptimization = true,
  enableIntersectionObserver = true
}) => {
  // Performance monitoring
  usePerformanceMonitor(componentName);

  // Memoized values
  const memoizedChildren = useMemo(() => {
    if (!enableMemoization) return children;
    return children;
  }, [children, enableMemoization]);

  // Optimized callbacks
  const handleOptimizedCallback = useCallback(() => {
    if (!enableCallbackOptimization) return;
    // Optimization logic here
  }, [enableCallbackOptimization]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!enableIntersectionObserver) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Component is now visible, trigger optimizations
            handleOptimizedCallback();
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    // Observe the component
    const element = document.querySelector(`[data-component="${componentName}"]`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [componentName, enableIntersectionObserver, handleOptimizedCallback]);

  return (
    <motion.div
      data-component={componentName}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="performance-optimized"
    >
      {memoizedChildren}
    </motion.div>
  );
});

PerformanceOptimizer.displayName = 'PerformanceOptimizer';

export default PerformanceOptimizer;


