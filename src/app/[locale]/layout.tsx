import { notFound } from "next/navigation";

import { type Locale, LOCALES } from "@/shared/constants";
import { Providers } from "@/shared/providers";
import Navbar from "@/shared/ui/navbar";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <Providers messages={messages} locale={locale}>
      <Navbar />
      <main className="pt-20">{children}</main>
    </Providers>
  );
}
