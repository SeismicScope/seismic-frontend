import Supercluster from "supercluster";

let cluster: Supercluster;
let currentPointsCount: number | null = null;

self.onmessage = (event) => {
  const { type, points, bbox, zoom, clusterId } = event.data;

  if (type === "load") {
    if (points?.length === currentPointsCount) return;

    currentPointsCount = points.length;

    const start = performance.now();

    cluster = new Supercluster({
      radius: 50,
      maxZoom: 14,
    });

    cluster.load(points);

    const end = performance.now();

    postMessage({
      type: "clusterStats",
      data: {
        pointsCount: points.length,
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
