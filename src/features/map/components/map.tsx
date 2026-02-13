"use client";
import "mapbox-gl/dist/mapbox-gl.css";

import { useEarthquakeMap } from "../hooks/use-earthquake-map";
import MapLoader from "./map-loader";
import MapProcessingBanner from "./map-processing-banner";

export default function EarthquakeMap() {
  const { containerRef, ready } = useEarthquakeMap();

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      {!ready && <MapLoader />}
      <MapProcessingBanner />
    </div>
  );
}
