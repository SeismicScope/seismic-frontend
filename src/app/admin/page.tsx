"use client";
import { useAuth } from "@/features/auth/hooks/use-auth";

import JobStatus from "./job-status";
import UploadFromCSVModal from "./upload-from-csv-modal";

const AdminPage = () => {
  const { user } = useAuth();

  return (
    <div>
      {user && (
        <>
          <p className="text-muted-foreground">Hello {user?.name}</p>
          <UploadFromCSVModal />
          <JobStatus />
        </>
      )}
    </div>
  );
};

export default AdminPage;
