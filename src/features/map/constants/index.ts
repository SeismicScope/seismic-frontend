import type { EarthquakeFilters } from "@/entities/filter/types";

import type { MapParams } from "../../../entities/map/model/use-map-request-params";

export const SOURCE_ID = "earthquakes";
export const LAYER_CLUSTERS = "clusters";
export const LAYER_CLUSTER_COUNT = "cluster-count";
export const LAYER_POINTS = "unclustered-point";

export const MAP_KEYS = {
  all: ["map-data"] as const,
  dashboard: ["map-data-dashboard"] as const,

  data: (filters: EarthquakeFilters, params: MapParams | null) =>
    [...MAP_KEYS.all, { ...filters, ...(params ?? {}) }] as const,

  dataDashboard: (filters: EarthquakeFilters, params: MapParams | null) =>
    [...MAP_KEYS.dashboard, { ...filters, ...(params ?? {}) }] as const,
};
