import type { SortOption } from "@/shared/constants";

export type FilterType = {
  dateFrom?: Date | null;
  dateTo?: Date | null;
  minDepth?: number | null;
  maxDepth?: number | null;
  minMag?: number | null;
  maxMag?: number | null;
  sort?: SortOption | null;
};

export type EarthquakeFilters = {
  minMag?: number;
  maxMag?: number;
  minDepth?: number;
  maxDepth?: number;
  dateFrom?: string;
  dateTo?: string;
};
