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

export type EarthquakeFilters = {
  minMag?: number;
  maxMag?: number;
  minDepth?: number;
  maxDepth?: number;
  dateFrom?: string;
  dateTo?: string;
};

export type EarthquakeParams = EarthquakeFilters & {
  limit?: number;
  cursor?: number;
  sort?: SortOption;
};

export type MagnitudeHistogram = {
  magnitude: number;
  count: number;
};
