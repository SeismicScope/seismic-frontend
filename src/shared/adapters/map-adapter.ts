import mapboxgl from "mapbox-gl";

import { MAPBOX_STYLE, MAPBOX_TOKEN } from "../constants";
import {
  clusterCircleLayer,
  clusterCountLayer,
  pointLayer,
} from "./map-layers";

export class MapAdapter {
  private map: mapboxgl.Map;

  constructor(container: HTMLElement) {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    this.map = new mapboxgl.Map({
      container,
      style: MAPBOX_STYLE,
      center: [20, 44],
      zoom: 5,
      minZoom: 4,
      maxZoom: 14,
      maxBounds: [
        [-15, 30],
        [45, 65],
      ],
    });

    this.map.addControl(new mapboxgl.NavigationControl(), "top-right");
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
