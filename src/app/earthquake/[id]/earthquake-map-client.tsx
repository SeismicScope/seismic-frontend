"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import { useStaticMap } from "./use-static-map";

type Props = {
  lat: number;
  lng: number;
};

export default function EarthquakeMapClient({ lat, lng }: Props) {
  const { containerRef } = useStaticMap(lat, lng);

  return (
    <div className="flex w-full flex-col gap-3 lg:w-1/2">
      <p className="text-lg font-bold">Location on map</p>
      <div
        ref={containerRef}
        className="h-[400px] w-full overflow-hidden rounded-lg"
      />
    </div>
  );
}
