import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { getImportStatus } from "@/features/earthquakes/api";

export function useImportStatus() {
  const [jobId] = useQueryState("jobId", { defaultValue: "" });

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

  return {
    jobStatus,
    jobId,
  };
}
