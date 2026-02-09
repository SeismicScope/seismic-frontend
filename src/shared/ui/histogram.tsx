import { memo, useCallback, useMemo, useState } from "react";

import { Slider } from "@/shared/ui/slider";

import { Input } from "./input";

type HistogramEntry = {
  magnitude: number;
  count: number;
};

type HistogramProps = {
  histogram: HistogramEntry[];
  range: number[];
  onRangeCommit: (values: number[]) => void;
  isLoading: boolean;
};

const HistogramBar = memo(function HistogramBar({
  heightPercent,
  isActive,
}: {
  heightPercent: number;
  isActive: boolean;
}) {
  return (
    <div
      className={`flex-1 self-end rounded-t-sm transition-colors duration-150 ${
        isActive ? "bg-primary" : "bg-border"
      }`}
      style={{
        height: `${heightPercent}%`,
        minHeight: heightPercent > 0 ? 2 : 0,
      }}
    />
  );
});

function Histogram({
  histogram,
  range,
  onRangeCommit,
  isLoading = false,
}: HistogramProps) {
  const [localRange, setLocalRange] = useState(range);

  const isDragging =
    localRange !== range &&
    (localRange[0] !== range[0] || localRange[1] !== range[1]);
  const displayRange = isDragging ? localRange : range;

  const maxCount = useMemo(() => {
    if (!histogram?.length) return 0;

    return Math.max(...histogram.map((e) => e.count));
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!histogram?.length) {
    return <div>No data</div>;
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex h-24 w-full items-stretch gap-0.5">
        {bars.map((bar, index) => (
          <HistogramBar
            key={index}
            heightPercent={bar.heightPercent}
            isActive={
              bar.magnitude >= displayRange[0] &&
              bar.magnitude <= displayRange[1]
            }
          />
        ))}
      </div>

      <Slider
        min={2}
        max={9}
        step={0.1}
        value={displayRange}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        className="mt-[-12px]"
      />

      <div className="flex justify-between">
        <Input
          readOnly
          value={displayRange[0]}
          className="max-w-20 text-center"
        />
        <Input
          readOnly
          value={displayRange[1]}
          className="max-w-20 text-center"
        />
      </div>
    </div>
  );
}

export default memo(Histogram);
