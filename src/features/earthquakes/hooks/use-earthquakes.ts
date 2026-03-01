import { useInfiniteQuery } from "@tanstack/react-query";

import { getEarthquakes } from "@/features/earthquakes/api";
import { useFilters } from "@/features/filters/hooks/use-filters";
import { useMapRequestParams } from "@/features/map/store/use-map-request-params";

export function useEarthquakes() {
  const { apiFilters } = useFilters();
  const mapRequestParams = useMapRequestParams.getState().requestParams;

  return useInfiniteQuery({
    queryKey: ["earthquakes", apiFilters, mapRequestParams],
    queryFn: ({ pageParam }) =>
      getEarthquakes({
        ...apiFilters,
        ...mapRequestParams,
        cursor: pageParam,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined as number | undefined,
  });
}
