import { useInfiniteQuery } from "@tanstack/react-query";

import { useFilters } from "@/entities/filter/hooks/use-filters";
import { useMapRequestParams } from "@/entities/map/model/use-map-request-params";
import { getEarthquakes } from "@/features/earthquakes/api";

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
