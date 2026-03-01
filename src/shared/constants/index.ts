import { de, enUS, es } from "date-fns/locale";

export enum PERIODS {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export const PERIOD_INTERVALS = [
  { value: "day", label: "general.day" },
  { value: "week", label: "general.week" },
  { value: "month", label: "general.month" },
  { value: "year", label: "general.year" },
];

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;
export const MAPBOX_STYLE = process.env.NEXT_PUBLIC_MAPBOX_STYLE!;

export enum COLOR_THEME {
  TEAL = "teal",
  TOMATO = "tomato",
  MANGO = "mango",
}

export type ColorTheme = `${COLOR_THEME}`;

export const COLOR_THEME_VALUES = Object.values(COLOR_THEME);

export const COLOR_THEME_META: Record<
  ColorTheme,
  { label: string; color: string }
> = {
  [COLOR_THEME.TEAL]: { label: "Teal", color: "#14b8a6" },
  [COLOR_THEME.TOMATO]: { label: "Tomato", color: "#dc2626" },
  [COLOR_THEME.MANGO]: { label: "Mango", color: "#e8780a" },
};

export const SORT_VALUES = [
  "date_asc",
  "date_desc",
  "magnitude_asc",
  "magnitude_desc",
  "depth_asc",
  "depth_desc",
] as const;

export type SortOption = (typeof SORT_VALUES)[number];

export const SORT_OPTIONS_META: Record<SortOption, string> = {
  date_asc: "sort.dateOldest",
  date_desc: "sort.dateNewest",
  magnitude_asc: "sort.magnitudeAscending",
  magnitude_desc: "sort.magnitudeDescending",
  depth_asc: "sort.depthAscending",
  depth_desc: "sort.depthDescending",
};

export const DATE_RANGE_START = new Date(1930, 0, 1);
export const DATE_RANGE_END = new Date(2018, 11, 31);
export const COOKIE_CONSENT_KEY = "cookie-consent";
export const LOCALES = ["en", "de", "es"] as const;
export const DEFAULT_LOCALE = "en";
export type Locale = (typeof LOCALES)[number];
export const LOCALE_META: Record<Locale, { flag: string; label: string }> = {
  en: { flag: "🇬🇧", label: "English" },
  de: { flag: "🇩🇪", label: "Deutsch" },
  es: { flag: "🇪🇸", label: "Español" },
};

export const LOCALE_MAP = {
  en: enUS,
  de: de,
  es: es,
};
