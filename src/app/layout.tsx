import "./globals.css";

import { Inter } from "next/font/google";

import { JsonLd } from "@/shared/ui/json-ld";
import { ThemeInitScript } from "@/shared/ui/theme-init-script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <ThemeInitScript />
        <JsonLd />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
