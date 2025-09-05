import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Loader2 } from 'lucide-react';
import Button from '../ui/Button';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  pdfPath: string;
  icon: React.ReactNode;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  pdfPath,
  icon
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Сбрасываем состояние загрузки при открытии модального окна
  React.useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = `${title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(pdfPath, '_blank');
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                         className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                  {icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                  <p className="text-gray-600">{description}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

                         {/* Content */}
             <div className="flex flex-col">
               {/* PDF Preview */}
               <div className="h-[70vh] bg-white border border-gray-200 overflow-hidden relative">
                 {isLoading && (
                   <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
                     <div className="text-center">
                       <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
                       <p className="text-gray-600">Загрузка сертификата...</p>
                     </div>
                   </div>
                 )}
                 <iframe
                   src={`${pdfPath}#toolbar=0&navpanes=0&scrollbar=0`}
                   className="w-full h-full border-0"
                   title={`Просмотр ${title}`}
                   onLoad={() => setIsLoading(false)}
                   onError={(e) => {
                     setIsLoading(false);
                     // Fallback если PDF не загружается
                     const target = e.target as HTMLIFrameElement;
                     target.style.display = 'none';
                     const parent = target.parentElement;
                     if (parent) {
                       parent.innerHTML = `
                         <div class="flex items-center justify-center h-full text-gray-400">
                           <div class="text-center">
                             <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                               <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                             </svg>
                             <p class="text-lg font-medium mb-2">PDF Сертификат</p>
                             <p class="text-sm">Используйте кнопки ниже для просмотра или скачивания</p>
                           </div>
                         </div>
                       `;
                     }
                   }}
                 />
               </div>

               {/* Action Buttons */}
               <div className="p-4 border-t border-gray-200">
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <Button
                     variant="primary"
                     size="lg"
                     onClick={handleOpenInNewTab}
                     icon={<ExternalLink className="w-5 h-5" />}
                     iconPosition="left"
                   >
                     Открыть в новой вкладке
                   </Button>
                   
                   <Button
                     variant="outline"
                     size="lg"
                     onClick={handleDownload}
                     icon={<Download className="w-5 h-5" />}
                     iconPosition="left"
                   >
                     Скачать PDF
                   </Button>
                 </div>
               </div>
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CertificateModal;
