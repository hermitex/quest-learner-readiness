"use client";

import clsx from "clsx";
import { useToastStore } from "@/src/store/toast.store";

const variantStyles: Record<string, string> = {
  success: "border-success/40 bg-white",
  error: "border-danger/40 bg-white",
  info: "border-border bg-white",
};

export function ToastViewport() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed right-4 top-4 z-50 flex w-[320px] flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            "rounded-lg border px-4 py-3 shadow-sm",
            variantStyles[toast.variant]
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-text-primary">
                {toast.title}
              </p>
              {toast.message && (
                <p className="text-xs text-text-secondary">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-xs text-text-muted hover:text-text-primary"
              aria-label="Dismiss"
            >
              Close
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
