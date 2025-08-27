import React, { forwardRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronDown, Folder, FolderOpen, File, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TreeNode {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  isFile?: boolean;
  isFolder?: boolean;
  disabled?: boolean;
  selected?: boolean;
  expanded?: boolean;
  data?: any;
}

interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  data: TreeNode[];
  variant?: 'default' | 'minimal' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  selectable?: boolean;
  multiSelect?: boolean;
  showIcons?: boolean;
  showLines?: boolean;
  className?: string;
  animate?: boolean;
  onNodeSelect?: (node: TreeNode, selected: boolean) => void;
  onNodeExpand?: (node: TreeNode, expanded: boolean) => void;
  onNodeClick?: (node: TreeNode) => void;
}

const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(({
  data,
  variant = 'default',
  size = 'md',
  selectable = false,
  multiSelect = false,
  showIcons = true,
  showLines = true,
  className,
  animate = false,
  onNodeSelect,
  onNodeExpand,
  onNodeClick,
  ...props
}, ref) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set());

  // Размеры
  const sizes = {
    sm: {
      container: 'text-sm',
      item: 'py-1 px-2',
      icon: 'w-4 h-4',
      chevron: 'w-3 h-3',
      indent: 'ml-4'
    },
    md: {
      container: 'text-base',
      item: 'py-1.5 px-3',
      icon: 'w-5 h-5',
      chevron: 'w-4 h-4',
      indent: 'ml-5'
    },
    lg: {
      container: 'text-lg',
      item: 'py-2 px-4',
      icon: 'w-6 h-6',
      chevron: 'w-5 h-5',
      indent: 'ml-6'
    }
  };

  // Варианты стилей
  const variants = {
    default: {
      container: 'bg-white',
      item: 'text-gray-700 hover:bg-gray-50',
      itemSelected: 'bg-blue-50 text-blue-700',
      itemDisabled: 'text-gray-400 cursor-not-allowed hover:bg-transparent',
      line: 'border-l border-gray-200'
    },
    minimal: {
      container: 'bg-transparent',
      item: 'text-gray-600 hover:bg-gray-100',
      itemSelected: 'bg-gray-200 text-gray-900',
      itemDisabled: 'text-gray-400 cursor-not-allowed hover:bg-transparent',
      line: 'border-l border-gray-100'
    },
    bordered: {
      container: 'bg-gray-50 border border-gray-200 rounded-lg',
      item: 'text-gray-700 hover:bg-gray-100',
      itemSelected: 'bg-blue-100 text-blue-800',
      itemDisabled: 'text-gray-400 cursor-not-allowed hover:bg-transparent',
      line: 'border-l border-gray-300'
    }
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];

  const baseClasses = cn(
    'select-none',
    currentSize.container,
    currentVariant.container,
    className
  );

  const itemClasses = cn(
    'flex items-center space-x-2 cursor-pointer transition-colors duration-150 rounded-md',
    currentSize.item,
    currentVariant.item
  );

  const selectedItemClasses = cn(
    itemClasses,
    currentVariant.itemSelected
  );

  const disabledItemClasses = cn(
    itemClasses,
    currentVariant.itemDisabled
  );

  const lineClasses = cn(
    'absolute left-0 top-0 bottom-0',
    currentVariant.line
  );

  // Обработчики событий
  const handleNodeClick = useCallback((node: TreeNode, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (node.disabled) return;

    onNodeClick?.(node);

    if (node.children && node.children.length > 0) {
      handleNodeExpand(node);
    } else if (selectable) {
      handleNodeSelect(node);
    }
  }, [onNodeClick, selectable]);

  const handleNodeExpand = useCallback((node: TreeNode) => {
    if (node.disabled) return;

    const nodeId = node.id.toString();
    const newExpandedNodes = new Set(expandedNodes);
    
    if (newExpandedNodes.has(nodeId)) {
      newExpandedNodes.delete(nodeId);
    } else {
      newExpandedNodes.add(nodeId);
    }
    
    setExpandedNodes(newExpandedNodes);
    onNodeExpand?.(node, newExpandedNodes.has(nodeId));
  }, [expandedNodes, onNodeExpand]);

  const handleNodeSelect = useCallback((node: TreeNode) => {
    if (node.disabled) return;

    const nodeId = node.id.toString();
    const newSelectedNodes = new Set(selectedNodes);
    
    if (multiSelect) {
      if (newSelectedNodes.has(nodeId)) {
        newSelectedNodes.delete(nodeId);
      } else {
        newSelectedNodes.add(nodeId);
      }
    } else {
      newSelectedNodes.clear();
      newSelectedNodes.add(nodeId);
    }
    
    setSelectedNodes(newSelectedNodes);
    onNodeSelect?.(node, newSelectedNodes.has(nodeId));
  }, [selectedNodes, multiSelect, onNodeSelect]);

  const handleChevronClick = useCallback((node: TreeNode, e: React.MouseEvent) => {
    e.stopPropagation();
    handleNodeExpand(node);
  }, [handleNodeExpand]);

  // Рендер узла
  const renderNode = (node: TreeNode, level: number = 0) => {
    const nodeId = node.id.toString();
    const isExpanded = expandedNodes.has(nodeId);
    const isSelected = selectedNodes.has(nodeId);
    const hasChildren = node.children && node.children.length > 0;
    const isFolder = node.isFolder || hasChildren;
    const isFile = node.isFile || !hasChildren;

    const itemClass = node.disabled 
      ? disabledItemClasses 
      : isSelected 
        ? selectedItemClasses 
        : itemClasses;

    const indentStyle = level > 0 ? { marginLeft: `${level * currentSize.indent.replace('ml-', '')}px` } : {};

    const nodeContent = (
      <div
        className={cn(
          'relative',
          level > 0 && showLines && lineClasses
        )}
        style={indentStyle}
      >
        <div
          className={itemClass}
          onClick={(e) => handleNodeClick(node, e)}
        >
          {/* Chevron для папок */}
          {isFolder && (
            <button
              className={cn(
                'flex-shrink-0 p-0.5 rounded hover:bg-gray-200 transition-colors duration-150',
                currentSize.chevron
              )}
              onClick={(e) => handleChevronClick(node, e)}
              disabled={node.disabled}
            >
              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.div
                    key="expanded"
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-full h-full" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="collapsed"
                    initial={{ rotate: 90 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-full h-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          )}

          {/* Иконка */}
          {showIcons && (
            <div className="flex-shrink-0">
              {node.icon || (
                isFolder ? (
                  isExpanded ? (
                    <FolderOpen className={currentSize.icon} />
                  ) : (
                    <Folder className={currentSize.icon} />
                  )
                ) : (
                  isFile ? (
                    <FileText className={currentSize.icon} />
                  ) : (
                    <File className={currentSize.icon} />
                  )
                )
              )}
            </div>
          )}

          {/* Метка */}
          <span className="flex-1 truncate">{node.label}</span>
        </div>

        {/* Дочерние узлы */}
        {hasChildren && isExpanded && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {node.children!.map(child => renderNode(child, level + 1))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    );

    if (animate) {
      return (
        <motion.div
          key={nodeId}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.2, 
            delay: level * 0.05,
            type: "spring",
            stiffness: 200
          }}
        >
          {nodeContent}
        </motion.div>
      );
    }

    return (
      <div key={nodeId}>
        {nodeContent}
      </div>
    );
  };

  // Рендер дерева
  const renderTree = () => (
    <div className="py-2">
      {data.map(node => renderNode(node))}
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
        {renderTree()}
      </motion.div>
    );
  }

  return (
    <div ref={ref} className={baseClasses} {...props}>
      {renderTree()}
    </div>
  );
});

TreeView.displayName = 'TreeView';

export default TreeView;
