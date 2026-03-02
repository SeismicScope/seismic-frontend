import type { EarthquakeFilters } from "@/features/filters/types";
import type { MapParams } from "@/features/map/store/use-map-request-params";
import type { TimeInterval } from "@/types/main";

export const ANALYTICS_KEYS = {
  all: ["earthquakes"] as const,

  filtered: (filters: EarthquakeFilters, params: MapParams) =>
    [...ANALYTICS_KEYS.all, { ...filters, ...params }] as const,

  stats: (filters: EarthquakeFilters, params: MapParams) =>
    [...ANALYTICS_KEYS.filtered(filters, params), "stats"] as const,

  timeSeries: ({
    filters,
    mapRequestParams,
    interval,
  }: {
    filters: EarthquakeFilters;
    mapRequestParams: MapParams;
    interval: TimeInterval;
  }) =>
    [
      ...ANALYTICS_KEYS.filtered(filters, mapRequestParams),
      "time-series",
      { interval },
    ] as const,
};
