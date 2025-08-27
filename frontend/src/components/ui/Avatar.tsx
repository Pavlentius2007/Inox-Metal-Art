import React, { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Edit3 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AvatarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'default' | 'rounded' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  showStatus?: boolean;
  editable?: boolean;
  onImageChange?: (file: File) => void;
  fallback?: React.ReactNode;
  className?: string;
  animate?: boolean;
  loading?: boolean;
  error?: boolean;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({
  src,
  alt = 'Avatar',
  size = 'md',
  variant = 'default',
  status,
  showStatus = false,
  editable = false,
  onImageChange,
  fallback,
  className,
  animate = false,
  loading = false,
  error = false,
  ...props
}, ref) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Размеры
  const sizes = {
    xs: {
      container: 'w-6 h-6',
      text: 'text-xs',
      status: 'w-1.5 h-1.5',
      icon: 'w-3 h-3',
      editIcon: 'w-2.5 h-2.5'
    },
    sm: {
      container: 'w-8 h-8',
      text: 'text-sm',
      status: 'w-2 h-2',
      icon: 'w-4 h-4',
      editIcon: 'w-3 h-3'
    },
    md: {
      container: 'w-10 h-10',
      text: 'text-base',
      status: 'w-2.5 h-2.5',
      icon: 'w-5 h-5',
      editIcon: 'w-4 h-4'
    },
    lg: {
      container: 'w-12 h-12',
      text: 'text-lg',
      status: 'w-3 h-3',
      icon: 'w-6 h-6',
      editIcon: 'w-5 h-5'
    },
    xl: {
      container: 'w-16 h-16',
      text: 'text-xl',
      status: 'w-3.5 h-3.5',
      icon: 'w-8 h-8',
      editIcon: 'w-6 h-6'
    },
    '2xl': {
      container: 'w-20 h-20',
      text: 'text-2xl',
      status: 'w-4 h-4',
      icon: 'w-10 h-10',
      editIcon: 'w-8 h-8'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      container: 'rounded-full',
      status: 'rounded-full'
    },
    rounded: {
      container: 'rounded-lg',
      status: 'rounded-full'
    },
    square: {
      container: 'rounded-none',
      status: 'rounded-full'
    }
  };

  // Статусы
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  const baseClasses = cn(
    'relative inline-block',
    currentSize.container,
    currentVariant.container,
    'overflow-hidden',
    className
  );

  const imageClasses = cn(
    'w-full h-full object-cover transition-all duration-200',
    loading && 'animate-pulse bg-gray-200',
    error && 'bg-red-100'
  );

  const fallbackClasses = cn(
    'w-full h-full flex items-center justify-center bg-gray-100 text-gray-600 font-medium',
    currentSize.text,
    currentVariant.container
  );

  const statusClasses = cn(
    'absolute bottom-0 right-0 border-2 border-white',
    currentSize.status,
    currentVariant.status,
    statusColors[status || 'offline']
  );

  const editButtonClasses = cn(
    'absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer',
    currentVariant.container
  );

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };

  const renderImage = () => {
    if (loading) {
      return (
        <div className={cn(imageClasses, 'bg-gray-200 animate-pulse')}>
          <div className="w-full h-full bg-gray-300 animate-pulse" />
        </div>
      );
    }

    if (error || imageError || !src) {
      return (
        <div className={fallbackClasses}>
          {fallback || <User className={currentSize.icon} />}
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        className={imageClasses}
        onError={handleImageError}
        loading="lazy"
      />
    );
  };

  const renderStatus = () => {
    if (!showStatus || !status) return null;

    return (
      <div className={statusClasses} />
    );
  };

  const renderEditButton = () => {
    if (!editable) return null;

    return (
      <div
        className={editButtonClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <label className="cursor-pointer w-full h-full flex items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <Camera className={currentSize.editIcon} />
        </label>
      </div>
    );
  };

  const renderContent = () => (
    <>
      {renderImage()}
      {renderStatus()}
      {renderEditButton()}
    </>
  );

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.3,
          type: "spring",
          stiffness: 200
        }}
        whileHover={editable ? { scale: 1.05 } : {}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {renderContent()}
      </motion.div>
    );
  }

  return (
    <div
      ref={ref}
      className={baseClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {renderContent()}
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
