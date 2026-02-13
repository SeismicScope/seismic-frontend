"use client";

import { useMapStatsStore } from "../store/use-map-stats";

function MapProcessingBanner() {
  const processing = useMapStatsStore((s) => s.processing);

  if (!processing) return null;

  return (
    <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2">
      <div className="bg-background/90 flex items-center gap-2.5 rounded-lg border px-4 py-2.5 shadow-lg backdrop-blur-sm">
        <div className="border-primary/30 border-t-primary h-4 w-4 animate-spin rounded-full border-2" />
        <p className="text-muted-foreground text-sm font-medium">
          Preparing earthquake points…
        </p>
      </div>
    </div>
  );
}

export default MapProcessingBanner;
