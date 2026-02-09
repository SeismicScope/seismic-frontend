import { api } from "@/shared/lib/axios";

import type {
  EarthquakeFilters,
  EarthquakeParams,
  EarthquakesResponse,
  ImportStatus,
  MagnitudeHistogram,
} from "../types";

export async function getEarthquakes(
  params: EarthquakeParams,
): Promise<EarthquakesResponse> {
  const { data } = await api.get("/earthquakes", { params });

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

export async function uploadEarthquakes(data: FormData): Promise<ImportStatus> {
  const { data: earthquake } = await api.post("/import/upload", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return earthquake;
}

export async function getImportStatus(jobId: number): Promise<ImportStatus> {
  const { data } = await api.get(`/import/status/${jobId}`);

  return data;
}
