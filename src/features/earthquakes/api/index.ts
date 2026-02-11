import { api } from "@/shared/lib/axios";

import type {
  Earthquake,
  EarthquakeFilters,
  EarthquakeParams,
  EarthquakesResponse,
  MagnitudeHistogram,
} from "../types";

export async function getEarthquakes(
  params: EarthquakeParams,
): Promise<EarthquakesResponse> {
  const { data } = await api.get("/earthquakes", { params });

  return data;
}

export async function getEarthquakeById(id: string): Promise<Earthquake> {
  const { data } = await api.get(`/earthquakes/${id}`);

  return data;
}

export async function getEarthquakesMagnitudeHistogram(
  filters: EarthquakeFilters,
): Promise<MagnitudeHistogram[]> {
  const { data } = await api.get("/earthquakes/magnitude-histogram", {
    params: filters,
  });

  return data;
}
