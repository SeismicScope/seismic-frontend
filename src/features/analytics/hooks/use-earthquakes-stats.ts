import { useQuery } from "@tanstack/react-query";

import { useFilters } from "@/entities/filter/hooks/use-filters";
import { useMapRequestParams } from "@/entities/map/model/use-map-request-params";

import { getEarthquakesStats } from "../api";
import { ANALYTICS_KEYS } from "../constants";

export function useEarthquakesStats() {
  const { apiFilters } = useFilters();

  const mapRequestParams =
    useMapRequestParams((state) => state.requestParams) ?? {};

  return useQuery({
    queryKey: ANALYTICS_KEYS.stats(apiFilters, mapRequestParams),

    queryFn: () => getEarthquakesStats({ ...apiFilters, ...mapRequestParams }),
  });
}
