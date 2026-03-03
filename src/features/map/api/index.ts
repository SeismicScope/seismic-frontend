import type { EarthquakeFilters } from "@/entities/filter/types";
import type { MapRequest } from "@/entities/map/types";
import { api } from "@/shared/lib/axios";

import type { MapResponse } from "../types";

type GetMapProps = {
  params: MapRequest;
  signal?: AbortSignal;
  filters: EarthquakeFilters;
};

export async function getMapData({
  params,
  signal,
  filters,
}: GetMapProps): Promise<MapResponse> {
  const { data } = await api.get<MapResponse>("/map", {
    params: {
      ...params,
      ...filters,
    },
    signal,
  });

  return data;
}

export async function getDashboardMapData({
  params,
  signal,
  filters,
}: GetMapProps): Promise<MapResponse> {
  const { data } = await api.get<MapResponse>("/map/dashboard", {
    params: {
      ...params,
      ...filters,
    },
    signal,
  });

  return data;
}
