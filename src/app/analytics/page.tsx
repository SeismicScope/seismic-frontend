"use client";

import EarthquakesStats from "@/features/analytics/components/earthquakes-stats";
import { TimeSeriesChart } from "@/features/analytics/components/time-series-chart";
import { useEarthquakesTimeSeries } from "@/features/analytics/hooks/use-earthquakes-time-series";
import { ErrorBoundary } from "@/shared/boundaries/error-boundary";
import { PERIOD_INTERVALS } from "@/shared/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import type { TimeInterval } from "@/types/main";

function AnalyticsPage() {
  const {
    data: timeSeries,
    isLoading,
    interval,
    setInterval,
  } = useEarthquakesTimeSeries();

  return (
    <div className="mt-5 w-full px-4 lg:px-10">
      <EarthquakesStats />

      <Card>
        <CardHeader>
          <CardTitle>Seismic Events Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={interval}
            onValueChange={(value) => setInterval(value as TimeInterval)}
          >
            <SelectTrigger className="mb-2">
              <SelectValue placeholder="Select interval" />
            </SelectTrigger>
            <SelectContent>
              {PERIOD_INTERVALS.map((interval) => (
                <SelectItem key={interval} value={interval}>
                  {interval}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ErrorBoundary
            fallback={
              <div className="text-muted-foreground flex h-[300px] items-center justify-center text-sm">
                Failed to render chart
              </div>
            }
          >
            <TimeSeriesChart data={timeSeries ?? []} isLoading={isLoading} />
          </ErrorBoundary>
        </CardContent>
      </Card>
    </div>
  );
}

export default AnalyticsPage;
