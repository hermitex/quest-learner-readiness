"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Menu, Bell } from "lucide-react";
import { Sidebar } from "@/src/components/layout/side-drawer/side-drawer";
import { ToastViewport } from "@/src/components/ui/toast";

const PAGE_TITLES: Record<string, string> = {
  "/": "Readiness",
  "/profile": "Profile",
};

type RootShellProps = {
  children: React.ReactNode;
};

export function RootShell({ children }: RootShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] || "Quest";

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
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
