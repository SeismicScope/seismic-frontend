import type { EarthquakeFilters } from "@/features/filters/types";
import type { MapParams } from "@/features/map/store/use-map-request-params";

export const EARTHQUAKES_KEYS = {
  all: ["earthquakes"] as const,

  filtered: (filters: EarthquakeFilters, params: MapParams) =>
    [...EARTHQUAKES_KEYS.all, { ...filters, ...params }] as const,

  earthquakes: (filters: EarthquakeFilters, params: MapParams) =>
    [...EARTHQUAKES_KEYS.filtered(filters, params)] as const,

  histogram: (filters: EarthquakeFilters, params: MapParams) =>
    [...EARTHQUAKES_KEYS.filtered(filters, params), "histogram"] as const,
};
