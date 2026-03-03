import type { EarthquakeFilters } from "@/entities/filter/types";
import type { MapParams } from "@/entities/map/model/use-map-request-params";
import { api } from "@/shared/lib/axios";

import type {
  EarthquakeStats,
  EarthquakeTimeSeries,
  TimeSeriesParams,
} from "../types";

export async function getEarthquakesStats(
  filters: EarthquakeFilters & MapParams,
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
