import { useQuery } from "@tanstack/react-query";

import { useFilters } from "@/features/filters/hooks/use-filters";

import { getDashboardMapData, getMapData } from "../api";
import { MAP_KEYS } from "../constants";
import type { MapRequest } from "../types";

type UseMapDataOptions = {
  requestParams: MapRequest | null;
  isDashboard?: boolean;
};

export function useMapData({
  requestParams,
  isDashboard = false,
}: UseMapDataOptions) {
  const { apiFilters } = useFilters();

  return useQuery({
    queryKey: isDashboard
      ? MAP_KEYS.dataDashboard(apiFilters, requestParams)
      : MAP_KEYS.data(apiFilters, requestParams),

    queryFn: ({ signal }) => {
      if (!requestParams) throw new Error("Params are required");

      const fetcher = isDashboard ? getDashboardMapData : getMapData;

      return fetcher({
        params: requestParams,
        signal,
        filters: apiFilters,
      });
    },

    enabled: !!requestParams,
    staleTime: 30_000,
  });
}
