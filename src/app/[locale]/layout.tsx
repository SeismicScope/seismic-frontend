import { Inter } from "next/font/google";
import { notFound } from "next/navigation";

import { type Locale, LOCALES } from "@/shared/constants";
import { JsonLd } from "@/shared/ui/json-ld";
import { ThemeInitScript } from "@/shared/ui/theme-init-script";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import type { Metadata, Viewport } from "next";
import { getTranslations } from "next-intl/server";

import Navbar from "@/widgets/navbar";

import { Providers } from "../providers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "metadata",
  });

  return {
    title: {
      default: "SeismicScope Platform",
      template: `%s | SeismicScope Platform`,
    },
    description: t("defaultDescription"),
  };
}

export default async function LocaleLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html suppressHydrationWarning lang={locale}>
      <head>
        <ThemeInitScript />
        <JsonLd />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Providers messages={messages} locale={locale}>
          <Navbar />
          <main className="page-enter pt-20">{children}</main>
          {modal}
        </Providers>
      </body>
    </html>
  );
}
