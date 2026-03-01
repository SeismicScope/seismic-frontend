import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

import { DEFAULT_LOCALE, type Locale, LOCALES } from "@/shared/constants";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale: Locale = ((await requestLocale) as Locale) || DEFAULT_LOCALE;

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
