import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useFilters } from "@/features/filters/hooks/use-filters";
import { useMapRequestParams } from "@/features/map/store/use-map-request-params";
import { PERIODS } from "@/shared/constants";
import type { TimeInterval } from "@/types/main";

import { getEarthquakesTimeSeries } from "../api";

export function useEarthquakesTimeSeries() {
  const [interval, setInterval] = useState<TimeInterval>(PERIODS.MONTH);
  const { apiFilters } = useFilters();
  const mapRequestParams = useMapRequestParams.getState().requestParams;

  const params = { ...apiFilters, interval };

  const { data, isLoading } = useQuery({
    queryKey: ["earthquakes-time-series", params, interval],
    queryFn: () =>
      getEarthquakesTimeSeries({
        ...params,
        ...mapRequestParams,
        interval,
      }),
  });

  return { data, isLoading, setInterval, interval };
}
