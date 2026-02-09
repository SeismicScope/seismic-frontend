"use client";

import EarthquakesStats from "@/features/analytics/components/earthquakes-stats";
import { TimeSeriesChart } from "@/features/analytics/components/time-series-chart";
import { useEarthquakesTimeSeries } from "@/features/analytics/hooks/use-earthquakes-time-series";
import { TimeInterval } from "@/features/analytics/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { INTERVALS } from "./constants";

const AnalyticsPage = () => {
  const {
    data: timeSeries,
    isLoading,
    interval,
    setInterval,
  } = useEarthquakesTimeSeries();

  return (
    <div className="space-y-6 p-6">
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
              {INTERVALS.map((interval) => (
                <SelectItem key={interval} value={interval}>
                  {interval}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <TimeSeriesChart data={timeSeries ?? []} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
