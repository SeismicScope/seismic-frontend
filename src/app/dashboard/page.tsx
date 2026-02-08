"use client";
import { useAuth } from "@/features/auth/hooks/use-auth";
import EarthquakesStats from "@/features/earthquakes/components/earthquakes-stats";
import { EarthquakeTable } from "@/features/earthquakes/components/earthquakes-table";
import { useEarthquakeHistogram } from "@/features/earthquakes/hooks/use-earthquakes-histogram";

import JobStatus from "./job-status";
import UploadFromCSVModal from "./upload-from-csv-modal";

export default function DashboardPage() {
  const { data: histogram } = useEarthquakeHistogram();
  const { user } = useAuth();

  console.log("histogram", histogram);

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

      <EarthquakesStats />
      <EarthquakeTable />
    </div>
  );
}
