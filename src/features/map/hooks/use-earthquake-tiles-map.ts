import { useEffect, useRef } from "react";

import { MapAdapter } from "@/shared/adapters/map-adapter";

export function useEarthquakeTilesMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const adapterRef = useRef<MapAdapter | null>(null);

  useEffect(() => {
    if (!containerRef.current || adapterRef.current) return;

    const adapter = new MapAdapter(containerRef.current);
    adapterRef.current = adapter;

    adapter.onLoad(() => {
      adapter.addVectorTileSource(
        "earthquakes-tiles",
        `${process.env.NEXT_PUBLIC_API_URL}/map/tiles/{z}/{x}/{y}`,
      );

      adapter.addVectorTileLayer("earthquakes-layer", "earthquakes");
    });

    return () => adapter.destroy();
  }, []);

  return {
    containerRef,
  };
}
