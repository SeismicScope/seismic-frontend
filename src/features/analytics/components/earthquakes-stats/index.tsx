"use client";
import { useTranslations } from "next-intl";

import { useEarthquakesStats } from "@/features/analytics/hooks/use-earthquakes-stats";
import { formatNumber } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { CARD, MotionDiv, staggerDelay } from "@/shared/ui/motion";

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

  const cards = [
    {
      label: t("analytics.totalEvents"),
      value: formatNumber(stats?.totalEvents || 0),
    },
    { label: t("analytics.maxMagnitude"), value: stats?.maxMagnitude },
    { label: t("analytics.avgMagnitude"), value: stats?.avgMagnitude },
    { label: t("analytics.avgDepth"), value: stats?.avgDepth },
  ];

  return (
    <div className="grid w-full grid-cols-2 gap-4 py-4">
      {cards.map((card, i) => (
        <MotionDiv
          key={card.label}
          {...CARD}
          transition={{ ...CARD.transition, ...staggerDelay(i, 0.07) }}
        >
          <Card className="h-24 w-full gap-2 p-3">
            <CardHeader className="px-3">
              <CardTitle className="text-center">{card.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-primary px-3 text-center text-2xl font-bold">
              {card.value}
            </CardContent>
          </Card>
        </MotionDiv>
      ))}
    </div>
  );
}

export default EarthquakesStats;
