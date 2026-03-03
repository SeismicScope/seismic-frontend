import { useQuery } from "@tanstack/react-query";

import { useFilters } from "@/entities/filter/hooks/use-filters";
import { useMapRequestParams } from "@/entities/map/model/use-map-request-params";

import { getEarthquakesMagnitudeHistogram } from "../api";
import { EARTHQUAKES_KEYS } from "../constants";

export function useEarthquakeHistogram() {
  const { apiFilters } = useFilters();
  const mapRequestParams =
    useMapRequestParams((state) => state.requestParams) ?? {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { minMag, maxMag, ...filtersWithoutMag } = apiFilters;

  return useQuery({
    queryKey: EARTHQUAKES_KEYS.histogram(apiFilters, mapRequestParams),
    queryFn: () =>
      getEarthquakesMagnitudeHistogram({
        ...filtersWithoutMag,
        ...mapRequestParams,
      }),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
