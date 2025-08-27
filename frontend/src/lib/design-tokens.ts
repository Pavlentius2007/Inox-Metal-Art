// Дизайн-токены для систематизации UI компонентов
export const designTokens = {
  // Цветовая схема
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    accent: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    }
  },

  // Размеры и отступы
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
  },

  // Типографика
  typography: {
    h1: {
      fontSize: '2.25rem',      // 36px
      lineHeight: '2.5rem',     // 40px
      fontWeight: '700',
      mobile: {
        fontSize: '1.875rem',   // 30px
        lineHeight: '2.25rem',  // 36px
      }
    },
    h2: {
      fontSize: '1.875rem',     // 30px
      lineHeight: '2.25rem',    // 36px
      fontWeight: '600',
      mobile: {
        fontSize: '1.5rem',     // 24px
        lineHeight: '2rem',     // 32px
      }
    },
    h3: {
      fontSize: '1.5rem',       // 24px
      lineHeight: '2rem',       // 32px
      fontWeight: '600',
      mobile: {
        fontSize: '1.25rem',    // 20px
        lineHeight: '1.75rem',  // 28px
      }
    },
    h4: {
      fontSize: '1.25rem',      // 20px
      lineHeight: '1.75rem',    // 28px
      fontWeight: '600',
      mobile: {
        fontSize: '1.125rem',   // 18px
        lineHeight: '1.75rem',  // 28px
      }
    },
    body: {
      fontSize: '1rem',         // 16px
      lineHeight: '1.75rem',    // 28px
      fontWeight: '400',
      mobile: {
        fontSize: '0.875rem',   // 14px
        lineHeight: '1.5rem',   // 24px
      }
    },
    caption: {
      fontSize: '0.875rem',     // 14px
      lineHeight: '1.25rem',    // 20px
      fontWeight: '400',
      mobile: {
        fontSize: '0.75rem',    // 12px
        lineHeight: '1rem',     // 16px
      }
    }
  },

  // Тени
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  // Скругления
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    full: '9999px',
  },

  // Анимации
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
};

// Утилиты для работы с токенами
export const getResponsiveValue = (desktop: string, mobile: string) => ({
  base: mobile,
  md: desktop
});

export const getColor = (colorPath: string) => {
  const path = colorPath.split('.');
  let value: any = designTokens.colors;
  
  for (const key of path) {
    value = value[key];
  }
  
  return value;
};

export const getSpacing = (size: keyof typeof designTokens.spacing) => {
  return designTokens.spacing[size];
};

export const getTypography = (variant: keyof typeof designTokens.typography) => {
  return designTokens.typography[variant];
};
