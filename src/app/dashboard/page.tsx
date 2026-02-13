import type { Metadata } from "next";

import EarthquakesStats from "@/features/analytics/components/earthquakes-stats";
import { EarthquakeTable } from "@/features/earthquakes/components/earthquakes-table";
import SortSelect from "@/features/filters/components/sort-select";

import DashbardFilters from "./dashboard-filters";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Earthquake dashboard with aggregated metrics, advanced filtering, and high-performance data table for large-scale seismic records.",
};

export default function DashboardPage() {
  return (
    <div className="mt-5 w-full px-4 lg:px-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="my-4 flex flex-col items-stretch gap-4 lg:flex-row">
        <div className="w-full lg:w-1/4">
          <p className="text-lg font-bold">KPI Cards</p>
          <EarthquakesStats />
        </div>
        <div className="hidden pt-15 pb-10 lg:block">
          <div className="h-full w-px bg-black/40" />
        </div>
        <DashbardFilters />
      </div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-lg font-bold">Earthquakes</p>
        <SortSelect />
      </div>
      <EarthquakeTable />
    </div>
  );
}
