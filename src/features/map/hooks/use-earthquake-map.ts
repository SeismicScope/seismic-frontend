import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";

import { useDebouncedCallback } from "@/shared/hooks/use-debounce";

import { MapAdapter } from "../adapters/map-adapter";
import MapPopup from "../components/map-popup";
import { SOURCE_ID } from "../constants";
import { getBounds, renderMapPopup, toGeoJSON } from "../lib/utils";
import { useMapStatsStore } from "../store/use-map-stats";
import type { MapRequest, WorkerOnMessageEvent } from "../types";
import { useMapData } from "./use-map-data";

export function useEarthquakeMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const adapterRef = useRef<MapAdapter | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const pendingFlyRef = useRef<[number, number] | null>(null);

  const setMapStats = useMapStatsStore.getState().setMapStats;

  const [requestParams, setRequestParams] = useState<
    (MapRequest & { zoom: number }) | null
  >(null);

  const { data: points, isFetching } = useMapData(requestParams);

  const debouncedUpdate = useDebouncedCallback((map: mapboxgl.Map) => {
    setRequestParams({
      ...getBounds(map),
      zoom: Math.floor(map.getZoom()),
    });
  }, 400);

  const geoJsonPoints = useMemo(() => {
    if (!points?.length) return [];

    return toGeoJSON(points);
  }, [points]);

  const requestClusters = useCallback((map: mapboxgl.Map) => {
    if (!workerRef.current) return;

    const { west, south, east, north } = getBounds(map);

    workerRef.current.postMessage({
      type: "getClusters",
      bbox: [west, south, east, north],
      zoom: Math.floor(map.getZoom()),
    });
  }, []);

  useEffect(function initializeWorker() {
    workerRef.current = new Worker(
      new URL("../workers/cluster.worker.ts", import.meta.url),
    );

    workerRef.current.onmessage = (e: WorkerOnMessageEvent) => {
      const adapter = adapterRef.current;
      if (!adapter) return;

      if (e.data.type === "clusters") {
        adapter.updateData(SOURCE_ID, e.data.data);
      }

      if (e.data.type === "expansionZoom" && pendingFlyRef.current) {
        adapter.flyTo(pendingFlyRef.current, e.data.data);
        pendingFlyRef.current = null;
      }

      if (e.data.type === "clusterStats") {
        console.log(e.data.data);
        setMapStats({
          pointsCount: e.data.data.pointsCount,
          buildTime: e.data.data.buildTime,
        });
      }
    };

    return () => workerRef.current?.terminate();
  }, []);

  useEffect(
    function loadClusterData() {
      if (!geoJsonPoints.length || !workerRef.current || !adapterRef.current)
        return;

      const map = adapterRef.current.getMap();

      workerRef.current.postMessage({
        type: "load",
        points: geoJsonPoints,
      });

      requestClusters(map);
    },
    [geoJsonPoints],
  );

  useEffect(function initializeMap() {
    if (!containerRef.current || adapterRef.current) return;

    const adapter = new MapAdapter(containerRef.current);
    adapterRef.current = adapter;

    const map = adapter.getMap();

    adapter.onLoad(() => {
      adapter.addSource(SOURCE_ID);
      adapter.addLayers();

      setRequestParams({
        ...getBounds(map),
        zoom: Math.floor(map.getZoom()),
      });

      requestClusters(map);

      map.on("moveend", () => {
        debouncedUpdate(map);
        requestClusters(map);
      });

      map.on("click", "clusters", (e: mapboxgl.MapMouseEvent) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });

        if (!features.length) return;

        const feature = features[0];

        if (feature.geometry.type !== "Point") return;

        const coords = feature.geometry.coordinates as [number, number];
        const nextZoom = Math.floor(map.getZoom()) + 1;

        adapter.flyTo(coords, nextZoom);
      });

      map.on("click", "unclustered-point", (e: mapboxgl.MapMouseEvent) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["unclustered-point"],
        });

        if (!features.length) return;

        const feature = features[0];

        const popupNode = renderMapPopup(
          React.createElement(MapPopup, {
            magnitude: feature.properties?.magnitude,
            depth: feature.properties?.depth,
            location: feature.properties?.location,
            occuredAt: feature.properties?.occuredAt,
            id: feature.properties?.id,
          }),
        );

        if (feature.geometry.type !== "Point") return;

        new mapboxgl.Popup({ offset: 12 })
          .setLngLat(feature.geometry.coordinates as [number, number])
          .setDOMContent(popupNode)
          .addTo(map);
      });
    });

    return () => {
      adapter.destroy();
      adapterRef.current = null;
    };
  }, []);

  return {
    isFetching,
    containerRef,
  };
}
