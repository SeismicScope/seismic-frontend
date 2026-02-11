import { memo } from "react";

import { Slider } from "@/shared/ui/slider";

import { Input } from "../input";
import HistogramBar from "./histogram-bar";
import HistogramSkeleton from "./histogram-skeleton";
import type { HistogramProps } from "./types";
import { useHistogram } from "./use-histogram";

function Histogram({
  histogram,
  range,
  onRangeCommit,
  isLoading = false,
}: HistogramProps) {
  const {
    bars,
    displayRange,
    dataMax,
    dataMin,
    handleValueChange,
    handleValueCommit,
  } = useHistogram({ histogram, range, onRangeCommit });

  if (isLoading) {
    return <HistogramSkeleton />;
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
        min={dataMin}
        max={dataMax}
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
