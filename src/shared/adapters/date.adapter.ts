import {
  differenceInDays,
  format as dfFormat,
  isValid,
  parseISO,
} from "date-fns";
import { de, enUS } from "date-fns/locale";

export type DateLocale = "en" | "de";

const localeMap = {
  en: enUS,
  de,
} as const;

type FormatOptions = {
  locale?: DateLocale;
};

export const dateAdapter = {
  format(date: Date, pattern: string, options?: FormatOptions): string {
    return dfFormat(date, pattern, {
      locale: localeMap[options?.locale || "en"],
    });
  },

  parseISO(value: string): Date {
    return parseISO(value);
  },

  isValid(date: Date): boolean {
    return isValid(date);
  },

  differenceInDays(dateLeft: Date, dateRight: Date): number {
    return differenceInDays(dateLeft, dateRight);
  },
};
