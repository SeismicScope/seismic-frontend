import { notFound } from "next/navigation";

import { type Locale, LOCALES } from "@/shared/constants";
import { Providers } from "@/shared/providers";
import Navbar from "@/shared/ui/navbar";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
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
