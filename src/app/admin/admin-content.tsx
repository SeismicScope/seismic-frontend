"use client";

import { notFound } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/use-auth";
import LayoutLoader from "@/shared/ui/layout-loader";

import JobStatus from "../../features/import/components/upload-from-csv/job-status";
import UploadFromCSVModal from "../../features/import/components/upload-from-csv/upload-from-csv-modal";

export default function AdminContent() {
  const { user, isLoading } = useAuth();

  if (!isLoading && !user) {
    notFound();
  }

  if (isLoading) {
    return <LayoutLoader />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="mt-4 flex w-full flex-col gap-3 px-3 lg:w-1/3">
      <p className="text-muted-foreground">Hello {user?.name}</p>
      <div className="bg-card flex flex-col gap-4 rounded-lg border p-6">
        <h3 className="text-lg font-semibold">Import Earthquakes</h3>
        <p className="text-muted-foreground text-sm">
          Upload a CSV file with earthquake data. You will need the secret word
          to proceed.
        </p>
        <UploadFromCSVModal />
        <JobStatus />
      </div>
    </div>
  );
}
