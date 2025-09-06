import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  variant?: 'default' | 'bordered' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  multiple?: boolean;
  defaultOpen?: string[];
  className?: string;
  onChange?: (openItems: string[]) => void;
}

const Accordion: React.FC<AccordionProps> = ({
  items,
  variant = 'default',
  size = 'md',
  multiple = false,
  defaultOpen = [],
  className,
  onChange,
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const handleToggle = (itemId: string) => {
    let newOpenItems: string[];

    if (multiple) {
      if (openItems.includes(itemId)) {
        newOpenItems = openItems.filter(id => id !== itemId);
      } else {
        newOpenItems = [...openItems, itemId];
      }
    } else {
      newOpenItems = openItems.includes(itemId) ? [] : [itemId];
    }

    setOpenItems(newOpenItems);
    
    if (onChange) {
      onChange(newOpenItems);
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      item: 'border-b border-gray-200 last:border-b-0',
      header: 'py-4 px-0 hover:bg-gray-50 rounded-lg transition-colors duration-200',
      content: 'pb-4'
    },
    bordered: {
      item: 'border border-gray-200 rounded-lg mb-2 last:mb-0',
      header: 'p-4 hover:bg-gray-50 transition-colors duration-200',
      content: 'px-4 pb-4'
    },
    cards: {
      item: 'bg-white border border-gray-200 rounded-lg shadow-sm mb-3 last:mb-0',
      header: 'p-4 hover:bg-gray-50 transition-colors duration-200',
      content: 'px-4 pb-4'
    }
  };

  // Размеры
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  return (
    <div className={cn('w-full', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        const isDisabled = item.disabled;

        return (
          <div key={item.id} className={currentVariant.item}>
            <button
              onClick={() => !isDisabled && handleToggle(item.id)}
              disabled={isDisabled}
              className={cn(
                'w-full flex items-center justify-between text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                currentVariant.header,
                currentSize,
                isDisabled && 'opacity-50 cursor-not-allowed',
                !isDisabled && 'hover:bg-gray-50'
              )}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              id={`accordion-header-${item.id}`}
            >
              <div className="flex items-center space-x-3">
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span className="font-medium text-gray-900">{item.title}</span>
              </div>
              
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 text-gray-400"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id={`accordion-content-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                  aria-labelledby={`accordion-header-${item.id}`}
                >
                  <div className={currentVariant.content}>
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
