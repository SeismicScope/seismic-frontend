"use client";
import { formatNumber } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import { useEarthquakesStats } from "../../hooks/use-earthquakes-stats";
import EarthquakesStatsSkeleton from "./earthquakes-stats-skeleton";

function EarthquakesStats() {
  const { data: stats, isLoading } = useEarthquakesStats();

  if (isLoading) return <EarthquakesStatsSkeleton />;

  if (!isLoading && !stats) return null;

  return (
    <div className="grid w-full grid-cols-2 gap-4 py-4">
      <Card className="h-24 w-full gap-2 p-3">
        <CardHeader className="px-3">
          <CardTitle className="text-center">Total events</CardTitle>
        </CardHeader>
        <CardContent className="px-3 text-center text-2xl font-bold">
          {formatNumber(stats?.totalEvents)}
        </CardContent>
      </Card>
      <Card className="h-24 w-full gap-2 p-3">
        <CardHeader className="px-3">
          <CardTitle className="text-center">Max magnitude</CardTitle>
        </CardHeader>
        <CardContent className="px-3 text-center text-2xl font-bold">
          {stats?.maxMagnitude}
        </CardContent>
      </Card>
      <Card className="h-24 w-full gap-2 p-3">
        <CardHeader className="px-3">
          <CardTitle className="text-center">Avg magnitude</CardTitle>
        </CardHeader>
        <CardContent className="px-3 text-center text-2xl font-bold">
          {stats?.avgMagnitude}
        </CardContent>
      </Card>
      <Card className="h-24 w-full gap-2 p-3">
        <CardHeader className="px-3">
          <CardTitle className="text-center">Avg depth</CardTitle>
        </CardHeader>
        <CardContent className="px-3 text-center text-2xl font-bold">
          {stats?.avgDepth}
        </CardContent>
      </Card>
    </div>
  );
}

export default EarthquakesStats;
