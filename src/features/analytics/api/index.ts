import type { EarthquakeFilters } from "@/features/earthquakes/api/types";
import { api } from "@/shared/lib/axios";

export async function getEarthquakesStats(filters: EarthquakeFilters) {
  const { data } = await api.get("/analytics/stats", { params: filters });

  return data;
}
