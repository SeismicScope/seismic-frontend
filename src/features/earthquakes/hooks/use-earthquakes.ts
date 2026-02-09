import { useInfiniteQuery } from "@tanstack/react-query";

import { useFilters } from "../../filters/hooks/use-filters";
import { getEarthquakes } from "../api";

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
