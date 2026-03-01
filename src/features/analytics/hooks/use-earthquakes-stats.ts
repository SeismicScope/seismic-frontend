import { useQuery } from "@tanstack/react-query";

import { useFilters } from "@/features/filters/hooks/use-filters";
import { useMapRequestParams } from "@/features/map/store/use-map-request-params";

import { getEarthquakesStats } from "../api";

export function useEarthquakesStats() {
  const { apiFilters } = useFilters();
  const mapRequestParams = useMapRequestParams((state) => state.requestParams);

  return useQuery({
    queryKey: ["earthquakes-stats", apiFilters, mapRequestParams],
    queryFn: () => getEarthquakesStats({ ...apiFilters, ...mapRequestParams }),
  });
}
