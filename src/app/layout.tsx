import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/shared/providers";
import { Navbar1 } from "@/shared/ui/navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SeismicScope Platform",
  description: "High-performance earthquake analytics system (800k+ records)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} pt-20 antialiased`}>
        <Providers>
          <Navbar1 />
          {children}
        </Providers>
      </body>
    </html>
  );
}
