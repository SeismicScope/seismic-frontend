import { useInfiniteQuery } from "@tanstack/react-query";

import { useFilters } from "../../filters/hooks/use-filters";
import { getEarthquakes } from "../api";
import type { EarthquakeParams } from "../api/types";

export function useEarthquakes(params: EarthquakeParams | undefined) {
  const { apiFilters } = useFilters();

  return useInfiniteQuery({
    queryKey: ["earthquakes", params],
    queryFn: ({ pageParam }) => {
      return getEarthquakes({
        ...params,
        cursor: pageParam,
        ...apiFilters,
      });
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as number | undefined,
  });
}
