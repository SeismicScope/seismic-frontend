# ADR-007: MapAdapter as Reusable Map Abstraction

## Status

Accepted

## Context

SeismicScope uses Mapbox GL JS for two different map implementations (GeoJSON clustering map and Vector Tiles map) plus static maps on earthquake detail pages. Without a shared abstraction, each map page would duplicate Mapbox initialization logic, layer management, event handling, and cleanup code.

Additionally, Mapbox GL is a heavy library (~200KB gzipped) that should be dynamically imported to keep the initial bundle small. Proper cleanup is critical — failing to remove map instances causes memory leaks in single-page applications.

We need a pattern that:

- Encapsulates all Mapbox GL configuration in one place
- Supports both interactive and static (non-interactive) map modes
- Handles dynamic import of the mapbox-gl library
- Manages layer lifecycle (add, update, remove) without leaking handlers
- Provides a clean destruction API that prevents memory leaks
- Is reusable across features without creating cross-feature dependencies

## Decision

I implement a **MapAdapter** class in `shared/adapters/` that acts as a facade over the Mapbox GL JS API. The adapter is framework-agnostic (no React dependency) and provides a declarative configuration interface.

```typescript
// shared/adapters/map-adapter.ts
class MapAdapter {
  async init(container: HTMLElement, options: MapAdapterOptions): Promise<void>;
  addSource(id: string, data: GeoJSON.FeatureCollection): void;
  addLayers(layers: LayerConfig[]): void;
  updateData(sourceId: string, data: GeoJSON.FeatureCollection): void;
  addLayerClickHandler(layerId: string, handler: Function): void;
  addVectorTileSource(id: string, url: string): void;
  addVectorTileLayer(config: VectorTileLayerConfig): void;
  flyTo(coords: [number, number], zoom?: number): void;
  destroy(): void;
}
```

Key design decisions within the adapter:

1. **Dynamic import** — `mapboxgl` is imported inside `init()` via `await import("mapbox-gl")`, keeping it out of the main bundle.
2. **Promise-based initialization** — `init()` returns a promise that resolves when the map is fully loaded, allowing callers to await readiness.
3. **Handler tracking** — Every event handler registered via `addLayerClickHandler` is stored internally and removed in `destroy()`, preventing dangling listeners.
4. **Configurable defaults** — Center, zoom, minZoom, maxZoom, interactive mode, and controls are all configurable with sensible defaults.
5. **Placement in shared/adapters** — Following FSD rules, the adapter lives in the shared layer since it's used by multiple features (map, tiles-map, earthquake detail).

### Usage patterns

**Interactive map (features/map):**

```typescript
const adapter = new MapAdapter();
await adapter.init(containerRef, { interactive: true, controls: true });
adapter.addSource("earthquakes", geojsonData);
adapter.addLayers(clusterLayers);
adapter.addLayerClickHandler("clusters", handleClusterClick);
```

**Static detail map (earthquake/[id]):**

```typescript
const adapter = new MapAdapter();
await adapter.init(containerRef, {
  interactive: false,
  center: [longitude, latitude],
  zoom: 8,
});
adapter.addSource("point", singlePointGeoJSON);
```

**Vector tiles map (tiles-map):**

```typescript
const adapter = new MapAdapter();
await adapter.init(containerRef, { interactive: true });
adapter.addVectorTileSource("earthquakes", tileUrl);
adapter.addVectorTileLayer(tileLayerConfig);
```

## Alternatives Considered

### React wrapper component

A `<MapboxMap />` React component that encapsulates the map. Rejected because: mixing imperative Mapbox API with React's declarative model leads to complex effect chains, ref forwarding, and difficult-to-test lifecycle management. The adapter pattern keeps imperative code isolated.

### Direct Mapbox usage in each feature

Each map page manages its own Mapbox instance. Rejected because: significant code duplication (initialization, cleanup, layer management), inconsistent configuration, and higher risk of memory leaks from missed cleanup.

### Third-party React Mapbox libraries (react-map-gl)

Libraries like `react-map-gl` provide React bindings for Mapbox. Rejected because: adds another dependency layer, limits control over clustering and layer management, and doesn't support the Web Worker pattern we use for Supercluster.

## Consequences

### Positive

- Single source of truth for all Mapbox configuration and lifecycle management
- Memory-safe: `destroy()` guarantees cleanup of all resources and handlers
- Framework-agnostic: can be tested independently of React
- Dynamic import reduces initial bundle size by ~200KB
- Three different map use cases share the same adapter with zero duplication
- Follows FSD boundaries — lives in `shared/`, imported by `features/`

### Negative

- Adapter must be kept in sync with Mapbox GL API changes during upgrades
- Class-based pattern is less common in modern React codebases (but appropriate here since Mapbox is inherently imperative)
- Testing requires mocking the dynamically imported mapbox-gl module
