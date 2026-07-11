import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, size = 'medium' }) {
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-xl',
    large: 'max-w-3xl',
    full: 'max-w-full h-full'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className={`modal-content ${sizeClasses[size]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-handle" />
            <div className="modal-header">
              <h2 className="modal-title">{title}</h2>
              <button className="modal-close" onClick={onClose}>
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
