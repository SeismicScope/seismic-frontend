import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { uploadEarthquakes } from "../api";
import { IMPORT_KEYS } from "../constants";
import type { UploadParams } from "../types";

export function useUploadEarthquakes() {
  const [, setJobId] = useQueryState("jobId", { defaultValue: "" });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: UploadParams) => {
      const data = await uploadEarthquakes(params);

      return data;
    },
    onSuccess: (data) => {
      const jobId = data.id.toString();
      setJobId(jobId);
      queryClient.invalidateQueries({ queryKey: IMPORT_KEYS.status(jobId) });
    },
    meta: { skipGlobalErrorHandler: true },
  });
}
