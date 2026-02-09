import type { Metadata } from "next";
import "./globals.css";

/* Brand font: Nova Pioneer */
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import { RootShell } from "@/src/components/layout/root-shell";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Quest | Learner Readiness",
  description: "Learner readiness dashboard for Nova Pioneer students",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/AppIcons/Assets.xcassets/AppIcon.appiconset/_/180.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Quest",
  },
};

export const viewport = {
  themeColor: "#1e3a77",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <RootShell>{children}</RootShell>
        </Providers>
      </body>
    </html>
  );
}
