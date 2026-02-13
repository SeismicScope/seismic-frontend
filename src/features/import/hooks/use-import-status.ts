import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { useEffect, useRef } from "react";

import { getImportStatus } from "../api";

export function useImportStatus() {
  const [jobId] = useQueryState("jobId", { defaultValue: "" });
  const queryClient = useQueryClient();
  const prevStatusRef = useRef<string | undefined>(undefined);

  const { data: jobStatus } = useQuery({
    queryKey: ["import-status", jobId],
    queryFn: async () => {
      const status = await getImportStatus(Number(jobId));

      return status;
    },
    enabled: !!jobId,
    refetchInterval: (query) => {
      return query.state.data?.status === "processing" ||
        query.state.data?.status === "queued"
        ? 2000
        : false;
    },
  });

  useEffect(() => {
    const prev = prevStatusRef.current;
    const current = jobStatus?.status;

    if (prev && prev !== "completed" && current === "completed") {
      queryClient.invalidateQueries({ queryKey: ["earthquakes"] });
      queryClient.invalidateQueries({ queryKey: ["earthquakes-histogram"] });
      queryClient.invalidateQueries({ queryKey: ["earthquakes-stats"] });
      queryClient.invalidateQueries({ queryKey: ["earthquakes-time-series"] });
      queryClient.invalidateQueries({ queryKey: ["map-data"] });
    }

    prevStatusRef.current = current;
  }, [jobStatus?.status, queryClient]);

  return {
    jobStatus,
    jobId,
  };
}
