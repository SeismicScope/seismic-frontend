import mapboxgl from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";

import { MapAdapter } from "@/shared/adapters/map-adapter";

import MapPopup from "../components/map-popup";
import { renderMapPopup } from "../lib/utils";
import { useMapStatsStore } from "../store/use-map-stats";

export function useEarthquakeTilesMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const adapterRef = useRef<MapAdapter | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const setMapStats = useMapStatsStore.getState().setMapStats;

  useEffect(() => {
    if (!containerRef.current || adapterRef.current) return;

    const adapter = new MapAdapter(containerRef.current);
    adapterRef.current = adapter;

    adapter.onLoadMapTiles(() => {
      const map = adapter.getMap();

      const url = `${process.env.NEXT_PUBLIC_API_URL}/map/tiles/{z}/{x}/{y}`;
      if (!process.env.NEXT_PUBLIC_API_URL) return;

      adapter.addVectorTileSource("earthquakes-tiles", url);

      adapter.addVectorTileLayer({
        layerId: "earthquakes-layer",
        sourceId: "earthquakes-tiles",
        sourceLayer: "earthquakes",
      });

      let buildStart = 0;

      function handleDataLoading(
        e: mapboxgl.MapDataEvent | mapboxgl.MapStyleDataEvent,
      ) {
        if ("sourceId" in e && e.sourceId === "earthquakes-tiles") {
          buildStart = performance.now();
          setIsLoading(true);
        }
      }

      function handleIdle() {
        const renderedPoints = map.queryRenderedFeatures({
          layers: ["earthquakes-layer"],
        }).length;

        const buildTime = performance.now() - buildStart;

        setMapStats({
          pointsCount: renderedPoints,
          buildTime: Math.round(buildTime),
        });

        setIsLoading(false);
      }

      map.on("dataloading", handleDataLoading);
      map.on("idle", handleIdle);

      adapter.addLayerClickHandler("earthquakes-layer", (feature, lngLat) => {
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
          .setLngLat(lngLat)
          .setDOMContent(element)
          .addTo(map);

        popup.on("remove", unmount);
      });

      return () => {
        map.off("dataloading", handleDataLoading);
        map.off("idle", handleIdle);
      };
    });

    return () => {
      adapter.destroy();
      adapterRef.current = null;
    };
  }, []);

  return {
    containerRef,
    isLoading,
  };
}
