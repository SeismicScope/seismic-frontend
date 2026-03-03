import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useFilters } from "@/entities/filter/hooks/use-filters";
import { useMapRequestParams } from "@/entities/map/model/use-map-request-params";
import { PERIODS } from "@/shared/constants";
import type { TimeInterval } from "@/types/main";

import { getEarthquakesTimeSeries } from "../api";
import { ANALYTICS_KEYS } from "../constants";

export function useEarthquakesTimeSeries() {
  const [interval, setInterval] = useState<TimeInterval>(PERIODS.MONTH);
  const { apiFilters } = useFilters();
  const mapRequestParams =
    useMapRequestParams((state) => state.requestParams) ?? {};

  const params = { ...apiFilters, interval };

  const { data, isLoading } = useQuery({
    queryKey: ANALYTICS_KEYS.timeSeries({
      filters: params,
      mapRequestParams,
      interval,
    }),

    queryFn: () =>
      getEarthquakesTimeSeries({
        ...apiFilters,
        ...mapRequestParams,
        interval,
      }),

    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, setInterval, interval };
}
