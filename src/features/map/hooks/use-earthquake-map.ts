import { useEffect, useRef, useState } from "react";

import { MapAdapter } from "@/shared/adapters/map-adapter";

import { SOURCE_ID } from "../constants";
import { getBounds } from "../lib/utils";
import { useMapStatsStore } from "../store/use-map-stats";
import type { MapRequest } from "../types";
import { useMapData } from "./use-map-data";
import { useMapEvents } from "./use-map-events";
import { useMapWorker } from "./use-map-worker";

export function useEarthquakeMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const adapterRef = useRef<MapAdapter | null>(null);

  const setMapStats = useMapStatsStore.getState().setMapStats;

  const [ready, setReady] = useState(false);
  const [requestParams, setRequestParams] = useState<MapRequest | null>(null);
  const { data: mapResponse, isFetching } = useMapData(requestParams);

  const { loadPoints, requestClusters } = useMapWorker({ adapterRef });

  useMapEvents({
    adapterRef,
    ready,
    onBoundsChange: setRequestParams,
    requestClusters,
  });

  useEffect(
    function syncMapData() {
      if (!mapResponse) return;

      setMapStats({
        totalInBounds: mapResponse.total,
        limit: mapResponse.limit,
      });

      if (!mapResponse.data?.length || !adapterRef.current) return;

      loadPoints(mapResponse.data);
      requestClusters(adapterRef.current.getMap());
    },
    [mapResponse, loadPoints, requestClusters, setMapStats],
  );

  useEffect(
    function initializeMap() {
      if (!containerRef.current || adapterRef.current) return;

      const adapter = new MapAdapter(containerRef.current);
      adapterRef.current = adapter;

      adapter.onLoad(() => {
        adapter.addSource(SOURCE_ID);
        adapter.addLayers();
        setReady(true);

        const map = adapter.getMap();

        setRequestParams({
          ...getBounds(map),
          zoom: Math.floor(map.getZoom()),
        });

        requestClusters(map);
      });

      return () => {
        adapter.destroy();
        adapterRef.current = null;
      };
    },
    [requestClusters],
  );

  return { containerRef, isFetching } as const;
}
