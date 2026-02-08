"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import { useEarthquakesStats } from "../../hooks/use-earthquakes-stats";
import EarthquakesStatsSkeleton from "./earthquakes-stats-skeleton";

export function EarthquakesStats() {
  const { data: stats, isLoading } = useEarthquakesStats();

  if (isLoading) return <EarthquakesStatsSkeleton />;

  if (!isLoading && !stats) return null;

  return (
    <div className="flex w-full items-center gap-4 py-4">
      <Card className="w-full gap-2 py-3">
        <CardHeader>
          <CardTitle className="text-center">Total events</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-2xl font-bold">
          {stats?.totalEvents}
        </CardContent>
      </Card>
      <Card className="w-full gap-2 py-3">
        <CardHeader>
          <CardTitle className="text-center">Max magnitude</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-2xl font-bold">
          {stats?.maxMagnitude}
        </CardContent>
      </Card>
      <Card className="w-full gap-2 py-3">
        <CardHeader>
          <CardTitle className="text-center">Avg magnitude</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-2xl font-bold">
          {stats?.avgMagnitude}
        </CardContent>
      </Card>
      <Card className="w-full gap-2 py-3">
        <CardHeader>
          <CardTitle className="text-center">Avg depth</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-2xl font-bold">
          {stats?.avgDepth}
        </CardContent>
      </Card>
    </div>
  );
}

export default EarthquakesStats;
