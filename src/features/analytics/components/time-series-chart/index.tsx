"use client";

import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import type { EarthquakeTimeSeries } from "@/features/analytics/types";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";

import { chartConfig } from "./constants";
import { formatDate } from "./helpers";
import TimeSeriesLoader from "./time-series-loader";
import TimeSeriesNoData from "./time-series-no-data";

type TimeSeriesChartProps = {
  data: EarthquakeTimeSeries[];
  isLoading?: boolean;
};

export function TimeSeriesChart({ data, isLoading }: TimeSeriesChartProps) {
  const chartData = useMemo(
    () =>
      data.map((item) => ({
        date: item.date,
        label: formatDate({ dateStr: item.date }),
        count: item.count,
      })),
    [data],
  );

  const summary = useMemo(() => {
    if (!data.length) return "No earthquake data available.";

    const total = data.reduce((acc, d) => acc + d.count, 0);
    const max = Math.max(...data.map((d) => d.count));
    const min = Math.min(...data.map((d) => d.count));

    return `Time series chart showing earthquake frequency over time. 
    Total events: ${total}. 
    Minimum: ${min} events. 
    Maximum: ${max} events.`;
  }, [data]);

  if (isLoading) return <TimeSeriesLoader />;
  if (!data.length) return <TimeSeriesNoData />;

  return (
    <div className="w-full">
      <p id="chart-summary" className="sr-only">
        {summary}
      </p>

      <ChartContainer
        config={chartConfig}
        className="h-[300px] w-full"
        role="img"
        aria-label="Earthquake frequency time series chart"
        aria-describedby="chart-summary"
      >
        <AreaChart data={chartData} margin={{ left: 0, right: 12, top: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            interval="preserveStartEnd"
            minTickGap={40}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} width={50} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(_, payload) => {
                  if (!payload?.[0]?.payload?.date) return "";

                  return formatDate({
                    dateStr: payload[0].payload.date,
                    month: "long",
                  });
                }}
              />
            }
          />
          <Area
            dataKey="count"
            type="monotone"
            fill="var(--color-count)"
            fillOpacity={0.2}
            stroke="var(--color-count)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
