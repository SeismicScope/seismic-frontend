import type { Metadata } from "next";

import LazyMap from "@/features/map/components/lazy-map";
import MapStats from "@/features/map/components/map-stats";
import { ErrorBoundary } from "@/shared/boundaries/error-boundary";

export const metadata: Metadata = {
  title: "Map",
  description:
    "Global earthquake map visualizing up to 150,000+ seismic events with zoom-based data rendering and spatial optimization.",
};

function MapPage() {
  return (
    <div className="relative h-[calc(100vh-8rem)] w-full">
      <MapStats />
      <ErrorBoundary
        fallback={
          <div className="text-muted-foreground flex h-[300px] items-center justify-center text-sm">
            Failed to render map
          </div>
        }
      >
        <LazyMap />
      </ErrorBoundary>
    </div>
  );
}

export default MapPage;
