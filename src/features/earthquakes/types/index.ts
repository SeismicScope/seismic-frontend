import type { EarthquakeFilters } from "@/entities/filter/types";
import type { MapParams } from "@/entities/map/model/use-map-request-params";
import type { SortOption } from "@/shared/constants";
import type { Earthquake } from "@/types/main";

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
