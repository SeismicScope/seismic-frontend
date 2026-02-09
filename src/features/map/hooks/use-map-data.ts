import { useQuery } from "@tanstack/react-query";

import { getMapData } from "../api";
import type { MapRequest } from "../types";

export function useMapData(bounds: MapRequest | null) {
  return useQuery({
    queryKey: ["map-data", bounds],
    queryFn: ({ signal }) => getMapData(bounds!, signal),
    enabled: bounds !== null,
    staleTime: 30_000,
  });
}
