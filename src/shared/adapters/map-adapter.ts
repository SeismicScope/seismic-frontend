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

  destroy() {
    this.map.remove();
  }
}
