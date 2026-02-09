"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import { Sidebar } from "@/src/components/layout/side-drawer/side-drawer";
import { ToastViewport } from "@/src/components/ui/toast";
import { useReadinessStore } from "@/src/store/readiness.store";

const PAGE_TITLES: Record<string, string> = {
  "/": "Readiness",
  "/profile": "Profile",
};

type RootShellProps = {
  children: React.ReactNode;
};

export function RootShell({ children }: RootShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(true);
  const syncPending = useReadinessStore((s) => s.syncPending);
  const hydrate = useReadinessStore((s) => s.hydrate);
  const isSyncing = useReadinessStore((s) => s.isSyncing);
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "Quest";

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    };
    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isOnline) {
      syncPending();
    }
  }, [isOnline, syncPending]);

  return (
    <div className="min-h-screen bg-background">
      <ToastViewport />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area — offset by sidebar width on desktop */}
      <div className="md:ml-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Left: hamburger + title */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 -ml-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-muted transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <h1 className="text-lg font-semibold text-text-primary">
                {title}
              </h1>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-3">
              <button
                className="relative p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-muted transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
              </button>

              <div className="h-8 w-px bg-border" />

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-white">
                  L
                </div>
                <span className="hidden md:block text-sm font-medium text-text-primary">
                  Learner
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 space-y-4">
          {!isOnline && (
            <div className="rounded-lg border border-accent/40 bg-accent/15 px-3 py-2 text-sm text-text-primary">
              You are offline. Changes will sync when you reconnect.
            </div>
          )}
          {isOnline && isSyncing && (
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
              Syncing changes...
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
