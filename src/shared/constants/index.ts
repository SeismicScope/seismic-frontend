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
  date_asc: "Date (oldest first)",
  date_desc: "Date (newest first)",
  magnitude_asc: "Magnitude (low to high)",
  magnitude_desc: "Magnitude (high to low)",
  depth_asc: "Depth (shallow to deep)",
  depth_desc: "Depth (deep to shallow)",
};

export const DATE_RANGE_START = new Date(1930, 0, 1);
export const DATE_RANGE_END = new Date(2018, 11, 31);
