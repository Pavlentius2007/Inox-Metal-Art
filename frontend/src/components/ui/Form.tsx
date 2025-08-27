import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    custom?: (value: any) => string | null;
  };
  error?: string;
  helpText?: string;
  className?: string;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  submitText?: string;
  variant?: 'default' | 'card' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  layout?: 'vertical' | 'horizontal' | 'grid';
  columns?: 1 | 2 | 3;
  className?: string;
  loading?: boolean;
  animate?: boolean;
}

const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  submitText = 'Отправить',
  variant = 'default',
  size = 'md',
  layout = 'vertical',
  columns = 1,
  className,
  loading = false,
  animate = false,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const handleBlur = (fieldId: string) => {
    setTouched(prev => ({ ...prev, [fieldId]: true }));
    validateField(fieldId, formData[fieldId]);
  };

  const validateField = (fieldId: string, value: any): string | null => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return null;

    // Required validation
    if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return 'Это поле обязательно для заполнения';
    }

    // Pattern validation
    if (field.validation?.pattern && value) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) {
        return 'Неверный формат';
      }
    }

    // Length validation
    if (field.validation?.minLength && value && value.length < field.validation.minLength) {
      return `Минимальная длина: ${field.validation.minLength} символов`;
    }

    if (field.validation?.maxLength && value && value.length > field.validation.maxLength) {
      return `Максимальная длина: ${field.validation.maxLength} символов`;
    }

    // Number validation
    if (field.type === 'number' && value) {
      if (field.validation?.min !== undefined && Number(value) < field.validation.min) {
        return `Минимальное значение: ${field.validation.min}`;
      }
      if (field.validation?.max !== undefined && Number(value) > field.validation.max) {
        return `Максимальное значение: ${field.validation.max}`;
      }
    }

    // Custom validation
    if (field.validation?.custom) {
      const customError = field.validation.custom(value);
      if (customError) return customError;
    }

    return null;
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach(field => {
      const error = validateField(field.id, formData[field.id]);
      if (error) {
        newErrors[field.id] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field: FormField) => {
    const fieldError = errors[field.id];
    const isTouched = touched[field.id];
    const showError = fieldError && isTouched;

    const baseInputClasses = cn(
      'w-full border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
      {
        'border-red-300 focus:ring-red-500 focus:border-red-500': showError,
        'border-gray-300': !showError,
        'bg-gray-50 cursor-not-allowed': field.disabled,
      }
    );

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg'
    };

    const inputClasses = cn(baseInputClasses, sizeClasses[size]);

    const renderInput = () => {
      switch (field.type) {
        case 'textarea':
          return (
            <textarea
              id={field.id}
              name={field.id}
              placeholder={field.placeholder}
              required={field.required}
              disabled={field.disabled}
              value={formData[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              onBlur={() => handleBlur(field.id)}
              className={cn(inputClasses, 'resize-vertical min-h-[100px]')}
              rows={4}
            />
          );

        case 'select':
          return (
            <select
              id={field.id}
              name={field.id}
              required={field.required}
              disabled={field.disabled}
              value={formData[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              onBlur={() => handleBlur(field.id)}
              className={inputClasses}
            >
              <option value="">{field.placeholder || 'Выберите опцию'}</option>
              {field.options?.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          );

        case 'checkbox':
          return (
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id={field.id}
                name={field.id}
                required={field.required}
                disabled={field.disabled}
                checked={formData[field.id] || false}
                onChange={(e) => handleInputChange(field.id, e.target.checked)}
                onBlur={() => handleBlur(field.id)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm text-gray-700">{field.helpText}</span>
            </div>
          );

        case 'radio':
          return (
            <div className="space-y-2">
              {field.options?.map(option => (
                <div key={option.value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={`${field.id}-${option.value}`}
                    name={field.id}
                    value={option.value}
                    required={field.required}
                    disabled={field.disabled}
                    checked={formData[field.id] === option.value}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    onBlur={() => handleBlur(field.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor={`${field.id}-${option.value}`} className="text-sm text-gray-700">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          );

        case 'file':
          return (
            <input
              type="file"
              id={field.id}
              name={field.id}
              required={field.required}
              disabled={field.disabled}
              onChange={(e) => handleInputChange(field.id, e.target.files?.[0])}
              onBlur={() => handleBlur(field.id)}
              className={cn(inputClasses, 'file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100')}
            />
          );

        default:
          return (
            <input
              type={field.type}
              id={field.id}
              name={field.id}
              placeholder={field.placeholder}
              required={field.required}
              disabled={field.disabled}
              value={formData[field.id] || ''}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              onBlur={() => handleBlur(field.id)}
              className={inputClasses}
            />
          );
      }
    };

    return (
      <div key={field.id} className={cn('space-y-2', field.className)}>
        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        
        {renderInput()}
        
        {showError && (
          <p className="text-sm text-red-600">{fieldError}</p>
        )}
        
        {field.helpText && !showError && (
          <p className="text-sm text-gray-500">{field.helpText}</p>
        )}
      </div>
    );
  };

  // Варианты стилей
  const variants = {
    default: 'space-y-6',
    card: 'bg-white border border-gray-200 rounded-lg shadow-sm p-6 space-y-6',
    minimal: 'space-y-4'
  };

  // Макеты
  const layouts = {
    vertical: 'space-y-6',
    horizontal: 'space-y-6',
    grid: `grid grid-cols-1 gap-6 ${columns > 1 ? `md:grid-cols-${columns}` : ''}`
  };

  const baseClasses = cn(
    'w-full',
    variants[variant],
    layouts[layout],
    className
  );

  if (animate) {
    return (
      <motion.form
        onSubmit={handleSubmit}
        className={baseClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {fields.map(renderField)}
        
        <motion.button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? 'Отправка...' : submitText}
        </motion.button>
      </motion.form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={baseClasses}>
      {fields.map(renderField)}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {loading ? 'Отправка...' : submitText}
      </button>
    </form>
  );
};

export default Form;
