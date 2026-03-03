import type { EarthquakeFilters } from "@/entities/filter/types";
import { api } from "@/shared/lib/axios";

import type { MagnitudeHistogram } from "../types";

export async function getEarthquakesMagnitudeHistogram(
  filters: EarthquakeFilters,
): Promise<MagnitudeHistogram[]> {
  const { data } = await api.get("/earthquakes/magnitude-histogram", {
    params: filters,
  });

  return data;
}
