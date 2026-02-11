import { useQuery } from "@tanstack/react-query";

import { useFilters } from "@/features/filters/hooks/use-filters";

import { getEarthquakesStats } from "../api";

export function useEarthquakesStats() {
  const { apiFilters } = useFilters();

  return useQuery({
    queryKey: ["earthquakes-stats", apiFilters],
    queryFn: () => getEarthquakesStats(apiFilters),
  });
}
