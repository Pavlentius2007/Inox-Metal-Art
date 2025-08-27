import React, { forwardRef, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, File, Image, Video, Music, FileText, Trash2, Eye, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FileInfo {
  id: string;
  file: File;
  preview?: string;
  progress?: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: FileInfo[];
  onChange?: (files: FileInfo[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // в байтах
  maxFiles?: number;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readOnly?: boolean;
  showPreview?: boolean;
  showProgress?: boolean;
  showFileList?: boolean;
  dragAndDrop?: boolean;
  className?: string;
  animate?: boolean;
  onFileSelect?: (files: File[]) => void;
  onFileRemove?: (fileId: string) => void;
  onFileUpload?: (files: FileInfo[]) => Promise<void>;
}

const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(({
  value: controlledValue,
  onChange,
  multiple = false,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB по умолчанию
  maxFiles = 5,
  variant = 'default',
  size = 'md',
  disabled = false,
  readOnly = false,
  showPreview = true,
  showProgress = true,
  showFileList = true,
  dragAndDrop = true,
  className,
  animate = false,
  onFileSelect,
  onFileRemove,
  onFileUpload,
  ...props
}, ref) => {
  const [files, setFiles] = useState<FileInfo[]>(controlledValue || []);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Размеры
  const sizes = {
    sm: {
      container: 'p-3',
      dropZone: 'p-4',
      button: 'px-3 py-1.5 text-sm',
      icon: 'w-4 h-4',
      fileItem: 'p-2'
    },
    md: {
      container: 'p-4',
      dropZone: 'p-6',
      button: 'px-4 py-2 text-sm',
      icon: 'w-5 h-5',
      fileItem: 'p-3'
    },
    lg: {
      container: 'p-6',
      dropZone: 'p-8',
      button: 'px-6 py-3 text-base',
      icon: 'w-6 h-6',
      fileItem: 'p-4'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      container: 'bg-white border border-gray-200 rounded-lg',
      dropZone: 'border-2 border-dashed border-gray-300 bg-gray-50',
      dropZoneDragOver: 'border-blue-500 bg-blue-50',
      button: 'bg-blue-600 text-white hover:bg-blue-700',
      fileItem: 'bg-white border border-gray-200 rounded-md'
    },
    outlined: {
      container: 'bg-transparent border-2 border-gray-300 rounded-lg',
      dropZone: 'border-2 border-dashed border-gray-300 bg-gray-50',
      dropZoneDragOver: 'border-blue-500 bg-blue-50',
      button: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
      fileItem: 'bg-white border-2 border-gray-200 rounded-md'
    },
    filled: {
      container: 'bg-gray-100 border border-transparent rounded-lg',
      dropZone: 'border-2 border-dashed border-gray-400 bg-gray-200',
      dropZoneDragOver: 'border-blue-500 bg-blue-100',
      button: 'bg-blue-600 text-white hover:bg-blue-700',
      fileItem: 'bg-white border border-gray-200 rounded-md'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'transition-all duration-200',
    currentVariant.container,
    className
  );

  const dropZoneClasses = cn(
    'flex flex-col items-center justify-center text-center transition-all duration-200 cursor-pointer',
    currentSize.dropZone,
    currentVariant.dropZone,
    isDragOver && currentVariant.dropZoneDragOver,
    disabled && 'opacity-50 cursor-not-allowed'
  );

  const buttonClasses = cn(
    'inline-flex items-center space-x-2 font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    currentSize.button,
    currentVariant.button
  );

  const fileItemClasses = cn(
    'flex items-center space-x-3 transition-all duration-200',
    currentSize.fileItem,
    currentVariant.fileItem
  );

  // Получение иконки для типа файла
  const getFileIcon = useCallback((file: File) => {
    const type = file.type.split('/')[0];
    
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5 text-blue-500" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-500" />;
      case 'audio':
        return <Music className="w-5 h-5 text-green-500" />;
      case 'text':
        return <FileText className="w-5 h-5 text-gray-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  }, []);

  // Форматирование размера файла
  const formatFileSize = useCallback((bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }, []);

  // Валидация файла
  const validateFile = useCallback((file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `Файл слишком большой. Максимальный размер: ${formatFileSize(maxSize)}`;
    }
    
    if (accept) {
      const acceptedTypes = accept.split(',').map(type => type.trim());
      const fileType = file.type;
      const fileName = file.name;
      
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileName.toLowerCase().endsWith(type.toLowerCase());
        }
        return fileType.match(new RegExp(type.replace('*', '.*')));
      });
      
      if (!isAccepted) {
        return `Неподдерживаемый тип файла. Разрешены: ${accept}`;
      }
    }
    
    return null;
  }, [maxSize, accept, formatFileSize]);

  // Создание превью для файла
  const createFilePreview = useCallback((file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve('');
      }
    });
  }, []);

  // Обработка выбора файлов
  const handleFileSelect = useCallback(async (selectedFiles: FileList) => {
    if (disabled || readOnly) return;
    
    const fileArray = Array.from(selectedFiles);
    const validFiles: FileInfo[] = [];
    
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        console.warn(`Файл ${file.name} отклонен:`, error);
        continue;
      }
      
      const preview = await createFilePreview(file);
      const fileInfo: FileInfo = {
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview,
        progress: 0,
        status: 'uploading'
      };
      
      validFiles.push(fileInfo);
    }
    
    if (validFiles.length === 0) return;
    
    const newFiles = multiple ? [...files, ...validFiles] : validFiles;
    const limitedFiles = newFiles.slice(0, maxFiles);
    
    setFiles(limitedFiles);
    onChange?.(limitedFiles);
    onFileSelect?.(validFiles.map(f => f.file));
    
    // Автоматическая загрузка
    if (onFileUpload) {
      setIsUploading(true);
      try {
        await onFileUpload(limitedFiles);
        setFiles(prev => prev.map(f => ({ ...f, status: 'success' as const })));
      } catch (error) {
        setFiles(prev => prev.map(f => ({ 
          ...f, 
          status: 'error' as const, 
          error: error instanceof Error ? error.message : 'Ошибка загрузки' 
        })));
      } finally {
        setIsUploading(false);
      }
    }
  }, [disabled, readOnly, multiple, files, maxFiles, onChange, onFileSelect, onFileUpload, validateFile, createFilePreview]);

  // Обработчики событий
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
    }
  }, [handleFileSelect]);

  const handleDropZoneClick = useCallback(() => {
    if (!disabled && !readOnly) {
      fileInputRef.current?.click();
    }
  }, [disabled, readOnly]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !readOnly) {
      setIsDragOver(true);
    }
  }, [disabled, readOnly]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled || readOnly) return;
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles);
    }
  }, [disabled, readOnly, handleFileSelect]);

  const handleFileRemove = useCallback((fileId: string) => {
    if (disabled || readOnly) return;
    
    const newFiles = files.filter(f => f.id !== fileId);
    setFiles(newFiles);
    onChange?.(newFiles);
    onFileRemove?.(fileId);
  }, [disabled, readOnly, files, onChange, onFileRemove]);

  const renderDropZone = () => (
    <div
      ref={dropZoneRef}
      className={dropZoneClasses}
      onClick={handleDropZoneClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label="Выберите файлы для загрузки"
    >
      <Upload className={cn('text-gray-400', currentSize.icon)} />
      <div className="mt-2">
        <p className="text-sm font-medium text-gray-700">
          Перетащите файлы сюда или нажмите для выбора
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {accept && `Поддерживаемые форматы: ${accept}`}
          {maxSize && ` • Максимальный размер: ${formatFileSize(maxSize)}`}
          {maxFiles > 1 && ` • Максимум файлов: ${maxFiles}`}
        </p>
      </div>
    </div>
  );

  const renderFileItem = (fileInfo: FileInfo) => (
    <div key={fileInfo.id} className={fileItemClasses}>
      {showPreview && fileInfo.preview ? (
        <img
          src={fileInfo.preview}
          alt={fileInfo.file.name}
          className="w-10 h-10 object-cover rounded"
        />
      ) : (
        getFileIcon(fileInfo.file)
      )}
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-700 truncate">
          {fileInfo.file.name}
        </p>
        <p className="text-xs text-gray-500">
          {formatFileSize(fileInfo.file.size)}
        </p>
        {fileInfo.error && (
          <p className="text-xs text-red-500">{fileInfo.error}</p>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        {showProgress && fileInfo.status === 'uploading' && (
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${fileInfo.progress || 0}%` }}
            />
          </div>
        )}
        
        {fileInfo.status === 'success' && (
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-3 h-3 text-white" />
          </div>
        )}
        
        {fileInfo.status === 'error' && (
          <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <X className="w-3 h-3 text-white" />
          </div>
        )}
        
        <button
          onClick={() => handleFileRemove(fileInfo.id)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Удалить файл"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const renderFileList = () => {
    if (!showFileList || files.length === 0) return null;
    
    return (
      <div className="mt-4 space-y-2">
        {files.map(renderFileItem)}
      </div>
    );
  };

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        <div className={cn('p-4', currentSize.container)}>
          {renderDropZone()}
          {renderFileList()}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled || readOnly}
        />
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={baseClasses} {...props}>
      <div className={cn('p-4', currentSize.container)}>
        {renderDropZone()}
        {renderFileList()}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled || readOnly}
      />
    </div>
  );
});

FileUpload.displayName = 'FileUpload';

export default FileUpload;
