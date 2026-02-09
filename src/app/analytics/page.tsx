"use client";

import EarthquakesStats from "@/features/analytics/components/earthquakes-stats";
import { TimeSeriesChart } from "@/features/analytics/components/time-series-chart";
import { useEarthquakesTimeSeries } from "@/features/analytics/hooks/use-earthquakes-time-series";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

const AnalyticsPage = () => {
  const { data: timeSeries, isLoading } = useEarthquakesTimeSeries("month");

  return (
    <div className="space-y-6 p-6">
      <EarthquakesStats />

      <Card>
        <CardHeader>
          <CardTitle>Seismic Events Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <TimeSeriesChart data={timeSeries ?? []} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
