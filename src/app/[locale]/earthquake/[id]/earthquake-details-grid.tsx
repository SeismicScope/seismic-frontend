"use client";

import { CARD, MotionDiv, SLIDE_UP, staggerDelay } from "@/shared/ui/motion";

export function EarthquakeDetailsGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionDiv
      className="flex w-full flex-col gap-3 lg:w-1/2"
      {...SLIDE_UP}
      transition={{ ...SLIDE_UP.transition, delay: 0 }}
    >
      {children}
    </MotionDiv>
  );
}

export function EarthquakeCardAnimated({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <MotionDiv
      {...CARD}
      transition={{ ...CARD.transition, ...staggerDelay(index, 0.07) }}
    >
      {children}
    </MotionDiv>
  );
}
