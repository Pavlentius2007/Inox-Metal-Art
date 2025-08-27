import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Upload, X, FileText, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';

interface ApplicationFormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  product_type: 'plates' | 'tubes' | 'profiles' | 'coatings' | 'other';
  description: string;
}

const ApplicationForm: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('company', data.company);
      formData.append('phone', data.phone);
      formData.append('email', data.email);
      formData.append('product_type', data.product_type);
      formData.append('description', data.description);
      
      files.forEach((file) => {
        formData.append('files', file);
      });

      await axios.post('http://localhost:8000/api/v1/applications/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsSubmitted(true);
      reset();
      setFiles([]);
      
      // Сброс состояния через 5 секунд
      setTimeout(() => setIsSubmitted(false), 5000);
      
    } catch (error) {
      console.error('Ошибка отправки заявки:', error);
      alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 text-center shadow-xl"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-steel-900 mb-4">
          Заявка отправлена!
        </h3>
        <p className="text-steel-600 mb-6">
          Спасибо за обращение! Наши специалисты свяжутся с вами в ближайшее время.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="bg-accent-500 hover:bg-accent-600 text-steel-900 font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
        >
          Отправить еще одну заявку
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-serif font-bold text-steel-900 mb-4">
          Оставить заявку
        </h2>
        <p className="text-steel-600">
          Заполните форму, и мы свяжемся с вами для обсуждения деталей проекта
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-steel-700 mb-2">
              Имя *
            </label>
            <input
              {...register('name', { required: 'Имя обязательно' })}
              className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-300"
              placeholder="Ваше имя"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-steel-700 mb-2">
              Компания *
            </label>
            <input
              {...register('company', { required: 'Название компании обязательно' })}
              className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-300"
              placeholder="Название компании"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-steel-700 mb-2">
              Телефон *
            </label>
            <input
              {...register('phone', { required: 'Телефон обязателен' })}
              className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-300"
              placeholder="+7 (999) 123-45-67"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-steel-700 mb-2">
              Email *
            </label>
            <input
              {...register('email', { 
                required: 'Email обязателен',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Некорректный email'
                }
              })}
              className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-300"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-steel-700 mb-2">
            Тип продукции *
          </label>
          <select
            {...register('product_type', { required: 'Выберите тип продукции' })}
            className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-300"
          >
            <option value="">Выберите тип продукции</option>
            <option value="plates">Плиты и листы</option>
            <option value="tubes">Трубы</option>
            <option value="profiles">Профили</option>
            <option value="coatings">Покрытия</option>
            <option value="other">Другое</option>
          </select>
          {errors.product_type && (
            <p className="text-red-500 text-sm mt-1">{errors.product_type.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-steel-700 mb-2">
            Описание потребности *
          </label>
          <textarea
            {...register('description', { required: 'Описание обязательно' })}
            rows={4}
            className="w-full px-4 py-3 border border-steel-300 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-colors duration-300"
            placeholder="Опишите ваш проект, требования к продукции, объемы..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-steel-700 mb-2">
            Прикрепить файлы (чертежи, фото, документы)
          </label>
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
              dragActive 
                ? 'border-accent-500 bg-accent-50' 
                : 'border-steel-300 hover:border-accent-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-steel-400 mx-auto mb-4" />
            <p className="text-steel-600 mb-2">
              Перетащите файлы сюда или{' '}
              <label className="text-accent-600 hover:text-accent-700 cursor-pointer font-medium">
                выберите файлы
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg,.dxf"
                />
              </label>
            </p>
            <p className="text-sm text-steel-500">
              Поддерживаемые форматы: PDF, DOC, JPG, PNG, DWG, DXF
            </p>
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-steel-700">Выбранные файлы:</h4>
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-steel-50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-steel-500" />
                  <span className="text-sm text-steel-700">{file.name}</span>
                  <span className="text-xs text-steel-500">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-steel-400 hover:text-red-500 transition-colors duration-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-steel-300 text-steel-900 font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-steel-900 border-t-transparent rounded-full animate-spin"></div>
              Отправка...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Отправить заявку
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default ApplicationForm;

