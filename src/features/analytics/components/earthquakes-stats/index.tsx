"use client";
import { useTranslations } from "next-intl";

import { useEarthquakesStats } from "@/features/analytics/hooks/use-earthquakes-stats";
import { formatNumber } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import EarthquakesStatsSkeleton from "./earthquakes-stats-skeleton";

function EarthquakesStats() {
  const t = useTranslations();
  const { data: stats, isLoading } = useEarthquakesStats();

  if (isLoading) return <EarthquakesStatsSkeleton />;

  if (!isLoading && !stats)
    return (
      <div className="flex h-[200px] items-center justify-center">
        <p className="text-muted-foreground text-sm">
          {t("general.noDataAvailable")}
        </p>
      </div>
    );

  return (
    <div className="grid w-full grid-cols-2 gap-4 py-4">
      <Card className="h-24 w-full gap-2 p-3">
        <CardHeader className="px-3">
          <CardTitle className="text-center">
            {t("analytics.totalEvents")}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-primary px-3 text-center text-2xl font-bold">
          {formatNumber(stats?.totalEvents || 0)}
        </CardContent>
      </Card>
      <Card className="h-24 w-full gap-2 p-3">
        <CardHeader className="px-3">
          <CardTitle className="text-center">
            {t("analytics.maxMagnitude")}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-primary px-3 text-center text-2xl font-bold">
          {stats?.maxMagnitude}
        </CardContent>
      </Card>
      <Card className="h-24 w-full gap-2 p-3">
        <CardHeader className="px-3">
          <CardTitle className="text-center">
            {t("analytics.avgMagnitude")}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-primary px-3 text-center text-2xl font-bold">
          {stats?.avgMagnitude}
        </CardContent>
      </Card>
      <Card className="h-24 w-full gap-2 p-3">
        <CardHeader className="px-3">
          <CardTitle className="text-center">
            {t("analytics.avgDepth")}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-primary px-3 text-center text-2xl font-bold">
          {stats?.avgDepth}
        </CardContent>
      </Card>
    </div>
  );
}

export default EarthquakesStats;
