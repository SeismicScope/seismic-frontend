import { useQuery } from "@tanstack/react-query";

import { getDashboardMapData, getMapData } from "../api";
import type { MapRequest } from "../types";

type UseMapDataOptions = {
  requestParams: MapRequest | null;
  isDashboard?: boolean;
};

export function useMapData({
  requestParams,
  isDashboard = false,
}: UseMapDataOptions) {
  return useQuery({
    queryKey: [isDashboard ? "map-data-dashboard" : "map-data", requestParams],

    queryFn: ({ signal }) => {
      const fetcher = isDashboard ? getDashboardMapData : getMapData;

      return fetcher(requestParams!, signal);
    },

    enabled: !!requestParams,
    staleTime: 30_000,
  });
}
