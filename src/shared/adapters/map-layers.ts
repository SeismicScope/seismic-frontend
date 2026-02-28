import type { Layer } from "mapbox-gl";

export const clusterCircleLayer: Layer = {
  id: "clusters",
  type: "circle",
  source: "earthquakes",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 16, 100, 22, 750, 30],
  },
};

export const clusterCountLayer: Layer = {
  id: "cluster-count",
  type: "symbol",
  source: "earthquakes",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-size": 12,
  },
};

export const pointLayer: Layer = {
  id: "unclustered-point",
  type: "circle",
  source: "earthquakes",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": [
      "interpolate",
      ["linear"],
      ["get", "magnitude"],
      0,
      "#2dc937",
      4,
      "#e7b416",
      6,
      "#cc3232",
    ],
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["get", "magnitude"],
      0,
      4,
      5,
      7,
      9,
      12,
    ],
  },
};

export const clusterCircleLayerTiles: Layer = {
  id: "clusters-tiles",
  type: "circle",
  source: "earthquakes-tiles",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 16, 100, 22, 750, 30],
  },
};

export const clusterCountLayerTiles: Layer = {
  id: "cluster-count-tiles",
  type: "symbol",
  source: "earthquakes-tiles",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-size": 12,
  },
};

export const pointLayerTiles: Layer = {
  id: "unclustered-point-tiles",
  type: "circle",
  source: "earthquakes-tiles",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": [
      "interpolate",
      ["linear"],
      ["get", "magnitude"],
      0,
      "#2dc937",
      4,
      "#e7b416",
      6,
      "#cc3232",
    ],
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["get", "magnitude"],
      0,
      4,
      5,
      7,
      9,
      12,
    ],
  },
};

export const pointLabelLayerTiles: Layer = {
  id: "unclustered-point-labels-tiles",
  type: "symbol",
  source: "earthquakes-tiles",
  filter: ["!", ["has", "point_count"]],
  layout: {
    "text-field": [
      "number-format",
      ["get", "magnitude"],
      { "max-fraction-digits": 1 },
    ],
    "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
    "text-size": ["interpolate", ["linear"], ["zoom"], 8, 8, 8, 12, 12, 12],
    "text-allow-overlap": true,
    "text-ignore-placement": true,
  },
  paint: {
    "text-color": "#ffffff",
  },
};
