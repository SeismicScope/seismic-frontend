import { useQuery } from "@tanstack/react-query";

import { useFilters } from "@/features/filters/hooks/use-filters";

import { getEarthquakesTimeSeries } from "../api";
import type { TimeInterval } from "../types";

export function useEarthquakesTimeSeries(interval: TimeInterval = "month") {
  const { apiFilters } = useFilters();

  const params = { ...apiFilters, interval };

  return useQuery({
    queryKey: ["earthquakes-time-series", params],
    queryFn: () => getEarthquakesTimeSeries(params),
  });
}
