import React, { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Tag } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TagInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  maxTags?: number;
  minTagLength?: number;
  maxTagLength?: number;
  allowDuplicates?: boolean;
  validateTag?: (tag: string) => string | null;
  className?: string;
  animate?: boolean;
  onTagAdd?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  onTagUpdate?: (oldTag: string, newTag: string) => void;
}

const TagInput = forwardRef<HTMLDivElement, TagInputProps>(({
  value: controlledValue,
  defaultValue = [],
  onChange,
  placeholder = 'Введите тег и нажмите Enter...',
  variant = 'default',
  size = 'md',
  disabled = false,
  readOnly = false,
  clearable = true,
  maxTags = 10,
  minTagLength = 1,
  maxTagLength = 50,
  allowDuplicates = false,
  validateTag,
  className,
  animate = false,
  onTagAdd,
  onTagRemove,
  onTagUpdate,
  ...props
}, ref) => {
  const [tags, setTags] = useState<string[]>(controlledValue || defaultValue);
  const [inputValue, setInputValue] = useState('');
  const [editingTag, setEditingTag] = useState<{ index: number; value: string } | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Размеры
  const sizes = {
    sm: {
      container: 'min-h-8',
      input: 'text-sm px-2',
      icon: 'w-4 h-4',
      button: 'p-1',
      tag: 'px-2 py-0.5 text-xs',
      editInput: 'px-2 py-0.5 text-xs'
    },
    md: {
      container: 'min-h-10',
      input: 'text-sm px-3',
      icon: 'w-4 h-4',
      button: 'p-1.5',
      tag: 'px-2 py-1 text-xs',
      editInput: 'px-2 py-1 text-xs'
    },
    lg: {
      container: 'min-h-12',
      input: 'text-base px-4',
      icon: 'w-5 h-5',
      button: 'p-2',
      tag: 'px-3 py-1.5 text-sm',
      editInput: 'px-3 py-1.5 text-sm'
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
      button: 'text-gray-400 hover:text-gray-600',
      tag: 'bg-blue-100 text-blue-800 border-blue-200',
      tagRemove: 'text-blue-600 hover:bg-blue-200',
      tagEdit: 'bg-white border-blue-300'
    },
    outlined: {
      container: 'bg-transparent border-2 border-gray-300 rounded-lg',
      containerFocus: 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20',
      containerDisabled: 'border-gray-200 bg-gray-50',
      input: 'text-gray-700 placeholder-gray-500',
      inputDisabled: 'text-gray-400 cursor-not-allowed',
      icon: 'text-gray-500',
      button: 'text-gray-500 hover:text-gray-700',
      tag: 'bg-blue-50 text-blue-700 border-blue-300',
      tagRemove: 'text-blue-600 hover:bg-blue-100',
      tagEdit: 'bg-white border-blue-400'
    },
    filled: {
      container: 'bg-gray-100 border border-transparent rounded-lg',
      containerFocus: 'bg-white border-blue-500 ring-1 ring-blue-500',
      containerDisabled: 'bg-gray-50',
      input: 'text-gray-900 placeholder-gray-600',
      inputDisabled: 'text-gray-400 cursor-not-allowed',
      icon: 'text-gray-500',
      button: 'text-gray-500 hover:text-gray-700',
      tag: 'bg-blue-100 text-blue-800 border-blue-200',
      tagRemove: 'text-blue-600 hover:bg-blue-200',
      tagEdit: 'bg-white border-blue-300'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'relative inline-block w-full',
    className
  );

  const containerClasses = cn(
    'flex flex-wrap items-center w-full transition-all duration-200',
    currentSize.container,
    currentVariant.container,
    isFocused && currentVariant.containerFocus,
    disabled && currentVariant.containerDisabled,
    className
  );

  const inputClasses = cn(
    'flex-1 bg-transparent border-none outline-none placeholder-gray-500 transition-colors duration-200 min-w-0',
    currentSize.input,
    currentVariant.input,
    disabled && currentVariant.inputDisabled
  );

  const iconClasses = cn(
    'flex-shrink-0',
    currentSize.icon,
    currentVariant.icon
  );

  const buttonClasses = cn(
    'flex-shrink-0 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    currentSize.button,
    currentVariant.button
  );

  const tagClasses = cn(
    'inline-flex items-center space-x-1 rounded-full border transition-all duration-200',
    currentSize.tag,
    currentVariant.tag
  );

  const tagRemoveClasses = cn(
    'rounded-full p-0.5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    currentVariant.tagRemove
  );

  const tagEditClasses = cn(
    'inline-block rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    currentSize.editInput,
    currentVariant.tagEdit
  );

  // Обновление значения
  useEffect(() => {
    if (controlledValue !== undefined) {
      setTags(controlledValue);
    }
  }, [controlledValue]);

  // Валидация тега
  const validateTagInput = useCallback((tag: string): string | null => {
    if (tag.length < minTagLength) {
      return `Тег должен содержать минимум ${minTagLength} символ`;
    }
    
    if (tag.length > maxTagLength) {
      return `Тег не должен превышать ${maxTagLength} символов`;
    }
    
    if (!allowDuplicates && tags.includes(tag)) {
      return 'Такой тег уже существует';
    }
    
    if (validateTag) {
      return validateTag(tag);
    }
    
    return null;
  }, [minTagLength, maxTagLength, allowDuplicates, tags, validateTag]);

  // Обработчики событий
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  }, []);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      e.preventDefault();
      removeTag(tags[tags.length - 1]);
    } else if (e.key === 'Escape') {
      setInputValue('');
      setEditingTag(null);
    }
  }, [inputValue, tags]);

  const handleInputFocus = useCallback(() => {
    if (!disabled && !readOnly) {
      setIsFocused(true);
    }
  }, [disabled, readOnly]);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // Добавляем тег при потере фокуса, если есть введенный текст
    if (inputValue.trim()) {
      addTag(inputValue.trim());
    }
  }, [inputValue]);

  const addTag = useCallback((tag: string) => {
    if (!tag || disabled || readOnly) return;
    
    const error = validateTagInput(tag);
    if (error) {
      console.warn('Ошибка валидации тега:', error);
      return;
    }
    
    if (maxTags && tags.length >= maxTags) {
      console.warn('Достигнут максимальный лимит тегов');
      return;
    }
    
    const newTags = [...tags, tag];
    setTags(newTags);
    onChange?.(newTags);
    onTagAdd?.(tag);
    setInputValue('');
  }, [tag, disabled, readOnly, validateTagInput, maxTags, tags, onChange, onTagAdd]);

  const removeTag = useCallback((tagToRemove: string) => {
    if (disabled || readOnly) return;
    
    const newTags = tags.filter(tag => tag !== tagToRemove);
    setTags(newTags);
    onChange?.(newTags);
    onTagRemove?.(tagToRemove);
  }, [disabled, readOnly, tags, onChange, onTagRemove]);

  const startEditingTag = useCallback((index: number, value: string) => {
    if (disabled || readOnly) return;
    
    setEditingTag({ index, value });
    setInputValue('');
  }, [disabled, readOnly]);

  const saveEditedTag = useCallback((newValue: string) => {
    if (!editingTag || !newValue.trim()) {
      setEditingTag(null);
      return;
    }
    
    const error = validateTagInput(newValue.trim());
    if (error) {
      console.warn('Ошибка валидации тега:', error);
      return;
    }
    
    const oldTag = tags[editingTag.index];
    const newTags = [...tags];
    newTags[editingTag.index] = newValue.trim();
    
    setTags(newTags);
    onChange?.(newTags);
    onTagUpdate?.(oldTag, newValue.trim());
    setEditingTag(null);
  }, [editingTag, validateTagInput, tags, onChange, onTagUpdate]);

  const cancelEditingTag = useCallback(() => {
    setEditingTag(null);
  }, []);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setTags([]);
    onChange?.([]);
  }, [onChange]);

  const handleTagKeyDown = useCallback((e: React.KeyboardEvent, tag: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEditedTag(inputValue.trim());
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEditingTag();
    }
  }, [inputValue, saveEditedTag, cancelEditingTag]);

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (editingTag) {
          saveEditedTag(inputValue.trim());
        }
      }
    };

    if (editingTag) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingTag, inputValue, saveEditedTag]);

  const renderTags = () => (
    <div className="flex flex-wrap items-center gap-1">
      {tags.map((tag, index) => (
        <div key={`${tag}-${index}`} className="relative">
          {editingTag?.index === index ? (
            <input
              type="text"
              defaultValue={editingTag.value}
              onKeyDown={(e) => handleTagKeyDown(e, tag)}
              onBlur={() => saveEditedTag(inputValue.trim())}
              className={tagEditClasses}
              autoFocus
            />
          ) : (
            <span className={tagClasses}>
              <Tag className="w-3 h-3" />
              <span className="truncate">{tag}</span>
              <button
                type="button"
                onClick={() => startEditingTag(index, tag)}
                className="rounded-full p-0.5 text-blue-600 hover:bg-blue-200 transition-colors duration-200"
                aria-label={`Редактировать ${tag}`}
              >
                <Tag className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className={tagRemoveClasses}
                aria-label={`Удалить ${tag}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      ))}
    </div>
  );

  const renderInput = () => (
    <div className="flex-1 min-w-0">
      {tags.length > 0 && renderTags()}
      
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
        disabled={disabled}
        readOnly={readOnly}
        className={inputClasses}
        autoComplete="off"
      />
    </div>
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
          <div className={containerClasses}>
            {renderInput()}
            
            <div className="flex items-center space-x-1 pr-2">
              {clearable && tags.length > 0 && !disabled && !readOnly && (
                <button
                  onClick={handleClear}
                  className={buttonClasses}
                  aria-label="Очистить все теги"
                >
                  <X className="w-full h-full" />
                </button>
              )}
              
              {tags.length < (maxTags || Infinity) && !disabled && !readOnly && (
                <button
                  onClick={() => addTag(inputValue.trim())}
                  disabled={!inputValue.trim()}
                  className={cn(
                    buttonClasses,
                    'text-green-600 hover:text-green-700',
                    !inputValue.trim() && 'opacity-50 cursor-not-allowed'
                  )}
                  aria-label="Добавить тег"
                >
                  <Plus className="w-full h-full" />
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={baseClasses} {...props}>
      <div ref={containerRef} className="relative">
        <div className={containerClasses}>
          {renderInput()}
          
          <div className="flex items-center space-x-1 pr-2">
            {clearable && tags.length > 0 && !disabled && !readOnly && (
              <button
                onClick={handleClear}
                className={buttonClasses}
                aria-label="Очистить все теги"
              >
                <X className="w-full h-full" />
              </button>
            )}
            
            {tags.length < (maxTags || Infinity) && !disabled && !readOnly && (
              <button
                onClick={() => addTag(inputValue.trim())}
                disabled={!inputValue.trim()}
                className={cn(
                  buttonClasses,
                  'text-green-600 hover:text-green-700',
                  !inputValue.trim() && 'opacity-50 cursor-not-allowed'
                )}
                aria-label="Добавить тег"
              >
                <Plus className="w-full h-full" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

TagInput.displayName = 'TagInput';

export default TagInput;
