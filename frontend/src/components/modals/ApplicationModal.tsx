import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, Mail, MapPin, Package, FileText, Calendar, Upload, File, Trash2 } from 'lucide-react';
import Button from '../ui/Button';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ApplicationFormData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  productType: string;
  quantity: string;
  application: string;
  deadline: string;
  additionalInfo: string;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose }) => {
  // CSS стили для максимального z-index
  React.useEffect(() => {
    if (isOpen) {
      const style = document.createElement('style');
      style.textContent = `
        .modal-backdrop { z-index: 99999 !important; }
        .modal-content { z-index: 999999 !important; }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [isOpen]);
  const [formData, setFormData] = useState<ApplicationFormData>({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    productType: '',
    quantity: '',
    application: '',
    deadline: '',
    additionalInfo: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const productTypes = [
    'Декоративные листы нержавеющей стали',
    'PVD покрытия (золото, бронза, медь)',
    'NAS™ антиотпечаточные покрытия',
    'Художественное травление',
    'Фасадные панели',
    'Интерьерные решения',
    'Специальные покрытия',
    'Другое'
  ];

  const applications = [
    'Архитектура и строительство',
    'Интерьерный дизайн',
    'Мебельная промышленность',
    'Автомобильная промышленность',
    'Медицинское оборудование',
    'Ресторанное оборудование',
    'Выставочные стенды',
    'Другое'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'image/jpeg',
        'image/png',
        'application/zip',
        'application/x-rar-compressed',
        'application/acad',
        'image/vnd.dwg'
      ];
      return allowedTypes.includes(file.type) || file.name.endsWith('.dwg') || file.name.endsWith('.dxf');
    });
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
    if (e.target) e.target.value = '';
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <FileText className="w-5 h-5 text-green-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileText className="w-5 h-5 text-purple-500" />;
      case 'zip':
      case 'rar':
        return <FileText className="w-5 h-5 text-orange-500" />;
      case 'dwg':
      case 'dxf':
        return <FileText className="w-5 h-5 text-gray-500" />;
      default:
        return <File className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Подготавливаем данные для отправки в Telegram
      const telegramData = {
        company_name: formData.companyName,
        contact_person: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        product_type: formData.productType,
        quantity: formData.quantity,
        application: formData.application,
        deadline: formData.deadline || undefined,
        additional_info: formData.additionalInfo || undefined,
        file_paths: uploadedFiles.length > 0 ? JSON.stringify(uploadedFiles.map(f => f.name)) : undefined
      };

      // Отправляем в Telegram
      const telegramResponse = await fetch('http://localhost:8000/api/v1/telegram/send-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telegramData),
      });

      if (telegramResponse.ok) {
        // Также сохраняем в базу данных
        const formDataToSend = new FormData();
        
        // Добавляем текстовые поля в правильном формате (snake_case)
        formDataToSend.append('company_name', formData.companyName);
        formDataToSend.append('contact_person', formData.contactPerson);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('country', formData.country);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('product_type', formData.productType);
        formDataToSend.append('quantity', formData.quantity);
        formDataToSend.append('application', formData.application);
        
        if (formData.deadline) {
          formDataToSend.append('deadline', formData.deadline);
        }
        if (formData.additionalInfo) {
          formDataToSend.append('additional_info', formData.additionalInfo);
        }
        
        // Добавляем файлы
        uploadedFiles.forEach((file) => {
          formDataToSend.append('files', file);
        });

        const dbResponse = await fetch('http://localhost:8000/api/v1/applications/', {
          method: 'POST',
          body: formDataToSend,
        });

        if (!dbResponse.ok) {
          const errorData = await dbResponse.json();
          console.error('Ошибка сохранения в БД:', errorData);
          // Не показываем ошибку пользователю, так как Telegram уже отправлен
        }

        setSubmitSuccess(true);
        setTimeout(() => {
          onClose();
          setSubmitSuccess(false);
          setFormData({
            companyName: '',
            contactPerson: '',
            email: '',
            phone: '',
            country: '',
            city: '',
            productType: '',
            quantity: '',
            application: '',
            deadline: '',
            additionalInfo: ''
          });
          setUploadedFiles([]);
        }, 2000);
      } else {
        const errorData = await telegramResponse.json();
        alert(`Ошибка отправки в Telegram: ${errorData.detail || 'Неизвестная ошибка'}`);
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка при отправке заявки. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 overflow-y-auto modal-backdrop"
        style={{ zIndex: 99999, position: 'fixed' }}
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-[999999] modal-content"
          style={{ zIndex: 999999 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Оставить заявку</h2>
                <p className="text-blue-100 mt-1">
                  Получите персональное предложение по нержавеющей стали
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Заявка отправлена!
                </h3>
                <p className="text-gray-600">
                  Мы свяжемся с вами в ближайшее время для обсуждения деталей
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Название компании *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Введите название компании"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Контактное лицо *
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="ФИО контактного лица"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Страна *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Россия"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Город *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Москва"
                    />
                  </div>
                </div>

                {/* Product Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Тип продукции *
                    </label>
                    <div className="relative">
                      <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        name="productType"
                        value={formData.productType}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="">Выберите тип продукции</option>
                        {productTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Количество *
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="м², шт., кг"
                    />
                  </div>
                </div>

                {/* Application and Deadline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Применение *
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        name="application"
                        value={formData.application}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                      >
                        <option value="">Выберите применение</option>
                        {applications.map((app) => (
                          <option key={app} value={app}>
                            {app}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Желаемые сроки
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Например: 2-3 месяца"
                      />
                    </div>
                  </div>
                </div>

                                 {/* Additional Information */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Дополнительная информация
                   </label>
                   <textarea
                     name="additionalInfo"
                     value={formData.additionalInfo}
                     onChange={handleInputChange}
                     rows={4}
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                     placeholder="Опишите ваши требования, спецификации, особые условия..."
                   />
                 </div>

                 {/* File Upload Section */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">
                     Прикрепить файлы
                   </label>
                   <div className="space-y-4">
                     {/* File Upload Button */}
                     <div className="flex items-center justify-center w-full">
                       <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
                           <Upload className="w-8 h-8 mb-3 text-gray-400" />
                           <p className="mb-2 text-sm text-gray-500">
                             <span className="font-semibold">Нажмите для загрузки</span> или перетащите файлы
                           </p>
                           <p className="text-xs text-gray-500">
                             PDF, DOC, XLS, изображения, чертежи (DWG, DXF), архивы до 10MB
                           </p>
                         </div>
                         <input
                           ref={fileInputRef}
                           type="file"
                           multiple
                           accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip,.rar,.dwg,.dxf"
                           onChange={handleFileSelect}
                           className="hidden"
                         />
                       </label>
                     </div>

                     {/* Uploaded Files List */}
                     {uploadedFiles.length > 0 && (
                       <div className="space-y-2">
                         <h4 className="text-sm font-medium text-gray-700">Загруженные файлы:</h4>
                         {uploadedFiles.map((file, index) => (
                           <div
                             key={index}
                             className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                           >
                             <div className="flex items-center space-x-3">
                               {getFileIcon(file.name)}
                               <div>
                                 <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                 <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                               </div>
                             </div>
                             <button
                               type="button"
                               onClick={() => removeFile(index)}
                               className="text-red-500 hover:text-red-700 transition-colors p-1"
                               title="Удалить файл"
                             >
                               <Trash2 className="w-4 h-4" />
                             </button>
                           </div>
                         ))}
                       </div>
                     )}
                   </div>
                 </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Отправка...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Отправить заявку
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ApplicationModal;
