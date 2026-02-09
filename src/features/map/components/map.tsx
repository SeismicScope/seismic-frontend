"use client";
import "mapbox-gl/dist/mapbox-gl.css";

import { useEarthquakeMap } from "../hooks/use-earthquake-map";

export default function EarthquakeMap() {
  const { containerRef } = useEarthquakeMap();

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
}
