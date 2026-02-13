import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { uploadEarthquakes } from "../api";
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
      setJobId(data.id.toString());
      queryClient.invalidateQueries({ queryKey: ["import-status"] });
    },
    meta: { skipGlobalErrorHandler: true },
  });
}
