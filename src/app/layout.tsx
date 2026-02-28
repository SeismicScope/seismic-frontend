import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/shared/providers";
import { JsonLd } from "@/shared/ui/json-ld";
import Navbar from "@/shared/ui/navbar";
import { ThemeInitScript } from "@/shared/ui/theme-init-script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SeismicScope Platform",
    template: "%s | SeismicScope Platform",
  },
  description: "High-performance earthquake analytics system (800k+ records)",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInitScript />
        <JsonLd />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <Navbar />
          <main className="pt-20">
            {children}
            {modal}
          </main>
        </Providers>
      </body>
    </html>
  );
}
