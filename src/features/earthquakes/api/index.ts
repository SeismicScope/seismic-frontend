import { api } from "@/shared/lib/axios";

import type {
  EarthquakeParams,
  EarthquakesResponse,
  ImportStatus,
} from "./types";

export async function getEarthquakes(
  params: EarthquakeParams,
): Promise<EarthquakesResponse> {
  const { data } = await api.get("/earthquakes", { params });

  return data;
}

export async function getEarthquakesStats() {
  const { data } = await api.get("/earthquakes/stats");

  return data;
}

export async function getEarthquakesMagnitudeHistogram() {
  const { data } = await api.get("/earthquakes/magnitude-histogram");

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
