"use client";
import "mapbox-gl/dist/mapbox-gl.css";

import { formatDate } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

import EarthquakeSkeleton from "./earthquake-skeleton";
import { useEarthQuakePage } from "./use-earthquake-page";

function EarthquakePage() {
  const { earthquake, isLoading, mapRef } = useEarthQuakePage();

  if (isLoading) {
    return <EarthquakeSkeleton />;
  }

  if (!earthquake && !isLoading) {
    return <p className="p-10">Earthquake not found</p>;
  }

  return (
    <div className="mt-5 flex w-full flex-col items-start gap-10 px-4 lg:flex-row lg:px-10">
      <div className="flex w-full flex-col gap-3 lg:w-1/2">
        <p className="text-lg font-bold">Earthquake details</p>
        <div className="grid w-full grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Occurred At</CardTitle>
            </CardHeader>
            <CardContent>
              {earthquake?.occuredAt
                ? formatDate(new Date(earthquake.occuredAt))
                : "Unknown"}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Magnitude</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-error-500 text-xl font-bold">
                {earthquake?.magnitude}
              </span>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Depth</CardTitle>
            </CardHeader>
            <CardContent>{earthquake?.depth} km</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Coordinates</CardTitle>
            </CardHeader>
            <CardContent>
              {earthquake?.latitude}, {earthquake?.longitude}
            </CardContent>
          </Card>
          {earthquake?.location && (
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Location</CardTitle>
              </CardHeader>
              <CardContent>{earthquake.location}</CardContent>
            </Card>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 lg:w-1/2">
        <p className="text-lg font-bold">Location on map</p>
        <div
          ref={mapRef}
          className="h-[400px] w-full overflow-hidden rounded-lg"
        />
      </div>
    </div>
  );
}

export default EarthquakePage;
