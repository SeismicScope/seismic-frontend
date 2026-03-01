import type { Feature, Point } from "geojson";
import { createRoot, Root } from "react-dom/client";

import type { MapBounds, MapPoint, MapPointProperties } from "../types";

export function toGeoJSON(
  points: MapPoint[],
): Feature<Point, MapPointProperties>[] {
  return points.map((p) => ({
    type: "Feature",
    geometry: { type: "Point", coordinates: [p.longitude, p.latitude] },
    properties: {
      id: p.id,
      magnitude: p.magnitude,
      depth: p.depth,
      location: p.location,
      occurredAt: p.occurredAt,
    },
  }));
}

export function getBounds(map: mapboxgl.Map): MapBounds {
  const b = map.getBounds();

  return {
    west: Number(b?.getWest().toFixed(5)) || 0,
    south: Number(b?.getSouth().toFixed(5)) || 0,
    east: Number(b?.getEast().toFixed(5)) || 0,
    north: Number(b?.getNorth().toFixed(5)) || 0,
  };
}

export function renderMapPopup(content: React.ReactNode) {
  const container = document.createElement("div");
  const root: Root = createRoot(container);

  root.render(content);

  return {
    element: container,
    unmount: () => {
      root.unmount();
    },
  };
}
