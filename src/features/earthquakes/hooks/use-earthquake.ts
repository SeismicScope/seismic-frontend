import { useQuery } from "@tanstack/react-query";

import { getEarthquakeById } from "../api";

export function useEarthquake({ id }: { id?: string }) {
  return useQuery({
    queryKey: ["earthquake", id],
    queryFn: () => getEarthquakeById(id as string),
    enabled: Boolean(id),
  });
}
