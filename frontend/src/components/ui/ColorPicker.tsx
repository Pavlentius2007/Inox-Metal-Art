import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ColorPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  showPreview?: boolean;
  showInput?: boolean;
  presetColors?: string[];
  className?: string;
  animate?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(({
  value: controlledValue,
  defaultValue = '#000000',
  onChange,
  variant = 'default',
  size = 'md',
  disabled = false,
  readOnly = false,
  clearable = true,
  showPreview = true,
  showInput = true,
  presetColors = [
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ffa500', '#800080',
    '#008000', '#800000', '#000080', '#808080', '#c0c0c0'
  ],
  className,
  animate = false,
  onOpenChange,
  ...props
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>(controlledValue || defaultValue);
  const [inputValue, setInputValue] = useState(selectedColor);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Размеры
  const sizes = {
    sm: {
      container: 'h-8',
      input: 'text-sm px-2',
      icon: 'w-4 h-4',
      dropdown: 'w-64',
      preview: 'w-6 h-6'
    },
    md: {
      container: 'h-10',
      input: 'text-sm px-3',
      icon: 'w-4 h-4',
      dropdown: 'w-72',
      preview: 'w-8 h-8'
    },
    lg: {
      container: 'h-12',
      input: 'text-base px-4',
      icon: 'w-5 h-5',
      dropdown: 'w-80',
      preview: 'w-10 h-10'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      container: 'bg-white border border-gray-300 rounded-md shadow-sm',
      containerFocus: 'border-blue-500 ring-1 ring-blue-500',
      containerDisabled: 'bg-gray-50 border-gray-200',
      input: 'text-gray-900 placeholder-gray-500',
      inputDisabled: 'text-gray-500 cursor-not-allowed',
      icon: 'text-gray-400',
      dropdown: 'bg-white border border-gray-200 shadow-lg'
    },
    outlined: {
      container: 'bg-transparent border-2 border-gray-300 rounded-lg',
      containerFocus: 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20',
      containerDisabled: 'border-gray-200 bg-gray-50',
      input: 'text-gray-700 placeholder-gray-500',
      inputDisabled: 'text-gray-400 cursor-not-allowed',
      icon: 'text-gray-500',
      dropdown: 'bg-white border-2 border-gray-200 shadow-lg'
    },
    filled: {
      container: 'bg-gray-100 border border-transparent rounded-lg',
      containerFocus: 'bg-white border-blue-500 ring-1 ring-blue-500',
      containerDisabled: 'bg-gray-50',
      input: 'text-gray-900 placeholder-gray-600',
      inputDisabled: 'text-gray-400 cursor-not-allowed',
      icon: 'text-gray-500',
      dropdown: 'bg-white border border-gray-200 shadow-lg'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'relative inline-block w-full',
    className
  );

  const containerClasses = cn(
    'flex items-center w-full transition-all duration-200',
    currentSize.container,
    currentVariant.container,
    disabled && currentVariant.containerDisabled,
    className
  );

  const inputClasses = cn(
    'flex-1 bg-transparent border-none outline-none placeholder-gray-500 transition-colors duration-200',
    currentSize.input,
    currentVariant.input,
    disabled && currentVariant.inputDisabled
  );

  const iconClasses = cn(
    'flex-shrink-0 p-1',
    currentSize.icon,
    currentVariant.icon
  );

  const dropdownClasses = cn(
    'absolute top-full left-0 z-50 mt-1 rounded-lg',
    currentSize.dropdown,
    currentVariant.dropdown
  );

  const previewClasses = cn(
    'rounded border border-gray-200 shadow-sm',
    currentSize.preview
  );

  // Преобразование HSL в HEX
  const hslToHex = useCallback((h: number, s: number, l: number): string => {
    h /= 360;
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 1) {
      r = c; g = x; b = 0;
    } else if (1 <= h && h < 2) {
      r = x; g = c; b = 0;
    } else if (2 <= h && h < 3) {
      r = 0; g = c; b = x;
    } else if (3 <= h && h < 4) {
      r = 0; g = x; b = c;
    } else if (4 <= h && h < 5) {
      r = x; g = 0; b = c;
    } else if (5 <= h && h < 6) {
      r = c; g = 0; b = x;
    }

    const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
  }, []);

  // Преобразование HEX в HSL
  const hexToHsl = useCallback((hex: string): { h: number; s: number; l: number } => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }, []);

  // Обновление значения
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedColor(controlledValue);
      setInputValue(controlledValue);
      
      if (controlledValue) {
        const hsl = hexToHsl(controlledValue);
        setHue(hsl.h);
        setSaturation(hsl.s);
        setLightness(hsl.l);
      }
    }
  }, [controlledValue, hexToHsl]);

  // Обработчики событий
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.match(/^#[0-9A-Fa-f]{6}$/)) {
      setSelectedColor(value);
      onChange?.(value);
      
      const hsl = hexToHsl(value);
      setHue(hsl.h);
      setSaturation(hsl.s);
      setLightness(hsl.l);
    }
  }, [onChange, hexToHsl]);

  const handleInputFocus = useCallback(() => {
    if (!disabled && !readOnly) {
      setIsOpen(true);
      onOpenChange?.(true);
    }
  }, [disabled, readOnly, onOpenChange]);

  const handleInputBlur = useCallback(() => {
    // Задержка для обработки клика по выпадающему списку
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    }, 100);
  }, [onOpenChange]);

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color);
    setInputValue(color);
    onChange?.(color);
    
    const hsl = hexToHsl(color);
    setHue(hsl.h);
    setSaturation(hsl.s);
    setLightness(hsl.l);
    
    setIsOpen(false);
    onOpenChange?.(false);
    inputRef.current?.blur();
  }, [onChange, onOpenChange, hexToHsl]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultColor = '#000000';
    setSelectedColor(defaultColor);
    setInputValue(defaultColor);
    onChange?.(defaultColor);
  }, [onChange]);

  const handleToggle = useCallback(() => {
    if (disabled || readOnly) return;
    
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onOpenChange?.(newIsOpen);
    
    if (newIsOpen) {
      inputRef.current?.focus();
    }
  }, [disabled, readOnly, isOpen, onOpenChange]);

  const handleHueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(e.target.value);
    setHue(newHue);
    
    const newColor = hslToHex(newHue, saturation, lightness);
    setSelectedColor(newColor);
    setInputValue(newColor);
    onChange?.(newColor);
  }, [saturation, lightness, hslToHex, onChange]);

  const handleSaturationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSaturation = parseInt(e.target.value);
    setSaturation(newSaturation);
    
    const newColor = hslToHex(hue, newSaturation, lightness);
    setSelectedColor(newColor);
    setInputValue(newColor);
    onChange?.(newColor);
  }, [hue, lightness, hslToHex, onChange]);

  const handleLightnessChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newLightness = parseInt(e.target.value);
    setLightness(newLightness);
    
    const newColor = hslToHex(hue, saturation, newLightness);
    setSelectedColor(newColor);
    setInputValue(newColor);
    onChange?.(newColor);
  }, [hue, saturation, hslToHex, onChange]);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  // Закрытие при нажатии Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        onOpenChange?.(false);
        inputRef.current?.blur();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onOpenChange]);

  const renderInput = () => (
    <div className={containerClasses}>
      {showPreview && (
        <div
          className={previewClasses}
          style={{ backgroundColor: selectedColor }}
          title={selectedColor}
        />
      )}
      
      {showInput && (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="#000000"
          disabled={disabled}
          readOnly={readOnly}
          className={inputClasses}
          autoComplete="off"
        />
      )}
      
      <div className="flex items-center space-x-1 pr-2">
        {clearable && selectedColor !== '#000000' && !disabled && !readOnly && (
          <button
            onClick={handleClear}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200"
            aria-label="Сбросить цвет"
          >
            <X className="w-3 h-3 text-gray-400" />
          </button>
        )}
        
        <button
          onClick={handleToggle}
          disabled={disabled || readOnly}
          className={cn(
            'p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
            iconClasses
          )}
          aria-label="Открыть выбор цвета"
        >
          <Palette className="w-full h-full" />
        </button>
      </div>
    </div>
  );

  const renderColorPicker = () => (
    <div className="p-4 space-y-4">
      {/* Предустановленные цвета */}
      <div className="grid grid-cols-8 gap-2">
        {presetColors.map((color, index) => (
          <button
            key={index}
            className={cn(
              'w-8 h-8 rounded border-2 transition-all duration-200 hover:scale-110',
              selectedColor === color ? 'border-blue-500 scale-110' : 'border-gray-200'
            )}
            style={{ backgroundColor: color }}
            onClick={() => handleColorSelect(color)}
            title={color}
          >
            {selectedColor === color && (
              <Check className="w-4 h-4 text-white drop-shadow-lg" />
            )}
          </button>
        ))}
      </div>

      {/* HSL слайдеры */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Оттенок: {hue}°
          </label>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={handleHueChange}
            className="w-full h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-purple-500 to-red-500 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Насыщенность: {saturation}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={saturation}
            onChange={handleSaturationChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(${hue}, 0%, ${lightness}%), hsl(${hue}, 100%, ${lightness}%))`
            }}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Яркость: {lightness}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={lightness}
            onChange={handleLightnessChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(${hue}, ${saturation}%, 0%), hsl(${hue}, ${saturation}%, 50%), hsl(${hue}, ${saturation}%, 100%))`
            }}
          />
        </div>
      </div>

      {/* Текущий цвет */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="text-sm font-medium text-gray-700">Текущий цвет:</span>
        <div className="flex items-center space-x-2">
          <div
            className="w-8 h-8 rounded border border-gray-300"
            style={{ backgroundColor: selectedColor }}
          />
          <span className="text-sm font-mono text-gray-600">{selectedColor}</span>
        </div>
      </div>
    </div>
  );

  const renderDropdown = () => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={dropdownClasses}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ 
            duration: 0.2,
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {renderColorPicker()}
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <div ref={containerRef} className="relative">
          {renderInput()}
          {renderDropdown()}
        </div>
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={baseClasses} {...props}>
      <div ref={containerRef} className="relative">
        {renderInput()}
        {renderDropdown()}
      </div>
    </div>
  );
});

ColorPicker.displayName = 'ColorPicker';

export default ColorPicker;
