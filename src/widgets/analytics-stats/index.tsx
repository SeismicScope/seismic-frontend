"use client";

import EarthquakesStats from "@/features/analytics/components/earthquakes-stats";
import { MotionDiv, SLIDE_UP } from "@/shared/ui/motion";

export function AnalyticsStats() {
  return (
    <MotionDiv {...SLIDE_UP} transition={{ ...SLIDE_UP.transition, delay: 0 }}>
      <EarthquakesStats />
    </MotionDiv>
  );
}
