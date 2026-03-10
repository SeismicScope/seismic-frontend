"use client";
import { useTranslations } from "next-intl";

import EarthquakesStats from "@/features/analytics/components/earthquakes-stats";
import { MotionDiv, SLIDE_UP } from "@/shared/ui/motion";

export function DashboardKPI() {
  const t = useTranslations();

  return (
    <MotionDiv
      className="w-full lg:w-1/4"
      {...SLIDE_UP}
      transition={{ ...SLIDE_UP.transition, delay: 0 }}
    >
      <p className="text-lg font-bold">{t("analytics.kpiCards")}</p>
      <EarthquakesStats />
    </MotionDiv>
  );
}
