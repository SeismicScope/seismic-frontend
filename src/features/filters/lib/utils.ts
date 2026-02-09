import type { FilterType } from "../types";

export function getApiFilters(filters: FilterType) {
  return {
    minMagnitude: filters.minMagnitude ?? undefined,
    maxMagnitude: filters.maxMagnitude ?? undefined,
    minDepth: filters.minDepth ?? undefined,
    maxDepth: filters.maxDepth ?? undefined,
    dateFrom: filters.dateFrom ?? undefined,
    dateTo: filters.dateTo ?? undefined,
  };
}
