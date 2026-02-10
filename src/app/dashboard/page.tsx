"use client";
import EarthquakesStats from "@/features/analytics/components/earthquakes-stats";
import { EarthquakeTable } from "@/features/earthquakes/components/earthquakes-table";
import Filters from "@/features/filters/components/filters";
import { useFilters } from "@/features/filters/hooks/use-filters";
import { Button } from "@/shared/ui/button";

export default function DashboardPage() {
  const { hasActiveFilters, resetFilters } = useFilters();

  return (
    <div className="mt-5 w-full px-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="my-4 flex items-stretch gap-4">
        <div className="w-1/4">
          <p className="text-lg font-bold">KPI Cards</p>
          <EarthquakesStats />
        </div>
        <div className="pt-15 pb-10">
          <div className="h-full w-px bg-black/40" />
        </div>
        <div className="w-3/4">
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
