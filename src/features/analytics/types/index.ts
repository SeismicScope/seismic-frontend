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

export type TimeSeriesParams = {
  interval?: TimeInterval;
  minMag?: number;
  maxMag?: number;
  minDepth?: number;
  maxDepth?: number;
  dateFrom?: string;
  dateTo?: string;
};
