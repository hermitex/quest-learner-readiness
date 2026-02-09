import type { Metadata } from "next";
import "./globals.css";

/* Brand font: Nova Pioneer */
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import { RootShell } from "@/src/components/layout/root-shell";

export const metadata: Metadata = {
  title: "Quest | Learner Readiness",
  description: "Learner readiness dashboard for Nova Pioneer students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}
