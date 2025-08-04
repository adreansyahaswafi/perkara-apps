// ToastContext.js
import { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const toastRef = useRef(null);

    const show = ({ severity, summary, detail }) => {
        toastRef.current?.show({
            severity,
            summary,
            detail,
            life: 3000, // duration in ms (3 seconds)
        });
    };

    return (
        <ToastContext.Provider value={{ show }}>
            <div>
                <Toast ref={toastRef} />
                {children}
            </div>
        </ToastContext.Provider>
    );
};
