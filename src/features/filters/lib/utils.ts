import type { FilterType } from "../types";

export function getApiFilters(filters: FilterType) {
  return {
    minMag: filters.minMag ?? undefined,
    maxMag: filters.maxMag ?? undefined,
    minDepth: filters.minDepth ?? undefined,
    maxDepth: filters.maxDepth ?? undefined,
    dateFrom: filters.dateFrom ?? undefined,
    dateTo: filters.dateTo ?? undefined,
  };
}
