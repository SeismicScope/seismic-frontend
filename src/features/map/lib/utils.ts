import type { Feature, Point } from "geojson";
import { createRoot } from "react-dom/client";

import type { MapPoint, MapPointProperties, MapRequest } from "../types";

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
      occuredAt: p.occuredAt,
    },
  }));
}

export function getBounds(map: mapboxgl.Map): MapRequest {
  const b = map.getBounds();

  return {
    west: b?.getWest() || 0,
    south: b?.getSouth() || 0,
    east: b?.getEast() || 0,
    north: b?.getNorth() || 0,
  };
}

export function renderMapPopup(content: React.ReactNode): HTMLElement {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(content);

  return div;
}
