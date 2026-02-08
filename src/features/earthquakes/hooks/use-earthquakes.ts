import { useQuery } from "@tanstack/react-query";

import { getEarthquakes } from "../api";

export function useEarthquakes(params) {
  return useQuery({
    queryKey: ["earthquakes", params],
    queryFn: () => getEarthquakes(params),
  });
}
