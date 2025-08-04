import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

const ModalForm = ({
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
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'}`}
                onClick={closeOnBackdrop ? onClose : undefined}
            />

            {/* Modal Wrapper */}
            <div className="fixed inset-0 z-50 flex justify-center overflow-y-auto">
                <div className={`relative w-full ${sizeClasses[size]} mt-20 mb-10 transform rounded-2xl bg-white shadow-2xl transition-all duration-300 ease-out ${className}`}>
                    {showCloseButton && (
                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 z-10 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200"
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </button>
                    )}
                    {/* Allow scrolling inside modal if content overflows */}
                    <div className="px-6 py-4 max-h-[80vh] overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalForm;
