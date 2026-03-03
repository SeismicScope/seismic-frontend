# ADR-003: Dual Map Architecture — GeoJSON+Supercluster vs PostGIS MVT

## Status

Accepted

## Context

SeismicScope visualizes 800,000+ earthquake records on an interactive map. At this scale, rendering individual markers is not feasible — the browser cannot handle 800k DOM elements or even 800k WebGL points without significant optimization.

Two fundamentally different approaches exist for large-scale geospatial visualization:

1. **Client-side clustering** — load data as GeoJSON, cluster on the client using spatial indexing
2. **Server-side vector tiles** — pre-generate tiles on the server, stream only visible data

Each has distinct performance characteristics, trade-offs, and applicability depending on dataset size.

## Decision

I implement **both approaches** as separate map modes, allowing users (and reviewers) to compare:

### Approach A: GeoJSON + Supercluster (Web Worker)

- Earthquake data fetched as GeoJSON from the API
- **Supercluster** library loaded in a **Web Worker** (`map.worker.ts`) to offload clustering from the main thread
- Worker receives points and viewport, returns clusters at the current zoom level
- Communication via `postMessage` with structured clone transfer
- Optimal for datasets up to ~150k points
- `useEarthquakeMap` hook manages worker lifecycle, viewport sync, and cluster state

### Approach B: PostGIS MVT (Mapbox Vector Tiles)

- PostgreSQL generates vector tiles server-side using `ST_AsMVT` + `ST_AsTile`
- Dual SRID strategy: data stored in WGS 84 (SRID 4326), transformed to Web Mercator (SRID 3857) for tile generation
- GIST spatial indexes on geometry columns for sub-100ms tile generation
- Mapbox GL JS consumes tiles natively via `vector` source type
- Scales to millions of points with constant client memory footprint
- NestJS endpoint at `/earthquakes/tiles/{z}/{x}/{y}.mvt`

### Performance comparison

| Metric             | GeoJSON+Supercluster | PostGIS MVT            |
| ------------------ | -------------------- | ---------------------- |
| Initial load       | ~2-5s (full dataset) | ~200ms (visible tiles) |
| Memory usage       | 50-200MB client      | ~5MB client            |
| Pan/zoom           | Instant (cached)     | ~100ms per tile        |
| Max practical size | ~150k points         | 10M+ points            |
| Offline capability | Full (cached)        | None                   |

## Alternatives Considered

### Single approach only

Rejected because: implementing both demonstrates understanding of the trade-offs. A senior engineer should know when client-side clustering is sufficient and when server-side tiling is necessary. The dual implementation serves as a technical showcase.

### deck.gl

Considered but rejected because: deck.gl adds ~300KB to the bundle and uses a separate WebGL context from Mapbox GL. Supercluster + Web Worker achieves comparable performance for our dataset size with significantly less overhead. deck.gl would be the right choice if we needed 3D visualization or 1M+ client-side points.

### H3 hexagonal binning

Considered for server-side aggregation. Rejected as the primary approach because individual earthquake points carry metadata (magnitude, depth) that hexagonal bins would aggregate away. H3 could complement MVT in the future for heatmap views.

## Consequences

### Positive

- Demonstrates deep understanding of geospatial data engineering at two scales
- Web Worker pattern keeps the main thread at 60fps during clustering operations
- MVT approach showcases PostGIS expertise and server-side optimization
- Users can switch between modes to experience the performance differences
- `usePerformanceMetrics` hook provides FPS and memory monitoring for both modes

### Negative

- Maintaining two parallel map implementations increases code surface area
- Web Worker communication adds complexity (serialization overhead, message passing)
- MVT requires PostGIS-specific SQL knowledge that may not be familiar to all contributors
- Two map modes could confuse non-technical users (mitigated by clear UI labeling)
