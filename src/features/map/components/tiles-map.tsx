"use client";

import { useEarthquakeTilesMap } from "../hooks/use-earthquake-tiles-map";
import MapProcessingBanner from "./map-processing-banner";

export default function EarthquakeTilesMap() {
  const { containerRef, isLoading } = useEarthquakeTilesMap();

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      <MapProcessingBanner visible={isLoading} />
    </div>
  );
}
