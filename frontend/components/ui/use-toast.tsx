"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type ToastVariant = "default" | "destructive" | "success";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastOptionsWithId[];
  remove: (id: number) => void;
  notify: (toast: ToastOptions) => void;
}

export interface ToastOptionsWithId extends ToastOptions {
  id: number;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastOptionsWithId[]>([]);

  const remove = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback((toast: ToastOptions) => {
    setToasts((current) => {
      const id = Date.now();
      const options: ToastOptionsWithId = { id, duration: 4000, variant: "default", ...toast };
      if (options.duration && options.duration > 0) {
        setTimeout(() => remove(id), options.duration);
      }
      return [...current, options];
    });
  }, [remove]);

  const value = useMemo(() => ({ toasts, remove, notify }), [toasts, remove, notify]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de ToastProvider");
  }
  return {
    toasts: context.toasts,
    remove: context.remove,
    toast: context.notify
  };
}
