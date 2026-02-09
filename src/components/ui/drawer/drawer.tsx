"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  // Reset expanded when drawer closes
  useEffect(() => {
    if (!open) setExpanded(false);
  }, [open]);

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

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          "fixed top-16 right-0 bottom-0 left-0 bg-black/30 backdrop-blur-sm z-40",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        style={{ transition: `opacity 500ms ${EASE}` }}
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="fixed top-16 bottom-0 right-0 z-50 w-full bg-surface shadow-2xl outline-none"
        style={{
          transition: `transform 500ms ${EASE}, max-width 500ms ${EASE}`,
          transform: open ? "translateX(0)" : "translateX(100%)",
          maxWidth: expanded ? "calc(100% - 16rem)" : "42rem",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="shrink-0 flex items-center px-6 py-4 border-b border-border bg-surface-muted">
            <button
              onClick={() => setExpanded(!expanded)}
              className="hidden md:block p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-white transition-colors"
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
              onClick={onClose}
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
  );
}
