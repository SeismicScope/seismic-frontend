import { useEffect, useRef } from "react";

import { MapAdapter } from "@/shared/adapters/map-adapter";

const SOURCE_ID = "earthquake-point";
const DOT_LAYER_ID = "earthquake-dot";
const PULSE_LAYER_ID = "earthquake-pulse";

const MIN_RADIUS = 12;
const MAX_RADIUS = 40;
const DURATION = 2000;

export function useStaticMap(lat?: number, lng?: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const adapterRef = useRef<MapAdapter | null>(null);

  useEffect(() => {
    if (!containerRef.current || lat === undefined || lng === undefined) return;

    const adapter = new MapAdapter(containerRef.current, {
      center: [lng, lat],
      zoom: 6,
      interactive: false,
      navigationControl: false,
      attributionControl: false,
      maxBounds: undefined,
      minZoom: undefined,
      maxZoom: undefined,
    });

    adapterRef.current = adapter;
    const map = adapter.getMap();

    adapter.onLoad(() => {
      adapter.addSource(SOURCE_ID);
      adapter.updateData(SOURCE_ID, [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [lng, lat],
          },
          properties: {},
        },
      ]);

      map.addLayer({
        id: PULSE_LAYER_ID,
        type: "circle",
        source: SOURCE_ID,
        paint: {
          "circle-radius": 20,
          "circle-color": "transparent",
          "circle-stroke-width": 3,
          "circle-stroke-color": "#cc3232",
          "circle-opacity": 0,
          "circle-stroke-opacity": 0.8,
        },
      });

      map.addLayer({
        id: DOT_LAYER_ID,
        type: "circle",
        source: SOURCE_ID,
        paint: {
          "circle-radius": 8,
          "circle-color": "#cc3232",
        },
      });

      const startTime = performance.now();

      function animatePulse(now: number): void {
        if (!map.getLayer(PULSE_LAYER_ID)) return;

        const elapsed = (now - startTime) % DURATION;
        const progress = elapsed / DURATION;

        const radius = MIN_RADIUS + (MAX_RADIUS - MIN_RADIUS) * progress;
        const opacity = 0.8 * (1 - progress);

        map.setPaintProperty(PULSE_LAYER_ID, "circle-radius", radius);
        map.setPaintProperty(PULSE_LAYER_ID, "circle-stroke-opacity", opacity);

        requestAnimationFrame(animatePulse);
      }

      requestAnimationFrame(animatePulse);
    });

    return () => {
      adapter.destroy();
      adapterRef.current = null;
    };
  }, [lat, lng]);

  return { containerRef };
}
