"use client";

import dynamic from "next/dynamic";

import { Skeleton } from "@/shared/ui/skeleton";

import type EarthquakeMapClient from "./earthquake-map-client";

const LazyEarthquakeMap = dynamic(() => import("./earthquake-map-client"), {
  ssr: false,
  loading: () => (
    <div className="flex w-full flex-col gap-3 lg:w-1/2">
      <p className="text-lg font-bold">Location on map</p>
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </div>
  ),
});

export default LazyEarthquakeMap as typeof EarthquakeMapClient;
