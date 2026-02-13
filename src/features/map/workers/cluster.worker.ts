import Supercluster from "supercluster";

import type { MapPoint, MapPointProperties } from "../types";

type PointFeature = Supercluster.PointFeature<MapPointProperties>;

let cluster: Supercluster<MapPointProperties>;
let currentDataHash: string | null = null;

/**
 * Converts raw API points to GeoJSON inside the worker,
 * avoiding 100k+ object allocations on the main thread.
 */
function toGeoJSON(points: MapPoint[]): PointFeature[] {
  const features = new Array<PointFeature>(points.length);

  for (let i = 0; i < points.length; i++) {
    const p = points[i];

    features[i] = {
      type: "Feature",
      geometry: { type: "Point", coordinates: [p.longitude, p.latitude] },
      properties: {
        id: p.id,
        magnitude: p.magnitude,
        depth: p.depth,
        location: p.location,
        occurredAt: p.occurredAt,
      },
    };
  }

  return features;
}

/**
 * Simple hash to detect when the dataset has actually changed.
 * Avoids expensive re-indexing when the same data arrives (e.g. same viewport).
 */
function hashPoints(points: MapPoint[]): string {
  if (points.length === 0) return "empty";
  const first = points[0];
  const last = points[points.length - 1];

  return `${points.length}:${first.id}:${last.id}`;
}

self.onmessage = (event) => {
  const { type, rawPoints, bbox, zoom, clusterId } = event.data;

  if (type === "load") {
    const hash = hashPoints(rawPoints);

    if (hash === currentDataHash) return;

    currentDataHash = hash;

    const start = performance.now();

    const features = toGeoJSON(rawPoints);

    cluster = new Supercluster<MapPointProperties>({
      radius: 50,
      maxZoom: 14,
    });

    cluster.load(features);

    const end = performance.now();

    postMessage({
      type: "clusterStats",
      data: {
        pointsCount: rawPoints.length,
        buildTime: end - start,
      },
    });
  }

  if (type === "getClusters") {
    if (!cluster) return;

    const clusters = cluster.getClusters(bbox, zoom);
    postMessage({ type: "clusters", data: clusters });
  }

  if (type === "getExpansionZoom") {
    if (!cluster) return;

    const expansionZoom = cluster.getClusterExpansionZoom(clusterId);
    postMessage({ type: "expansionZoom", data: expansionZoom });
  }
};
