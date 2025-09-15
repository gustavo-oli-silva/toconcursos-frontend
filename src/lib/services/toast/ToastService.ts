// lib/toast.service.ts
import { toast } from "sonner";
import { ReactNode } from 'react';

export const ToastService = {
  success: (message: string, description?: string) => {
    toast.success(message, {
      description: description,
    });
  },
  error: (message: string, description?: string) => {
    toast.error(message, {
      description: description,
    });
  },
  info: (message: string, description?: string) => {
    toast.info(message, {
      description: description,
    });
  },
  warning: (message: string, description?: string) => {
    toast.warning(message, {
        description: description,
    });
  },

};