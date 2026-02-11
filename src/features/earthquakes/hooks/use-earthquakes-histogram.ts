import { useQuery } from "@tanstack/react-query";

import { useFilters } from "@/features/filters/hooks/use-filters";

import { getEarthquakesMagnitudeHistogram } from "../api";

export function useEarthquakeHistogram() {
  const { apiFilters } = useFilters();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { minMag, maxMag, ...filtersWithoutMag } = apiFilters;

  return useQuery({
    queryKey: ["earthquakes-histogram", filtersWithoutMag],
    queryFn: () => getEarthquakesMagnitudeHistogram(filtersWithoutMag),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
