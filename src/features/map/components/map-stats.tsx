"use client";
import { usePerformanceMetrics } from "@/features/map/hooks/use-performance-metrics";
import { useMapStatsStore } from "@/features/map/store/use-map-stats";
import { formatNumber } from "@/shared/lib/utils";

function MapStats() {
  const { pointsCount, buildTime, totalInBounds, limit } = useMapStatsStore();
  const { fps, heap } = usePerformanceMetrics();

  return (
    <div className="mb-4 flex items-center gap-2">
      <p className="text-sm">
        <span className="font-bold">In bounds:</span>{" "}
        {formatNumber(totalInBounds)}
        {totalInBounds > limit && (
          <span className="text-muted-foreground">
            {" "}
            (limit: {formatNumber(limit)})
          </span>
        )}
      </p>

      <p className="text-sm">
        <span className="font-bold">Points:</span>{" "}
        {pointsCount && formatNumber(pointsCount)}
      </p>

      <p className="text-sm">
        <span className="font-bold">Build time:</span>{" "}
        {buildTime && buildTime.toFixed(2)} ms
      </p>

      <p className="text-sm">
        <span className="font-bold">Heap:</span> {heap && heap.toFixed(2)} MB
      </p>

      <p className="text-sm">
        <span className="font-bold">FPS:</span> {fps && fps}
      </p>
    </div>
  );
}

export default MapStats;
