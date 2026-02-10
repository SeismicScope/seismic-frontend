import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { uploadEarthquakes } from "@/features/earthquakes/api";

export function useUploadEarthquakes() {
  const [, setJobId] = useQueryState("jobId", { defaultValue: "" });
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const data = await uploadEarthquakes(formData);

      return data;
    },
    onSuccess: (data) => {
      setJobId(data.id.toString());
      queryClient.invalidateQueries({ queryKey: ["import-status"] });
    },
  });
}
