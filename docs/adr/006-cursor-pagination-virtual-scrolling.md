# ADR-006: Cursor-Based Pagination with Virtual Scrolling

## Status

Accepted

## Context

SeismicScope's dashboard displays earthquake records from a dataset of 800,000+ entries. Users can filter, sort, and scroll through these records. The pagination strategy must:

- Maintain constant-time performance regardless of page depth (page 1 should be as fast as page 10,000)
- Support infinite scrolling UX (no explicit page numbers)
- Keep DOM node count low for smooth scrolling at 60fps
- Work correctly when filters change the total result set dynamically
- Integrate with TanStack Query's caching and prefetching

## Decision

I combine **cursor-based (keyset) pagination** on the backend with **TanStack Virtual** for DOM virtualization on the frontend.

### Backend: Cursor-Based Pagination

```sql
-- Instead of OFFSET (O(n) — scans and discards rows):
SELECT * FROM earthquakes ORDER BY id LIMIT 50 OFFSET 100000;

-- We use cursor-based (O(1) — seeks directly via index):
SELECT * FROM earthquakes
WHERE id > :cursor
ORDER BY id
LIMIT 50;
```

Key implementation details:

- **Cursor**: The `id` (or composite `occurred_at + id` for date sorts) of the last item in the current page
- **Response shape**: `{ data: Earthquake[], total: number, nextCursor: number | null }`
- `nextCursor` is `null` when there are no more results — signals end of dataset
- Backend indexes: `CREATE INDEX idx_earthquakes_id ON earthquakes (id)` ensures B-tree seek
- For compound sorts (e.g., `magnitude DESC, id ASC`), cursor includes both values to maintain stable ordering

### Frontend: TanStack Query useInfiniteQuery

```typescript
const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useInfiniteQuery({
    queryKey: ["earthquakes", filters, sort],
    queryFn: ({ pageParam }) =>
      fetchEarthquakes({ ...filters, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    initialPageParam: undefined,
  });
```

- Pages are accumulated in the query cache as an array of page responses
- `fetchNextPage()` is triggered when the user scrolls near the bottom
- When filters change, the query key changes, cache is invalidated, and pagination restarts from the beginning
- `staleTime` is set to prevent unnecessary refetches during scroll

### Frontend: TanStack Virtual (DOM Virtualization)

```typescript
const virtualizer = useVirtualizer({
  count: flatData.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => ROW_HEIGHT,
  overscan: 10,
});
```

- Only renders DOM nodes for visible rows + 10 overscan rows above/below
- For 800k rows, instead of 800k `<tr>` elements, we render ~30-40 at any time
- Absolute positioning via `transform: translateY()` — no layout recalculation
- Scroll position is preserved when new pages are appended

### Integration flow

```
User scrolls ↓
  → TanStack Virtual detects approaching end of rendered range
    → Intersection Observer triggers fetchNextPage()
      → TanStack Query fetches next cursor page from API
        → Backend seeks to cursor position via index (O(1))
          → New rows appended to flatData
            → TanStack Virtual renders new visible rows
```

## Alternatives Considered

### Offset-based pagination (LIMIT/OFFSET)

Rejected because: PostgreSQL must scan and discard `OFFSET` rows before returning results. At `OFFSET 500000`, this means scanning 500k rows just to discard them. Performance degrades linearly with page depth — O(n) where n is the offset value. For 800k records, deep pages would take several seconds.

### Full client-side loading

Loading all 800k records into the browser would require ~200MB of JSON parsing and memory allocation. Even with Web Workers, the initial load time (~5-10s) and memory pressure are unacceptable. Virtual scrolling only solves the DOM problem, not the data problem.

### Server-side table rendering (SSR per page)

Rejected because: each page navigation would require a full server round-trip and HTML generation. This eliminates the smooth scrolling experience and doesn't support infinite scroll. Also, filters and sort changes would each trigger a full page reload.

### GraphQL Relay-style pagination

Considered but rejected because: adding GraphQL infrastructure (schema, resolvers, client) for a single paginated endpoint is over-engineering. The REST cursor pattern achieves identical performance with existing NestJS controllers.

## Consequences

### Positive

- Constant-time pagination: page 1 and page 10,000 have identical response times (~20ms)
- DOM stays lightweight: ~40 nodes regardless of total dataset size
- Smooth 60fps scrolling with no jank from DOM mutations
- Shareable cursor state — cursor can be encoded in URL for deep linking
- TanStack Query cache preserves loaded pages — scrolling back up doesn't re-fetch

### Negative

- Cursor pagination doesn't support "jump to page N" — users can only scroll sequentially (acceptable for infinite scroll UX, mitigated by filters)
- Compound cursors (multi-column sort) add complexity to the backend query builder
- TanStack Virtual requires fixed or estimated row heights — dynamic row heights need `measureElement` callbacks
- Accumulated pages in memory can grow large if user scrolls through entire dataset (mitigated by TanStack Query's `maxPages` option)
