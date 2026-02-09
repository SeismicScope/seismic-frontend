import { api } from "@/shared/lib/axios";

import type { MapRequest, MapResponse } from "../types";

export async function getMapData(
  params: MapRequest,
  signal?: AbortSignal,
): Promise<MapResponse> {
  const { data } = await api.get<MapResponse>("/map", { params, signal });

  return data;
}
