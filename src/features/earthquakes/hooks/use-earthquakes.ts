import { useInfiniteQuery } from "@tanstack/react-query";

import { useFilters } from "../../filters/hooks/use-filters";
import { getEarthquakes } from "../api";

export function useEarthquakes() {
  const { apiFilters } = useFilters();

  const filters = {
    minMag: apiFilters.minMag,
    maxMag: apiFilters.maxMag,
    minDepth: apiFilters.minDepth,
    maxDepth: apiFilters.maxDepth,
    dateFrom: apiFilters.dateFrom?.toISOString(),
    dateTo: apiFilters.dateTo?.toISOString(),
  };

  return useInfiniteQuery({
    queryKey: ["earthquakes", filters],
    queryFn: ({ pageParam }) =>
      getEarthquakes({
        ...filters,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as number | undefined,
  });
}
