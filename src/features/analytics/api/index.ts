import type { EarthquakeFilters } from "@/features/earthquakes/types";
import { api } from "@/shared/lib/axios";

import type {
  EarthquakeStats,
  EarthquakeTimeSeries,
  TimeSeriesParams,
} from "../types";

export async function getEarthquakesStats(
  filters: EarthquakeFilters,
): Promise<EarthquakeStats> {
  const { data } = await api.get("/analytics/stats", { params: filters });

  return data;
}

export async function getEarthquakesTimeSeries(
  params: TimeSeriesParams,
): Promise<EarthquakeTimeSeries[]> {
  const { data } = await api.get("/analytics/time-series", { params });

  return data;
}
