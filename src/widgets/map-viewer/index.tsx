"use client";

import { useTranslations } from "next-intl";

import LazyMap from "@/features/map/components/lazy-map";
import MapStats from "@/features/map/components/map-stats";
import { ErrorBoundary } from "@/shared/boundaries/error-boundary";

import { AboutMapDialog } from "./about-map-dialog";

export function MapViewer() {
  const t = useTranslations();

  return (
    <div className="relative h-[calc(100vh-8rem)] w-full">
      <div className="mb-4 flex items-center justify-between">
        <MapStats />
        <AboutMapDialog />
      </div>
      <ErrorBoundary
        fallback={
          <div className="text-muted-foreground flex h-[300px] items-center justify-center text-sm">
            {t("map.failedToRenderMap")}
          </div>
        }
      >
        <LazyMap />
      </ErrorBoundary>
    </div>
  );
}
