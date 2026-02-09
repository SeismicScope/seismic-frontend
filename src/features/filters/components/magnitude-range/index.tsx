"use client";
import { useCallback, useMemo } from "react";

import { useEarthquakeHistogram } from "@/features/earthquakes/hooks/use-earthquakes-histogram";
import Histogram from "@/shared/ui/histogram";

import { useFilters } from "../../hooks/use-filters";

function MagnitudeRange() {
  const { data: histogram, isLoading } = useEarthquakeHistogram();
  const { filters, setFilters } = useFilters();

  const range = useMemo(
    () => [filters.minMagnitude ?? 2, filters.maxMagnitude ?? 9],
    [filters.minMagnitude, filters.maxMagnitude],
  );

  const handleRangeCommit = useCallback(
    (values: number[]) => {
      setFilters({ minMagnitude: values[0], maxMagnitude: values[1] });
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
