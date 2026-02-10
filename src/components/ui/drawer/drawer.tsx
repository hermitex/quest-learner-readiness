"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import { createPortal } from "react-dom";
import { X, Maximize2, Minimize2 } from "lucide-react";
import clsx from "clsx";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

export function Drawer({
  open,
  onClose,
  title,
  subtitle,
  children,
}: DrawerProps) {
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const wasOpenRef = useRef(false);
  const titleId = useId();
  const subtitleId = useId();

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
    if (open) {
      lastFocusedRef.current = document.activeElement as HTMLElement;
      panelRef.current?.focus();
    } else if (wasOpenRef.current) {
      lastFocusedRef.current?.focus();
    }
    wasOpenRef.current = open;
  }, [open]);

  // Handler to close drawer and reset expanded state
  const handleClose = useCallback(() => {
    setExpanded(false);
    onClose();
  }, [onClose]);

  const handlePanelKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        handleClose();
        return;
      }

      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

      if (focusable.length === 0) {
        e.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || active === panel) {
          e.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [handleClose]
  );

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
        aria-labelledby={titleId}
        aria-describedby={subtitle ? subtitleId : undefined}
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
        onKeyDown={handlePanelKeyDown}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="shrink-0 border-b border-border bg-surface-muted">
            <div className="flex items-center px-6 py-3">
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

              <div className="flex-1 text-center">
                <h2
                  id={titleId}
                  className="text-base font-semibold text-primary"
                >
                  {title}
                </h2>
                {subtitle && (
                  <p
                    id={subtitleId}
                    className="text-xs text-text-secondary"
                  >
                    {subtitle}
                  </p>
                )}
              </div>

              <button
                onClick={handleClose}
                className="p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
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
