import type { EarthquakeFilters } from "@/entities/filter/types";
import type { MapParams } from "@/entities/map/model/use-map-request-params";

export const DANGEROUS_MAGNITUDE_LEVEL = 5;

export const EARTHQUAKES_KEYS = {
  all: ["earthquakes"] as const,

  filtered: (filters: EarthquakeFilters, params: MapParams) =>
    [...EARTHQUAKES_KEYS.all, { ...filters, ...params }] as const,

  histogram: (filters: EarthquakeFilters, params: MapParams) =>
    [...EARTHQUAKES_KEYS.filtered(filters, params), "histogram"] as const,
};
