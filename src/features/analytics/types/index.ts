import type { EarthquakeFilters } from "@/features/earthquakes/types";

export type EarthquakeStats = {
  avgDepth: number;
  avgMagnitude: number;
  maxMagnitude: number;
  totalEvents: number;
};

export type EarthquakeTimeSeries = {
  date: string;
  count: number;
};

export type TimeInterval = "day" | "week" | "month" | "year";

export type TimeSeriesParams = EarthquakeFilters & {
  interval?: TimeInterval;
};
