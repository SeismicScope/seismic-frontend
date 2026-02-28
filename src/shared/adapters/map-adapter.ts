import mapboxgl from "mapbox-gl";

import { MAPBOX_STYLE, MAPBOX_TOKEN } from "../constants";
import {
  clusterCircleLayer,
  clusterCircleLayerTiles,
  clusterCountLayer,
  clusterCountLayerTiles,
  pointLayer,
  pointLayerTiles,
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

  addVectorTileSource(id: string, tileUrl: string) {
    if (this.map.getSource(id)) return;

    this.map.addSource(id, {
      type: "vector",
      tiles: [tileUrl],
      minzoom: 0,
      maxzoom: 14,
    });
  }

  addVectorTileLayer({
    layerId,
    sourceId,
    sourceLayer,
  }: {
    layerId: string;
    sourceId: string;
    sourceLayer: string;
  }) {
    if (this.map.getLayer(layerId)) return;

    this.map.addLayer({
      ...clusterCircleLayerTiles,
      source: sourceId,
      "source-layer": sourceLayer,
    });

    this.map.addLayer({
      ...clusterCountLayerTiles,
      source: sourceId,
      "source-layer": sourceLayer,
    });

    this.map.addLayer({
      ...pointLayerTiles,
      source: sourceId,
      "source-layer": sourceLayer,
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
