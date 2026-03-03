import type { EarthquakeFilters } from "@/entities/filter/types";
import type { MapParams } from "@/entities/map/model/use-map-request-params";
import type { SortOption } from "@/shared/constants";

export type Earthquake = {
  id: number;
  externalId: string | null;
  occurredAt: string;
  magnitude: number;
  depth: number;
  latitude: number;
  longitude: number;
  location: string | null;
  createdAt: string;
};

export type EarthquakesResponse = {
  data: Earthquake[];
  total: number;
  nextCursor: number | null;
};

export type EarthquakeParams = EarthquakeFilters &
  MapParams & {
    limit?: number;
    cursor?: number;
    sort?: SortOption;
  };
