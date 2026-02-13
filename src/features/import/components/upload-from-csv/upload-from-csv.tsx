"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";

import JobStatus from "./job-status";
import UploadFromCSVModal from "./upload-from-csv-modal";

function UploadFromCSV() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex w-full flex-col gap-3 px-3 lg:w-1/3">
      <p className="text-muted-foreground">Hello {user?.name}</p>
      <UploadFromCSVModal />
      <JobStatus />
    </div>
  );
}

export default UploadFromCSV;
