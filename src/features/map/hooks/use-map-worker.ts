import type { RefObject } from "react";
import { useCallback, useEffect, useRef } from "react";

import type { MapAdapter } from "@/shared/adapters/map-adapter";

import { SOURCE_ID } from "../constants";
import { getBounds } from "../lib/utils";
import { useMapStatsStore } from "../store/use-map-stats";
import type { MapPoint, WorkerOnMessageEvent } from "../types";

type UseMapWorkerParams = {
  adapterRef: RefObject<MapAdapter | null>;
};

export function useMapWorker({ adapterRef }: UseMapWorkerParams) {
  const workerRef = useRef<Worker | null>(null);
  const pendingFlyRef = useRef<[number, number] | null>(null);

  const setMapStats = useMapStatsStore.getState().setMapStats;

  useEffect(
    function initializeWorker() {
      const worker = new Worker(
        new URL("../workers/cluster.worker.ts", import.meta.url),
      );

      workerRef.current = worker;

      worker.onmessage = (e: WorkerOnMessageEvent) => {
        const adapter = adapterRef.current;
        if (!adapter) return;

        switch (e.data.type) {
          case "clusters":
            adapter.updateData(SOURCE_ID, e.data.data);
            break;

          case "expansionZoom":
            if (pendingFlyRef.current) {
              adapter.flyTo(pendingFlyRef.current, e.data.data);
              pendingFlyRef.current = null;
            }
            break;

          case "clusterStats":
            setMapStats({
              pointsCount: e.data.data.pointsCount,
              buildTime: e.data.data.buildTime,
            });
            break;
        }
      };

      return () => {
        worker.terminate();
        workerRef.current = null;
      };
    },
    [adapterRef, setMapStats],
  );

  const loadPoints = useCallback((points: MapPoint[]) => {
    workerRef.current?.postMessage({ type: "load", rawPoints: points });
  }, []);

  const requestClusters = useCallback((map: mapboxgl.Map) => {
    if (!workerRef.current) return;

    const { west, south, east, north } = getBounds(map);

    workerRef.current.postMessage({
      type: "getClusters",
      bbox: [west, south, east, north],
      zoom: Math.floor(map.getZoom()),
    });
  }, []);

  return { loadPoints, requestClusters } as const;
}
