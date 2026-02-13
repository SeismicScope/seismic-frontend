import { api } from "@/shared/lib/axios";

import type { ImportStatus, UploadParams } from "../types";

export async function uploadEarthquakes(
  params: UploadParams,
): Promise<ImportStatus> {
  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("secretWord", params.secretWord);

  const { data } = await api.post("/import/upload", formData);

  return data;
}

export async function getImportStatus(jobId: number): Promise<ImportStatus> {
  const { data } = await api.get(`/import/status/${jobId}`);

  return data;
}
