"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { uploadEarthquakes } from "@/features/earthquakes/api";

export function useDashboard() {
  function useUploadEarthquakes() {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const data = await uploadEarthquakes(formData);

        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["import-status"] });
      },
    });
  }

  return {
    useUploadEarthquakes,
  };
}
