"use client";
import { useImportStatus } from "@/shared/hooks/use-import-status";

const JobStatus = () => {
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

      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{
            width: jobStatus?.totalRows
              ? `${(jobStatus.processed / jobStatus.totalRows) * 100}%`
              : "50%",
          }}
        />
      </div>

      {jobStatus?.status === "completed" && (
        <p className="text-sm text-green-600">
          ✓ Import finished successfully!
        </p>
      )}
    </div>
  );
};

export default JobStatus;
