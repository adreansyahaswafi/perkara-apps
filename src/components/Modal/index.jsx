import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

const Modal = ({
    isOpen,
    onClose,
    children,
    size = 'md',
    closeOnBackdrop = true,
    showCloseButton = true,
    className = ''
}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4'
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'
                    }`}
                onClick={closeOnBackdrop ? onClose : undefined}
            />

            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className={`
              relative w-full ${sizeClasses[size]} transform overflow-visible 
              rounded-2xl bg-white shadow-2xl transition-all duration-300 ease-out
              ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
              ${className}
            `}
                >
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 z-10 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200"
                        >
                            <XMarkIcon size={20} />
                        </button>
                    )}
                    <div className={`px-6 py-4 ${className}`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;