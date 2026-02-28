import mapboxgl from "mapbox-gl";

import { MAPBOX_STYLE, MAPBOX_TOKEN } from "../constants";
import {
  clusterCircleLayer,
  clusterCountLayer,
  pointLayer,
} from "./map-layers";

export type MapAdapterOptions = {
  center?: [number, number];
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  maxBounds?: mapboxgl.LngLatBoundsLike;
  interactive?: boolean;
  navigationControl?: boolean;
  attributionControl?: boolean;
};

const DEFAULT_OPTIONS: MapAdapterOptions = {
  center: [20, 44],
  zoom: 5,
  minZoom: 4,
  maxZoom: 14,
  interactive: true,
  navigationControl: true,
  attributionControl: true,
};

export class MapAdapter {
  private map: mapboxgl.Map;

  constructor(container: HTMLElement, options?: MapAdapterOptions) {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    const opts = { ...DEFAULT_OPTIONS, ...options };

    this.map = new mapboxgl.Map({
      container,
      style: MAPBOX_STYLE,
      center: opts.center,
      zoom: opts.zoom,
      minZoom: opts.minZoom,
      maxZoom: opts.maxZoom,
      maxBounds: opts.maxBounds,
      interactive: opts.interactive,
      attributionControl: opts.attributionControl,
      fadeDuration: 0,
      collectResourceTiming: false,
      renderWorldCopies: false,
      trackResize: true,
    });

    if (opts.navigationControl) {
      this.map.addControl(new mapboxgl.NavigationControl(), "top-right");
    }
  }

  onLoad(callback: () => void) {
    this.map.on("style.load", callback);
  }

  onLoadMapTiles(callback: () => void) {
    this.map.on("load", callback);
  }

  getMap() {
    return this.map;
  }

  addSource(id: string) {
    if (this.map.getSource(id)) return;

    this.map.addSource(id, {
      type: "geojson",
      data: { type: "FeatureCollection", features: [] },
    });
  }

  addLayers() {
    if (this.map.getLayer("clusters")) return;

    this.map.addLayer(clusterCircleLayer);
    this.map.addLayer(clusterCountLayer);
    this.map.addLayer(pointLayer);
  }

  updateData(
    id: string,
    features: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[],
  ) {
    const source = this.map.getSource(id) as mapboxgl.GeoJSONSource;
    if (!source) return;

    source.setData({
      type: "FeatureCollection",
      features,
    });
  }

  flyTo(center: [number, number], zoom: number) {
    this.map.flyTo({
      center,
      zoom,
      duration: 300,
    });
  }

  async loadImage(id: string, url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.map.loadImage(url, (error, image) => {
        if (error || !image) return reject(error);
        if (!this.map.hasImage(id)) {
          this.map.addImage(id, image);
        }
        resolve();
      });
    });
  }

  addVectorTileSource(id: string, tileUrl: string) {
    if (this.map.getSource(id)) return;

    this.map.addSource(id, {
      type: "vector",
      tiles: [tileUrl],
      minzoom: 0,
      maxzoom: 14,
    });
  }

  async addVectorTileLayer({
    layerId,
    sourceId,
    sourceLayer,
  }: {
    layerId: string;
    sourceId: string;
    sourceLayer: string;
  }) {
    if (this.map.getLayer(layerId)) return;

    await Promise.all([
      this.loadImage("eq-low", "/icons/eq-low.svg"),
      this.loadImage("eq-mid", "/icons/eq-mid.svg"),
      this.loadImage("eq-high", "/icons/eq-high.svg"),
      this.loadImage("eq-ultra-high", "/icons/eq-ultra-high.svg"),
    ]);

    this.map.addLayer({
      id: layerId,
      type: "symbol",
      source: sourceId,
      "source-layer": sourceLayer,
      layout: {
        "icon-image": [
          "step",
          ["get", "magnitude"],
          "eq-low",
          3,
          "eq-mid",
          6,
          "eq-high",
          8,
          "eq-ultra-high",
        ],
        "icon-size": [
          "interpolate",
          ["linear"],
          ["zoom"],
          4,
          0.3,
          8,
          0.6,
          12,
          1.0,
        ],
        "icon-allow-overlap": true,
        "icon-ignore-placement": true,
      },
    });
  }

  addLayerClickHandler(
    layerId: string,
    handler: (
      feature: mapboxgl.MapboxGeoJSONFeature,
      lngLat: mapboxgl.LngLat,
    ) => void,
  ) {
    this.map.on("click", layerId, (e) => {
      const feature = e.features?.[0];
      if (!feature) return;

      handler(feature, e.lngLat);
    });

    this.map.on("mouseenter", layerId, () => {
      this.map.getCanvas().style.cursor = "pointer";
    });

    this.map.on("mouseleave", layerId, () => {
      this.map.getCanvas().style.cursor = "";
    });
  }

  destroy() {
    this.map.remove();
  }
}
