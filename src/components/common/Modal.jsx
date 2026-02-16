/**
 * Modal Component
 * Modal dialog overlay with fade animation
 * @component
 */

import { useState, useEffect } from 'react';

/**
 * @typedef {Object} ModalProps
 * @property {boolean} isOpen - Show/hide modal
 * @property {Function} onClose - Close handler
 * @property {string} [title] - Modal title
 * @property {React.ReactNode} children - Modal content
 * @property {Function} [onConfirm] - Confirm button handler
 * @property {string} [confirmText='Confirm'] - Confirm button text
 * @property {boolean} [danger=false] - Danger style
 * @property {string} [size='md'] - Modal size
 */

const sizeVariants = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

/**
 * Modal Dialog Component
 * @param {ModalProps} props - Component props
 * @returns {JSX.Element}
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = 'Confirm',
  danger = false,
  size = 'md',
}) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setAnimate(false);
    setTimeout(onClose, 200); // Allow animation to finish
  };

  const sizeClass = sizeVariants[size] || sizeVariants.md;
  const confirmButtonClass = danger
    ? 'bg-red-600 hover:bg-red-700 text-white'
    : 'bg-primary hover:bg-primary-600 text-white';

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        transition-opacity duration-200
        ${animate ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div
        className={`
          absolute inset-0 bg-black
          transition-opacity duration-200
          ${animate ? 'opacity-50' : 'opacity-0'}
        `}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`
          relative bg-white rounded-lg shadow-lg
          ${sizeClass} w-full mx-4
          transform transition-all duration-200
          ${animate ? 'scale-100' : 'scale-95'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4">
          {children}
        </div>

        {/* Footer */}
        {onConfirm && (
          <div className="flex gap-3 px-6 py-4 border-t border-gray-200 justify-end">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${confirmButtonClass}`}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
