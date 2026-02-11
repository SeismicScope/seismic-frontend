import { api } from "@/shared/lib/axios";

import type { ImportStatus } from "../types";

export async function uploadEarthquakes(data: FormData): Promise<ImportStatus> {
  const { data: earthquake } = await api.post("/import/upload", data);

  return earthquake;
}

export async function getImportStatus(jobId: number): Promise<ImportStatus> {
  const { data } = await api.get(`/import/status/${jobId}`);

  return data;
}
