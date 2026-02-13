import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/shared/providers";
import Navbar from "@/shared/ui/navbar";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('seismic-color-theme');if(t&&['teal','mango','tomato'].includes(t)){document.documentElement.setAttribute('data-theme',t)}else{document.documentElement.setAttribute('data-theme','teal')}}catch(e){document.documentElement.setAttribute('data-theme','teal')}})()`,
          }}
        />
      </head>
      <body className={`${inter.variable} pt-20 antialiased`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
