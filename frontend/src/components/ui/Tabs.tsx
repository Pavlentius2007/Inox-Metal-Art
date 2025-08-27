import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  variant?: 'default' | 'pills' | 'underline' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  onChange?: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  className,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    if (onChange) {
      onChange(tabId);
    }
    setActiveTab(tabId);
  };

  // Варианты стилей
  const variants = {
    default: {
      tab: 'px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200',
      active: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    },
    pills: {
      tab: 'px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200',
      active: 'bg-blue-600 text-white hover:bg-blue-700',
      inactive: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    },
    underline: {
      tab: 'px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200',
      active: 'border-blue-600 text-blue-700',
      inactive: 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
    },
    cards: {
      tab: 'px-4 py-3 text-sm font-medium border border-gray-200 transition-all duration-200',
      active: 'bg-white border-blue-600 text-blue-700 shadow-sm',
      inactive: 'bg-gray-50 text-gray-600 hover:text-gray-900 hover:bg-white hover:border-gray-300'
    }
  };

  // Размеры
  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  return (
    <div className={cn('w-full', className)}>
      {/* Tab Navigation */}
      <div className={cn(
        'flex',
        fullWidth ? 'w-full' : 'w-fit',
        variant === 'underline' ? 'border-b border-gray-200' : 'space-x-1'
      )}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isDisabled = tab.disabled;

          return (
            <button
              key={tab.id}
              onClick={() => !isDisabled && handleTabChange(tab.id)}
              disabled={isDisabled}
              className={cn(
                'flex items-center space-x-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                currentVariant.tab,
                currentSize,
                isActive ? currentVariant.active : currentVariant.inactive,
                isDisabled && 'opacity-50 cursor-not-allowed',
                fullWidth && 'flex-1 justify-center'
              )}
              aria-selected={isActive}
              role="tab"
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
            >
              {tab.icon && <span className="flex-shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-6" role="tabpanel" aria-labelledby={`tab-${activeTab}`}>
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="focus:outline-none"
          tabIndex={0}
        >
          {tabs.find(tab => tab.id === activeTab)?.content}
        </motion.div>
      </div>
    </div>
  );
};

export default Tabs;
