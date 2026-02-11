import { useParams } from "next/navigation";

import { useEarthquake } from "@/features/earthquakes/hooks/use-earthquake";

import { useStaticMap } from "./use-static-map";

export function useEarthQuakePage() {
  const { id } = useParams();
  const earthquakeId = typeof id === "string" ? id : undefined;
  const { data: earthquake, isLoading } = useEarthquake({ id: earthquakeId });

  const { containerRef: mapRef } = useStaticMap(
    earthquake?.latitude,
    earthquake?.longitude,
  );

  return { earthquake, isLoading, mapRef };
}
