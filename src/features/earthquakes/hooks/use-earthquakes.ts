import { useInfiniteQuery } from "@tanstack/react-query";

import { getEarthquakes } from "@/features/earthquakes/api";
import { useFilters } from "@/features/filters/hooks/use-filters";

export function useEarthquakes() {
  const { apiFilters } = useFilters();

  return useInfiniteQuery({
    queryKey: ["earthquakes", apiFilters],
    queryFn: ({ pageParam }) =>
      getEarthquakes({
        ...apiFilters,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as number | undefined,
  });
}
