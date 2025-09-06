import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Step {
  id: string | number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming' | 'error';
  disabled?: boolean;
  onClick?: () => void;
}

interface StepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  steps: Step[];
  currentStep: number;
  variant?: 'default' | 'minimal' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
  showStepNumbers?: boolean;
  showStepIcons?: boolean;
  showStepDescriptions?: boolean;
  clickable?: boolean;
  className?: string;
  animate?: boolean;
  onStepClick?: (stepIndex: number) => void;
}

const Stepper = forwardRef<HTMLDivElement, StepperProps>(({
  steps,
  currentStep,
  variant = 'default',
  size = 'md',
  orientation = 'horizontal',
  showStepNumbers = true,
  showStepIcons = true,
  showStepDescriptions = true,
  clickable = false,
  className,
  animate = false,
  onStepClick,
  ...props
}, ref) => {
  // Размеры
  const sizes = {
    sm: {
      container: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
      step: 'text-sm',
      title: 'text-sm',
      description: 'text-xs',
      icon: 'w-6 h-6',
      stepNumber: 'w-6 h-6 text-xs',
      connector: orientation === 'horizontal' ? 'h-px' : 'w-px'
    },
    md: {
      container: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
      step: 'text-base',
      title: 'text-base',
      description: 'text-sm',
      icon: 'w-8 h-8',
      stepNumber: 'w-8 h-8 text-sm',
      connector: orientation === 'horizontal' ? 'h-0.5' : 'w-0.5'
    },
    lg: {
      container: orientation === 'horizontal' ? 'space-x-6' : 'space-y-6',
      step: 'text-lg',
      title: 'text-lg',
      description: 'text-base',
      icon: 'w-10 h-10',
      stepNumber: 'w-10 h-10 text-base',
      connector: orientation === 'horizontal' ? 'h-1' : 'w-1'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      container: 'bg-white',
      step: 'text-gray-500',
      stepCompleted: 'text-green-600',
      stepCurrent: 'text-blue-600',
      stepError: 'text-red-600',
      stepDisabled: 'text-gray-400',
      icon: 'bg-gray-100 text-gray-400',
      iconCompleted: 'bg-green-100 text-green-600',
      iconCurrent: 'bg-blue-100 text-blue-600',
      iconError: 'bg-red-100 text-red-600',
      iconDisabled: 'bg-gray-50 text-gray-300',
      connector: 'bg-gray-200',
      connectorCompleted: 'bg-green-200',
      connectorCurrent: 'bg-blue-200'
    },
    minimal: {
      container: 'bg-transparent',
      step: 'text-gray-600',
      stepCompleted: 'text-green-700',
      stepCurrent: 'text-blue-700',
      stepError: 'text-red-700',
      stepDisabled: 'text-gray-400',
      icon: 'bg-transparent border-2 border-gray-300 text-gray-400',
      iconCompleted: 'bg-transparent border-2 border-green-500 text-green-500',
      iconCurrent: 'bg-transparent border-2 border-blue-500 text-blue-500',
      iconError: 'bg-transparent border-2 border-red-500 text-red-500',
      iconDisabled: 'bg-transparent border-2 border-gray-200 text-gray-300',
      connector: 'bg-gray-200',
      connectorCompleted: 'bg-green-200',
      connectorCurrent: 'bg-blue-200'
    },
    cards: {
      container: 'bg-gray-50',
      step: 'text-gray-700',
      stepCompleted: 'text-green-700',
      stepCurrent: 'text-blue-700',
      stepError: 'text-red-700',
      stepDisabled: 'text-gray-500',
      icon: 'bg-white border-2 border-gray-200 text-gray-500 shadow-sm',
      iconCompleted: 'bg-green-50 border-2 border-green-200 text-green-600 shadow-sm',
      iconCurrent: 'bg-blue-50 border-2 border-blue-200 text-blue-600 shadow-sm',
      iconError: 'bg-red-50 border-2 border-red-200 text-red-600 shadow-sm',
      iconDisabled: 'bg-gray-50 border-2 border-gray-200 text-gray-400 shadow-sm',
      connector: 'bg-gray-200',
      connectorCompleted: 'bg-green-200',
      connectorCurrent: 'bg-blue-200'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'flex',
    orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col items-start',
    currentSize.container,
    currentVariant.container,
    className
  );

  const stepClasses = cn(
    'flex items-center transition-all duration-200',
    orientation === 'horizontal' ? 'flex-col text-center' : 'flex-row text-left',
    currentSize.step,
    clickable && 'cursor-pointer hover:opacity-80'
  );

  const getStepStatusClasses = (status: Step['status'], index: number) => {
    if (status === 'error') return currentVariant.stepError;
    if (status === 'completed') return currentVariant.stepCompleted;
    if (index === currentStep) return currentVariant.stepCurrent;
    // if (status === 'disabled') return currentVariant.stepDisabled;
    return currentVariant.step;
  };

  const getIconClasses = (status: Step['status'], index: number) => {
    const baseIconClasses = cn(
      'flex items-center justify-center rounded-full transition-all duration-200',
      currentSize.icon
    );

    if (status === 'error') return cn(baseIconClasses, currentVariant.iconError);
    if (status === 'completed') return cn(baseIconClasses, currentVariant.iconCompleted);
    if (index === currentStep) return cn(baseIconClasses, currentVariant.iconCurrent);
    // if (status === 'disabled') return cn(baseIconClasses, currentVariant.iconDisabled);
    return cn(baseIconClasses, currentVariant.icon);
  };

  const getConnectorClasses = (index: number) => {
    const baseConnectorClasses = cn(
      'transition-all duration-200',
      currentSize.connector
    );

    if (index < currentStep) return cn(baseConnectorClasses, currentVariant.connectorCompleted);
    if (index === currentStep) return cn(baseConnectorClasses, currentVariant.connectorCurrent);
    return cn(baseConnectorClasses, currentVariant.connector);
  };

  const handleStepClick = (index: number, step: Step) => {
    if (!clickable || step.disabled || !onStepClick) return;
    onStepClick(index);
    step.onClick?.();
  };

  const renderStepIcon = (step: Step, index: number) => {
    if (!showStepIcons) return null;

    if (step.icon) {
      return (
        <div className={getIconClasses(step.status, index)}>
          {step.icon}
        </div>
      );
    }

    if (step.status === 'completed') {
      return (
        <div className={getIconClasses(step.status, index)}>
          <Check className="w-full h-full" />
        </div>
      );
    }

    if (showStepNumbers) {
      return (
        <div className={cn(
          'flex items-center justify-center rounded-full font-medium',
          currentSize.stepNumber,
          getIconClasses(step.status, index)
        )}>
          {index + 1}
        </div>
      );
    }

    return (
      <div className={getIconClasses(step.status, index)}>
        <div className="w-full h-full rounded-full bg-current" />
      </div>
    );
  };

  const renderStepContent = (step: Step, index: number) => (
    <div className={cn(
      'flex-1 min-w-0',
      orientation === 'horizontal' ? 'mt-2' : 'ml-3'
    )}>
      <h3 className={cn(
        'font-medium leading-tight',
        currentSize.title,
        getStepStatusClasses(step.status, index)
      )}>
        {step.title}
      </h3>
      {showStepDescriptions && step.description && (
        <p className={cn(
          'mt-1 leading-relaxed',
          currentSize.description,
          'text-gray-500'
        )}>
          {step.description}
        </p>
      )}
    </div>
  );

  const renderConnector = (index: number) => {
    if (index === steps.length - 1) return null;

    const connectorClasses = cn(
      'flex-shrink-0',
      orientation === 'horizontal' ? 'w-full' : 'h-full',
      getConnectorClasses(index)
    );

    if (orientation === 'horizontal') {
      return (
        <div className="flex-1">
          <div className={connectorClasses} />
        </div>
      );
    }

    return (
      <div className="flex justify-center w-full">
        <div className={cn(connectorClasses, 'h-8')} />
      </div>
    );
  };

  const renderStep = (step: Step, index: number) => {
    const stepContent = (
      <div className={stepClasses}>
        {renderStepIcon(step, index)}
        {renderStepContent(step, index)}
      </div>
    );

    if (animate) {
      return (
        <motion.div
          key={step.id}
          className="flex-1 flex items-center"
          initial={{ opacity: 0, y: orientation === 'horizontal' ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: index * 0.1,
            type: "spring",
            stiffness: 200
          }}
        >
          {stepContent}
          {renderConnector(index)}
        </motion.div>
      );
    }

    return (
      <div key={step.id} className="flex-1 flex items-center">
        {stepContent}
        {renderConnector(index)}
      </div>
    );
  };

  if (animate) {
    return (
      <motion.div
        ref={ref}
        className={baseClasses}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        {...(props as any)}
      >
        {steps.map((step, index) => renderStep(step, index))}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={baseClasses} {...props}>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex-1 flex items-center"
          onClick={() => handleStepClick(index, step)}
        >
          {renderStep(step, index)}
        </div>
      ))}
    </div>
  );
});

Stepper.displayName = 'Stepper';

export default Stepper;
