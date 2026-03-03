# ADR-002: Multi-Layered State Management Strategy

## Status

Accepted

## Context

SeismicScope has three distinct categories of state:

1. **Server state** — earthquake data, statistics, histograms (fetched from API, needs caching/invalidation/pagination)
2. **Client UI state** — sidebar open/closed, selected earthquake, map viewport, loading indicators
3. **URL-synced state** — active filters (magnitude range, date range, depth), sort order, pagination cursor — must be shareable via URL

Each category has fundamentally different requirements:

- Server state needs background refetching, cache invalidation, optimistic updates, and infinite scroll support
- Client state needs fast synchronous updates without network overhead
- URL state must survive page refreshes, be bookmarkable, and update the browser history

A single state management solution cannot optimally handle all three without compromise.

## Decision

I implement a **3-layer state management** approach:

### Layer 1: TanStack Query (Server State)

- All API data fetched via `useQuery` / `useInfiniteQuery`
- Query keys scoped by feature: `["earthquakes", filters]`, `["stats", params]`
- Stale-while-revalidate with configurable `staleTime`
- Automatic background refetching and garbage collection
- `useInfiniteQuery` for cursor-based pagination on the dashboard

### Layer 2: Zustand (Client State)

- Lightweight stores per feature: `useMapStore`, `useFilterStore`
- Direct mutability via `set()` — no reducers, no action types
- Subscriptions via selectors for minimal re-renders
- `useMapRequestParams` store syncs map viewport bounds to filter queries

### Layer 3: nuqs (URL State)

- Type-safe URL search parameter management
- Filter values (`minMag`, `maxMag`, `dateFrom`, `dateTo`, `minDepth`, `maxDepth`) stored in URL
- Sort order and view preferences persisted in query string
- Shallow routing — URL updates without full page navigation
- Parsers ensure type safety: `parseAsFloat`, `parseAsString`, `parseAsStringLiteral`

### Integration pattern

```
URL (nuqs) → Filter values → TanStack Query key → API request → Cached response
                            ↘ Zustand store (map viewport, UI flags)
```

## Alternatives Considered

### Redux Toolkit (single store)

Rejected because: excessive boilerplate (slices, reducers, selectors, thunks) for this project's scale. Redux excels in very large teams where strict patterns prevent chaos, but adds friction for a focused application. RTK Query partially solves server state but doesn't handle URL sync natively.

### React Context + useReducer

Rejected because: Context re-renders all consumers on any state change. With frequent map viewport updates (~60fps during pan/zoom), this causes cascading re-renders across unrelated components. Zustand's selector-based subscriptions avoid this.

### Jotai / Recoil (atomic state)

Considered but rejected because: atomic state shines for highly interdependent state graphs. SeismicScope's state is more naturally organized by feature domains than by individual atoms. Zustand's store-per-feature model is simpler for this use case.

## Consequences

### Positive

- Each state type uses the optimal tool — no forcing square pegs into round holes
- TanStack Query eliminates manual loading/error/caching logic (~40% less boilerplate vs manual fetching)
- URL state via nuqs makes every filter combination shareable and bookmarkable
- Zustand stores are ~10 lines each — trivial to create, read, and test
- Clear mental model: "Where does this state live?" has a deterministic answer

### Negative

- Developers must understand three libraries and know which to use when
- State synchronization between layers (URL → Query key → Store) requires careful coordination
- Bundle includes three state libraries (though combined they're smaller than Redux alone)
