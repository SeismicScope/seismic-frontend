"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

import { useEarthquakesTimeSeries } from "@/features/analytics/hooks/use-earthquakes-time-series";
import { ErrorBoundary } from "@/shared/boundaries/error-boundary";
import { PERIOD_INTERVALS } from "@/shared/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { FADE_IN, MotionDiv } from "@/shared/ui/motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Skeleton } from "@/shared/ui/skeleton";
import type { TimeInterval } from "@/types/main";

const TimeSeriesChart = dynamic(
  () =>
    import("@/features/analytics/components/time-series-chart").then(
      (mod) => mod.TimeSeriesChart,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full" />,
  },
);

export function AnalyticsChart() {
  const t = useTranslations();
  const {
    data: timeSeries,
    isLoading,
    interval,
    setInterval,
  } = useEarthquakesTimeSeries();

  return (
    <MotionDiv {...FADE_IN} transition={{ ...FADE_IN.transition, delay: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle>{t("general.seismicEventsOverTime")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={interval}
            onValueChange={(value) => setInterval(value as TimeInterval)}
          >
            <SelectTrigger className="mb-2">
              <SelectValue placeholder={t("general.selectInterval")} />
            </SelectTrigger>
            <SelectContent>
              {PERIOD_INTERVALS.map((interval) => (
                <SelectItem key={interval.value} value={interval.value}>
                  {t(interval.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ErrorBoundary
            fallback={
              <div className="text-muted-foreground flex h-[300px] items-center justify-center text-sm">
                {t("analytics.failedToRenderChart")}
              </div>
            }
          >
            <TimeSeriesChart data={timeSeries ?? []} isLoading={isLoading} />
          </ErrorBoundary>
        </CardContent>
      </Card>
    </MotionDiv>
  );
}
