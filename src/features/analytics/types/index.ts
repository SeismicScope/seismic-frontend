import type { EarthquakeFilters } from "@/entities/filter/types";
import type { TimeInterval } from "@/types/main";

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

export type TimeSeriesParams = EarthquakeFilters & {
  interval?: TimeInterval;
};
