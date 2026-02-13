import mapboxgl from "mapbox-gl";
import type { RefObject } from "react";
import { useCallback, useEffect, useRef } from "react";
import React from "react";

import type { MapAdapter } from "@/shared/adapters/map-adapter";
import { useDebouncedCallback } from "@/shared/hooks/use-debounce";

import MapPopup from "../components/map-popup";
import { LAYER_CLUSTERS, LAYER_POINTS } from "../constants";
import { getBounds, renderMapPopup } from "../lib/utils";
import type { MapRequest } from "../types";

type UseMapEventsParams = {
  adapterRef: RefObject<MapAdapter | null>;
  ready: boolean;
  onBoundsChange: (params: MapRequest) => void;
  requestClusters: (map: mapboxgl.Map) => void;
};

export function useMapEvents({
  adapterRef,
  ready,
  onBoundsChange,
  requestClusters,
}: UseMapEventsParams) {
  const onBoundsChangeRef = useRef(onBoundsChange);
  const requestClustersRef = useRef(requestClusters);

  useEffect(
    function syncOnBoundsChangeRef() {
      onBoundsChangeRef.current = onBoundsChange;
    },
    [onBoundsChange],
  );

  useEffect(
    function syncRequestClustersRef() {
      requestClustersRef.current = requestClusters;
    },
    [requestClusters],
  );

  const stableBoundsChange = useCallback((map: mapboxgl.Map) => {
    onBoundsChangeRef.current({
      ...getBounds(map),
      zoom: Math.floor(map.getZoom()),
    });
  }, []);

  const debouncedFetch = useDebouncedCallback(stableBoundsChange, 400);

  useEffect(
    function bindMapEvents() {
      const adapter = adapterRef.current;
      if (!adapter) return;

      const map = adapter.getMap();

      const handleMoveEnd = () => {
        debouncedFetch(map);
        requestClustersRef.current(map);
      };

      const handleClusterClick = (e: mapboxgl.MapMouseEvent) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: [LAYER_CLUSTERS],
        });

        if (!features.length) return;

        const feature = features[0];
        if (feature.geometry.type !== "Point") return;

        const coords = feature.geometry.coordinates as [number, number];
        const nextZoom = Math.floor(map.getZoom()) + 1;

        adapter.flyTo(coords, nextZoom);
      };

      const handlePointClick = (e: mapboxgl.MapMouseEvent) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: [LAYER_POINTS],
        });

        if (!features.length) return;

        const feature = features[0];
        if (feature.geometry.type !== "Point") return;

        const { element, unmount } = renderMapPopup(
          React.createElement(MapPopup, {
            magnitude: feature.properties?.magnitude,
            depth: feature.properties?.depth,
            location: feature.properties?.location,
            occurredAt: feature.properties?.occurredAt,
            id: feature.properties?.id,
          }),
        );

        const popup = new mapboxgl.Popup({ offset: 12 })
          .setLngLat(feature.geometry.coordinates as [number, number])
          .setDOMContent(element)
          .addTo(map);

        popup.on("remove", unmount);
      };

      map.on("moveend", handleMoveEnd);
      map.on("click", LAYER_CLUSTERS, handleClusterClick);
      map.on("click", LAYER_POINTS, handlePointClick);

      return () => {
        map.off("moveend", handleMoveEnd);
        map.off("click", LAYER_CLUSTERS, handleClusterClick);
        map.off("click", LAYER_POINTS, handlePointClick);
      };
    },
    [adapterRef, ready, debouncedFetch],
  );
}
