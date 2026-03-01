import { useEffect, useRef, useState } from "react";

import { MapAdapter } from "@/shared/adapters/map-adapter";

import { SOURCE_ID } from "../constants";
import { getBounds } from "../lib/utils";
import { useMapRequestParams } from "../store/use-map-request-params";
import { useMapStatsStore } from "../store/use-map-stats";
import { useMapData } from "./use-map-data";
import { useMapEvents } from "./use-map-events";
import { useMapWorker } from "./use-map-worker";

export function useEarthquakeMap(isDashboard: boolean = false) {
  const containerRef = useRef<HTMLDivElement>(null);
  const adapterRef = useRef<MapAdapter | null>(null);

  const setMapStats = useMapStatsStore.getState().setMapStats;
  const { requestParams, setMapRequestParams } = useMapRequestParams();

  const [ready, setReady] = useState(false);

  const { data: mapResponse, isFetching } = useMapData({
    requestParams,
    isDashboard,
  });

  const { loadPoints, requestClusters } = useMapWorker({ adapterRef });

  useMapEvents({
    adapterRef,
    ready,
    onBoundsChange: setMapRequestParams,
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

        setMapRequestParams({
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

  return { containerRef, isFetching, ready };
}
