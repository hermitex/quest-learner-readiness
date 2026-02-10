"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Maximize2, Minimize2 } from "lucide-react";
import clsx from "clsx";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  // Reset expanded when drawer closes
  // Remove effect and reset expanded in onClose handler instead

  // Escape key closes
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    },
    [open, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Handler to close drawer and reset expanded state
  const handleClose = useCallback(() => {
    setExpanded(false);
    onClose();
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop (no blur over topbar) */}
      <div
        className={clsx(
          "fixed inset-0 z-40 flex flex-col",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        style={{ transition: `opacity 500ms ${EASE}` }}
        aria-hidden
      >
        <div className="h-16 pointer-events-none" />
        <div
          className="flex-1 bg-black/30 backdrop-blur-sm"
          onClick={handleClose}
        />
      </div>

      {/* Panel */}
      <aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={clsx(
          "fixed top-16 bottom-0 right-0 z-50 w-full bg-surface shadow-2xl outline-none",
          "md:max-w-[calc(100%_-_16rem)]",
          expanded
            ? "lg:max-w-[calc(100%_-_16rem)]"
            : "lg:max-w-[42rem]"
        )}
        style={{
          transition: `transform 500ms ${EASE}, max-width 500ms ${EASE}`,
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="shrink-0 flex items-center px-6 py-4 border-b border-border bg-surface-muted">
            <button
              onClick={() => setExpanded(!expanded)}
              className="hidden lg:block p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-white transition-colors"
              aria-label={expanded ? "Collapse drawer" : "Expand drawer"}
            >
              {expanded ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            <h2 className="flex-1 text-center text-base font-semibold text-primary">
              {title}
            </h2>

            <button
              onClick={handleClose}
              className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content — children own their own scroll + footer layout */}
          <div className="flex-1 min-h-0">{children}</div>
        </div>
      </aside>
    </>
    ,
    document.body
  );
}
