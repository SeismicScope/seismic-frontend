"use client";

import { useTranslations } from "next-intl";

import LazyTilesMap from "@/features/map/components/lazy-tiles-map";
import MapStats from "@/features/map/components/map-stats";
import { ErrorBoundary } from "@/shared/boundaries/error-boundary";

import { AboutTilesMapDialog } from "./about-tiles-map-dialog";

export function TilesMapViewer() {
  const t = useTranslations();

  return (
    <div className="relative h-[calc(100vh-8rem)] w-full">
      <div className="mb-4 flex items-center justify-between">
        <MapStats />
        <AboutTilesMapDialog />
      </div>
      <ErrorBoundary
        fallback={
          <div className="text-muted-foreground flex h-[300px] items-center justify-center text-sm">
            {t("map.failedToRenderMap")}
          </div>
        }
      >
        <LazyTilesMap />
      </ErrorBoundary>
    </div>
  );
}
