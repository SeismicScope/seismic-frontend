export const IMPORT_KEYS = {
  all: ["import"] as const,

  status: (jobId: string) => [IMPORT_KEYS.all, "status", jobId] as const,
};
