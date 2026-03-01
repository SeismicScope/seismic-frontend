import type { Metadata } from "next";

import EarthquakesStats from "@/features/analytics/components/earthquakes-stats";
import { Card, CardHeader, CardTitle } from "@/shared/ui/card";

import TimeSeries from "./time-series";

export const metadata: Metadata = {
  title: "Analytics",
  description:
    "Analytical dashboard displaying average earthquake metrics and time-series trends for large-scale seismic datasets.",
};

function AnalyticsPage() {
  return (
    <div className="mt-5 w-full px-4 lg:px-10">
      <EarthquakesStats />

      <Card>
        <CardHeader>
          <CardTitle>Seismic Events Over Time</CardTitle>
        </CardHeader>
        <TimeSeries />
      </Card>
    </div>
  );
}

export default AnalyticsPage;
