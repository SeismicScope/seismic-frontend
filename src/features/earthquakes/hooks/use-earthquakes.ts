import { useInfiniteQuery } from "@tanstack/react-query";

import { getEarthquakes } from "@/features/earthquakes/api";
import { useFilters } from "@/features/filters/hooks/use-filters";
import { useMapRequestParams } from "@/features/map/store/use-map-request-params";

import { EARTHQUAKES_KEYS } from "../constants";

export function useEarthquakes() {
  const { apiFilters } = useFilters();
  const mapRequestParams =
    useMapRequestParams((state) => state.requestParams) ?? {};

  return useInfiniteQuery({
    queryKey: EARTHQUAKES_KEYS.earthquakes(apiFilters, mapRequestParams),
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
