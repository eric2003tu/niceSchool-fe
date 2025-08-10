import { useState } from 'react';

type ToastType = 'success' | 'error';

export interface ToastState {
  isVisible: boolean;
  title: string;
  description: string;
  type: ToastType;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    title: '',
    description: '',
    type: 'success',
  });

  const showToast = (title: string, description: string, type: ToastType = 'success') => {
    setToast({
      isVisible: true,
      title,
      description,
      type,
    });

    setTimeout(() => {
      setToast(prev => ({ ...prev, isVisible: false }));
    }, 5000);
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  return { toast, showToast, hideToast };
};