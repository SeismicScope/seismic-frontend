import { api } from "@/shared/lib/axios";
import type { Earthquake } from "@/types/main";

import type { EarthquakeParams, EarthquakesResponse } from "../types";

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
