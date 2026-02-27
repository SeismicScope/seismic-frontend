"use client";
import "mapbox-gl/dist/mapbox-gl.css";

import { useEarthquakeTilesMap } from "../hooks/use-earthquake-tiles-map";

export default function EarthquakeTitleMap() {
  const { containerRef } = useEarthquakeTilesMap();

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
