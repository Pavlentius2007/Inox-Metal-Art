// Image optimization utilities
export const imageOptimization = {
  // Generate responsive image sizes
  getResponsiveSizes: (baseWidth: number) => ({
    sm: Math.round(baseWidth * 0.5),
    md: Math.round(baseWidth * 0.75),
    lg: baseWidth,
    xl: Math.round(baseWidth * 1.5)
  }),

  // Generate srcset for responsive images
  generateSrcSet: (src: string, sizes: number[]) => {
    return sizes
      .map(size => `${src}?w=${size} ${size}w`)
      .join(', ');
  },

  // Lazy loading threshold
  lazyLoadThreshold: 50,

  // Image format optimization
  getOptimalFormat: (originalFormat: string) => {
    const formats: Record<string, string> = {
      jpg: 'webp',
      jpeg: 'webp',
      png: 'webp'
    };
    return formats[originalFormat.toLowerCase()] || originalFormat;
  },

  // Preload critical images
  preloadImage: (src: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }
};


