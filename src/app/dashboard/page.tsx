"use client";
import EarthquakesStats from "@/features/analytics/components/earthquakes-stats";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { EarthquakeTable } from "@/features/earthquakes/components/earthquakes-table";
import Filters from "@/features/filters/components/filters";
import { useFilters } from "@/features/filters/hooks/use-filters";
import { Button } from "@/shared/ui/button";

import JobStatus from "./job-status";
import UploadFromCSVModal from "./upload-from-csv-modal";

export default function DashboardPage() {
  const { hasActiveFilters, resetFilters } = useFilters();
  const { user } = useAuth();

  return (
    <div className="mt-5 w-full px-4 lg:px-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {user && (
        <>
          <p className="text-muted-foreground">Hello {user?.name}</p>
          <UploadFromCSVModal />
          <JobStatus />
        </>
      )}

      <div className="my-4 flex flex-col items-stretch gap-4 lg:flex-row">
        <div className="w-full lg:w-1/4">
          <p className="text-lg font-bold">KPI Cards</p>
          <EarthquakesStats />
        </div>
        <div className="hidden pt-15 pb-10 lg:block">
          <div className="h-full w-px bg-black/40" />
        </div>
        <div className="w-full lg:w-3/4">
          <div className="flex items-center gap-3">
            <p className="text-lg font-bold">Filters</p>
            {hasActiveFilters && (
              <Button variant="destructive" size="sm" onClick={resetFilters}>
                Reset
              </Button>
            )}
          </div>
          <Filters />
        </div>
      </div>
      <EarthquakeTable />
    </div>
  );
}
