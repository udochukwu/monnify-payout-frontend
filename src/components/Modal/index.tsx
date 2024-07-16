import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-gray-800 bg-opacity-50">
      <div className="bg-white dark:bg-dark rounded-lg shadow-lg w-full h-full md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            &times;
          </button>
        </div>
        <div className="p-4 h-full overflow-auto">
          {children}
        </div>
        {footer && (
          <div className="border-t p-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
