import { useInfiniteQuery } from "@tanstack/react-query";

import { getEarthquakes } from "../api";
import type { EarthquakeParams } from "../api/types";

export function useEarthquakes(params: EarthquakeParams | undefined) {
  return useInfiniteQuery({
    queryKey: ["earthquakes", params],
    queryFn: ({ pageParam }) => {
      return getEarthquakes({
        ...params,
        cursor: pageParam,
      });
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as number | undefined,
  });
}
