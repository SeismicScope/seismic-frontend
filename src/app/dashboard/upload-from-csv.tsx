"use client";

import { useAuth } from "@/features/auth/hooks/use-auth";

import JobStatus from "./job-status";
import UploadFromCSVModal from "./upload-from-csv-modal";

function UploadFromCSV() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <>
      <p className="text-muted-foreground">Hello {user?.name}</p>
      <UploadFromCSVModal />
      <JobStatus />
    </>
  );
}

export default UploadFromCSV;
