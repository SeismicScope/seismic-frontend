"use client";
import { useCallback, useMemo } from "react";

import { useFilters } from "@/entities/filter/hooks/use-filters";
import { useEarthquakeHistogram } from "@/features/filters/hooks/use-earthquakes-histogram";
import Histogram from "@/shared/ui/histogram";
import type { Range } from "@/shared/ui/histogram/types";

function MagnitudeRange() {
  const { data: histogram, isLoading } = useEarthquakeHistogram();
  const { filters, setFilters } = useFilters();

  const dataMin = histogram?.[0]?.magnitude ?? 2;
  const dataMax = histogram?.[histogram.length - 1]?.magnitude ?? 9;

  const range = useMemo(
    () => [filters.minMag ?? dataMin, filters.maxMag ?? dataMax] as Range,
    [filters.minMag, filters.maxMag, dataMin, dataMax],
  );

  const handleRangeCommit = useCallback(
    (values: Range) => {
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
