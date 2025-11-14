"use client";

import { useToast } from "./use-toast";
import { cn } from "@/lib/utils";

export function ToastViewport() {
  const { toasts, remove } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 flex w-80 flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "rounded-md border border-slate-200 bg-white p-4 shadow-lg",
            toast.variant === "destructive" && "border-red-500 text-red-600",
            toast.variant === "success" && "border-emerald-500 text-emerald-600"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.description && (
                <p className="mt-1 text-sm text-slate-600">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => remove(toast.id)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Fechar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export const Toaster = ToastViewport;
