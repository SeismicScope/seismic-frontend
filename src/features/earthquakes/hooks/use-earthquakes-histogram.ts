import { useQuery } from "@tanstack/react-query";

import { useFilters } from "@/features/filters/hooks/use-filters";

import { getEarthquakesMagnitudeHistogram } from "../api";

export function useEarthquakeHistogram() {
  const { apiFilters } = useFilters();

  return useQuery({
    queryKey: ["earthquakes-histogram", apiFilters],
    queryFn: () => getEarthquakesMagnitudeHistogram(apiFilters),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
