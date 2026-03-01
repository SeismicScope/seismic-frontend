"use client";
import "mapbox-gl/dist/mapbox-gl.css";

import { cn } from "@/shared/lib/utils";

import { useEarthquakeMap } from "../hooks/use-earthquake-map";
import MapLoader from "./map-loader";
import MapProcessingBanner from "./map-processing-banner";

export default function EarthquakeMap({
  isDashboard = false,
}: {
  isDashboard?: boolean;
}) {
  const { containerRef, ready, isFetching } = useEarthquakeMap(isDashboard);

  return (
    <div
      className={cn("relative h-full w-full", isDashboard && "h-[350px] w-1/2")}
    >
      <div ref={containerRef} className="h-full w-full" />
      {!ready && <MapLoader />}
      <MapProcessingBanner visible={isFetching} />
    </div>
  );
}
