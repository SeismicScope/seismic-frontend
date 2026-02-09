import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useFilters } from "@/features/filters/hooks/use-filters";

import { getEarthquakesTimeSeries } from "../api";
import type { TimeInterval } from "../types";

export function useEarthquakesTimeSeries() {
  const [interval, setInterval] = useState<TimeInterval>("month");
  const { apiFilters } = useFilters();

  const params = { ...apiFilters, interval };

  const { data, isLoading } = useQuery({
    queryKey: ["earthquakes-time-series", params, interval],
    queryFn: () =>
      getEarthquakesTimeSeries({
        ...params,
        interval,
      }),
  });

  return { data, isLoading, setInterval, interval };
}
