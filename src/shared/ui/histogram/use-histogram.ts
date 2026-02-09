import { useCallback, useMemo, useState } from "react";

import type { HistogramProps } from "./types";

export function useHstogram({
  histogram,
  range,
  onRangeCommit,
}: Omit<HistogramProps, "isLoading">) {
  const [localRange, setLocalRange] = useState(range);

  const isDragging =
    localRange !== range &&
    (localRange[0] !== range[0] || localRange[1] !== range[1]);
  const displayRange = isDragging ? localRange : range;

  const { maxCount, dataMin, dataMax } = useMemo(() => {
    if (!histogram?.length) return { maxCount: 0, dataMin: 0, dataMax: 0 };

    let min = Infinity;
    let max = -Infinity;
    let mc = 0;

    for (const e of histogram) {
      const mag = Number(e.magnitude);
      if (mag < min) min = mag;
      if (mag > max) max = mag;
      if (e.count > mc) mc = e.count;
    }

    return { maxCount: mc, dataMin: min, dataMax: max };
  }, [histogram]);

  const bars = useMemo(() => {
    if (!histogram?.length || maxCount === 0) return [];

    return histogram.map((entry) => ({
      magnitude: Number(entry.magnitude),
      heightPercent: (entry.count / maxCount) * 100,
    }));
  }, [histogram, maxCount]);

  const handleValueChange = useCallback((values: number[]) => {
    setLocalRange(values);
  }, []);

  const handleValueCommit = useCallback(
    (values: number[]) => {
      setLocalRange(values);
      onRangeCommit(values);
    },
    [onRangeCommit],
  );

  return {
    bars,
    displayRange,
    dataMax,
    dataMin,
    handleValueChange,
    handleValueCommit,
  };
}
