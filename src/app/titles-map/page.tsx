import type { Metadata } from "next";

import LazyTitleMap from "@/features/map/components/lazy-title-map";
import MapStats from "@/features/map/components/map-stats";
import { ErrorBoundary } from "@/shared/boundaries/error-boundary";

import AboutThisMap from "./about-this-map";

export const metadata: Metadata = {
  title: "Titles Map",
  description:
    "Global earthquake map visualizing up to 150,000+ seismic events with zoom-based data rendering and spatial optimization.",
};

function TitlesMapPage() {
  return (
    <div className="relative h-[calc(100vh-8rem)] w-full">
      <div className="mb-4 flex items-center justify-between">
        <MapStats />
        <AboutThisMap />
      </div>
      <ErrorBoundary
        fallback={
          <div className="text-muted-foreground flex h-[300px] items-center justify-center text-sm">
            Failed to render map
          </div>
        }
      >
        <LazyTitleMap />
      </ErrorBoundary>
    </div>
  );
}

export default TitlesMapPage;
