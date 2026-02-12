export enum PERIODS {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export const PERIOD_INTERVALS = [
  PERIODS.DAY,
  PERIODS.WEEK,
  PERIODS.MONTH,
  PERIODS.YEAR,
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
