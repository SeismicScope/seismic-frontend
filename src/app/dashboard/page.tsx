"use client";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useEarthquakes } from "@/features/earthquakes/hooks/use-earthquakes";
import { useEarthquakeHistogram } from "@/features/earthquakes/hooks/use-earthquakes-histogram";
import { useEarthquakesStats } from "@/features/earthquakes/hooks/use-earthquakes-stats";

import JobStatus from "./job-status";
import UploadFromCSVModal from "./upload-from-csv-modal";

export default function DashboardPage() {
  const { data: histogram } = useEarthquakeHistogram();
  const { data: stats } = useEarthquakesStats();
  const { data, isLoading } = useEarthquakes({ limit: 50 });
  const { user } = useAuth();

  console.log("histogram", histogram);
  console.log("stats", stats);
  console.log("isLoading", isLoading);
  console.log("data", data);

  return (
    <div className="mt-5 w-full px-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user && (
        <>
          <p className="text-muted-foreground">Hello {user?.name}</p>
          <UploadFromCSVModal />
          <JobStatus />
        </>
      )}
    </div>
  );
}
