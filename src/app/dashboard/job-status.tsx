"use client";
import { useImportStatus } from "@/features/import/hooks/use-import-status";

function JobStatus() {
  const { jobStatus, jobId } = useImportStatus();

  if (!jobId) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Status: {jobStatus?.status}</span>
        <span>Processed: {jobStatus?.processed}</span>
      </div>

      {jobStatus?.status === "completed" && (
        <p className="text-success text-sm">✓ Import finished successfully!</p>
      )}
    </div>
  );
}

export default JobStatus;
