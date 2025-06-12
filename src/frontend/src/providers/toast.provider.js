import React, { createContext, useContext, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const toastRef = useRef({
    success: (message, options) => toast.success(message, options),
    error: (message, options) => toast.error(message, options),
    info: (message, options) => toast.info(message, options),
    promise: (promise, messages, options) => toast.promise(promise, messages, options),
    warning: (message, options) => toast.warning(message, options),
  });

  const value = {
    toast: toastRef.current,
    showToast: (type, message, options = {}) => {
      const toastFn = toastRef.current[type] || toast;
      toastFn(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        ...options
      });
    },
    showPromiseToast: (promise, messages, options = {}) => {
      return toast.promise(promise, messages, {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        ...options
      });
    }
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

let toastFunctions;

export const getToast = () => {
  if (!toastFunctions) {
    console.warn('ToastFunctions called before initialization - using default toast');
    return {
      success: toast.success,
      error: toast.error,
      info: toast.info,
      warning: toast.warning,
      showToast: (type, message, options) => toast[type](message, options)
    };
  }
  return toastFunctions;
};

export const initToastFunctions = (toast) => {
  toastFunctions = toast;
};