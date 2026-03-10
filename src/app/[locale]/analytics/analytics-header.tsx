"use client";

import { FADE_IN, MotionDiv, SLIDE_UP } from "@/shared/ui/motion";

export function AnalyticsHeader({ children }: { children: React.ReactNode }) {
  return (
    <MotionDiv {...SLIDE_UP} transition={{ ...SLIDE_UP.transition, delay: 0 }}>
      {children}
    </MotionDiv>
  );
}

export function AnalyticsChartCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionDiv {...FADE_IN} transition={{ ...FADE_IN.transition, delay: 0.2 }}>
      {children}
    </MotionDiv>
  );
}
