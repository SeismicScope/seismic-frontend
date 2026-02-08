import { useQuery } from "@tanstack/react-query";

import { getEarthquakesMagnitudeHistogram } from "../api";

export function useEarthquakeHistogram() {
  return useQuery({
    queryKey: ["earthquakes-histogram"],
    queryFn: () => getEarthquakesMagnitudeHistogram(),
  });
}
