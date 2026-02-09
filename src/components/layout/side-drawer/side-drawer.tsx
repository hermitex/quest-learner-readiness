"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, User } from "lucide-react";
import clsx from "clsx";

const NAV_ITEMS = [
  { label: "Readiness", href: "/", icon: BarChart3 },
  { label: "Profile", href: "/profile", icon: User },
];

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64",
          "bg-primary text-white",
          "flex flex-col",
          "transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        {/* Brand */}
        <div className="px-5 pt-6 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10">
              <svg
                viewBox="0 0 188.031 203.368"
                className="w-10 h-10"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <linearGradient
                    id="questLogoBlue"
                    gradientUnits="userSpaceOnUse"
                    x1="10"
                    y1="65.9565"
                    x2="146.5885"
                    y2="65.9565"
                    gradientTransform="matrix(1 0 0 -1 -6 108.3682)"
                  >
                    <stop offset="0" style={{ stopColor: "#188EBF" }} />
                    <stop offset="0.2459" style={{ stopColor: "#1D7AAA" }} />
                    <stop offset="0.7761" style={{ stopColor: "#1C5184" }} />
                    <stop offset="1" style={{ stopColor: "#1D3F75" }} />
                  </linearGradient>
                  <linearGradient
                    id="questLogoOrange"
                    gradientUnits="userSpaceOnUse"
                    x1="196.8643"
                    y1="54.0454"
                    x2="127.9901"
                    y2="-63.9692"
                    gradientTransform="matrix(1 0 0 -1 -6 108.3682)"
                  >
                    <stop offset="0" style={{ stopColor: "#F68B1F" }} />
                    <stop offset="1" style={{ stopColor: "#FFCF01" }} />
                  </linearGradient>
                  <linearGradient
                    id="questLogoGreenA"
                    gradientUnits="userSpaceOnUse"
                    x1="92.2236"
                    y1="-101.4995"
                    x2="25.281"
                    y2="18.4552"
                    gradientTransform="matrix(1 0 0 -1 -6 108.3682)"
                  >
                    <stop offset="0" style={{ stopColor: "#6CBE45" }} />
                    <stop offset="1" style={{ stopColor: "#0D9046" }} />
                  </linearGradient>
                  <linearGradient
                    id="questLogoOrangeB"
                    gradientUnits="userSpaceOnUse"
                    x1="107.998"
                    y1="113.897"
                    x2="174.5494"
                    y2="-4.8885"
                    gradientTransform="matrix(1 0 0 -1 -6 108.3682)"
                  >
                    <stop offset="0" style={{ stopColor: "#F68B1F" }} />
                    <stop offset="1" style={{ stopColor: "#FFCF01" }} />
                  </linearGradient>
                  <linearGradient
                    id="questLogoGreenB"
                    gradientUnits="userSpaceOnUse"
                    x1="3.5347"
                    y1="-41.5591"
                    x2="72.4756"
                    y2="77.3446"
                    gradientTransform="matrix(1 0 0 -1 -6 108.3682)"
                  >
                    <stop offset="0" style={{ stopColor: "#6CBE45" }} />
                    <stop offset="0.2554" style={{ stopColor: "#67B945" }} />
                    <stop offset="0.5116" style={{ stopColor: "#59AE45" }} />
                    <stop offset="0.7672" style={{ stopColor: "#40A046" }} />
                    <stop offset="1" style={{ stopColor: "#0D9046" }} />
                  </linearGradient>
                  <linearGradient
                    id="questLogoBlueB"
                    gradientUnits="userSpaceOnUse"
                    x1="191.6875"
                    y1="-53.647"
                    x2="52.3966"
                    y2="-52.8733"
                    gradientTransform="matrix(1 0 0 -1 -6 108.3682)"
                  >
                    <stop offset="0" style={{ stopColor: "#188EBF" }} />
                    <stop offset="0.2459" style={{ stopColor: "#1D7AAA" }} />
                    <stop offset="0.7761" style={{ stopColor: "#1C5184" }} />
                    <stop offset="1" style={{ stopColor: "#1D3F75" }} />
                  </linearGradient>
                </defs>

                <polygon
                  fill="url(#questLogoBlue)"
                  points="15.169,44.127 4,74.316 72.662,34.613 93.689,47.434 140.766,74.614 140.912,49.504 73.908,10.209"
                />
                <polygon
                  fill="url(#questLogoOrange)"
                  points="163.25,117.336 140.766,128.983 93.689,156.165 115.268,168.629 184.343,130.163 184.343,63.148 163.25,37.922"
                />
                <polygon
                  fill="url(#questLogoGreenA)"
                  points="25.506,86.729 25.506,166.145 81.765,199.237 113.611,193.866 46.606,154.157 46.606,128.983 46.606,74.614"
                />
                <polygon
                  fill="url(#questLogoOrangeB)"
                  points="73.908,10.209 140.912,49.504 140.766,74.614 140.766,128.983 163.25,117.336 163.25,37.922 105.75,4"
                />
                <polygon
                  fill="url(#questLogoGreenB)"
                  points="4,74.316 4,141.745 25.506,166.145 25.506,86.729 46.606,74.614 93.689,47.434 72.666,34.613"
                />
                <polygon
                  fill="url(#questLogoBlueB)"
                  points="46.602,154.157 113.616,193.866 172.35,161.176 184.338,130.154 115.268,168.629 93.689,156.165 46.602,128.993"
                />
              </svg>
            </div>
            <span className="text-base font-semibold tracking-wide uppercase">
              Quest
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                  "transition-all duration-200",
                  isActive
                    ? "bg-white/15 text-white shadow-sm"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>

                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
