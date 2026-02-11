"use client";
import { useCallback, useMemo } from "react";

import { useEarthquakeHistogram } from "@/features/earthquakes/hooks/use-earthquakes-histogram";
import { useFilters } from "@/features/filters/hooks/use-filters";
import Histogram from "@/shared/ui/histogram";

function MagnitudeRange() {
  const { data: histogram, isLoading } = useEarthquakeHistogram();
  const { filters, setFilters } = useFilters();

  const dataMin = histogram?.[0]?.magnitude ?? 2;
  const dataMax = histogram?.[histogram.length - 1]?.magnitude ?? 9;

  const range = useMemo(
    () => [filters.minMag ?? dataMin, filters.maxMag ?? dataMax],
    [filters.minMag, filters.maxMag, dataMin, dataMax],
  );

  const handleRangeCommit = useCallback(
    (values: number[]) => {
      setFilters({ minMag: values[0], maxMag: values[1] });
    },
    [setFilters],
  );

  return (
    <Histogram
      histogram={histogram}
      range={range}
      onRangeCommit={handleRangeCommit}
      isLoading={isLoading}
    />
  );
}

export default MagnitudeRange;
