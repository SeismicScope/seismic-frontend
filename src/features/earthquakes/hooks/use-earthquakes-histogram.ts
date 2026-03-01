import { useQuery } from "@tanstack/react-query";

import { useFilters } from "@/features/filters/hooks/use-filters";
import { useMapRequestParams } from "@/features/map/store/use-map-request-params";

import { getEarthquakesMagnitudeHistogram } from "../api";

export function useEarthquakeHistogram() {
  const { apiFilters } = useFilters();
  const mapRequestParams = useMapRequestParams.getState().requestParams;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { minMag, maxMag, ...filtersWithoutMag } = apiFilters;

  return useQuery({
    queryKey: ["earthquakes-histogram", filtersWithoutMag, mapRequestParams],
    queryFn: () =>
      getEarthquakesMagnitudeHistogram({
        ...filtersWithoutMag,
        ...mapRequestParams,
      }),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
