import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { uploadEarthquakes } from "@/features/earthquakes/api";

export function useUploadEarthquakes() {
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const data = await uploadEarthquakes(formData);

      return data;
    },
    onSuccess: (data) => {
      newSearchParams.set("jobId", data.id.toString());
      queryClient.invalidateQueries({ queryKey: ["import-status"] });
    },
  });
}
