"use client";
import { useTranslations } from "next-intl";

import { usePerformanceMetrics } from "@/features/map/hooks/use-performance-metrics";
import { useMapStatsStore } from "@/features/map/store/use-map-stats";
import { formatNumber } from "@/shared/lib/utils";

function MapStats() {
  const t = useTranslations("map");
  const { pointsCount, buildTime, totalInBounds, limit } = useMapStatsStore();
  const { fps, heap } = usePerformanceMetrics();

  return (
    <div className="flex items-center gap-2 px-3">
      <p className="text-xs lg:text-sm">
        <span className="font-bold">{t("inBounds")}:</span>{" "}
        <span className="text-primary">{formatNumber(totalInBounds)}</span>
        {totalInBounds > limit && (
          <span className="text-muted-foreground">
            {" "}
            (limit: {formatNumber(limit)})
          </span>
        )}
      </p>

      <p className="text-xs lg:text-sm">
        <span className="font-bold">{t("points")}:</span>{" "}
        <span className="text-primary">
          {pointsCount && <span>{formatNumber(pointsCount)}</span>}
        </span>
      </p>

      <p className="text-xs lg:text-sm">
        <span className="font-bold">{t("buildTime")}:</span>{" "}
        <span className="text-primary">
          {buildTime && buildTime.toFixed(2)} ms
        </span>
      </p>

      <p className="text-xs lg:text-sm">
        <span className="font-bold">{t("heap")}:</span>{" "}
        <span className="text-primary">{heap && heap.toFixed(2)} MB</span>
      </p>

      <p className="text-xs lg:text-sm">
        <span className="font-bold">{t("fps")}:</span>{" "}
        <span className="text-primary">{fps && fps}</span>
      </p>
    </div>
  );
}

export default MapStats;
