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
