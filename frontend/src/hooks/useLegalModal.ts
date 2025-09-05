import { useState } from 'react';

export const useLegalModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const openModal = (title: string, content: string) => {
    setCurrentDocument({ title, content });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentDocument(null);
  };

  return {
    isOpen,
    currentDocument,
    openModal,
    closeModal
  };
};
