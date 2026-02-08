import { useQuery } from "@tanstack/react-query";

import { getEarthquakesStats } from "../api";

export function useEarthquakesStats() {
  return useQuery({
    queryKey: ["earthquakes-stats"],
    queryFn: () => getEarthquakesStats(),
  });
}
