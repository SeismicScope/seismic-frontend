# ADR-004: useSyncExternalStore for Hydration-Safe Client Components

## Status

Accepted

## Context

Next.js App Router renders components on the server first, then hydrates on the client. Several SeismicScope components depend on client-only APIs that don't exist during SSR:

- **ThemeSwitcher** — reads `resolvedTheme` from `next-themes`, which is `undefined` on the server
- **LanguageSwitcher** — needs to render a dropdown that matches the client's current locale state
- **useBreakpoints** — calls `window.matchMedia()`, which doesn't exist on the server

Without proper handling, these components cause **hydration mismatches** — the server-rendered HTML differs from the client's first render, producing React warnings and visual flashes (FOUC — Flash of Unstyled Content).

## Decision

I use React 19's `useSyncExternalStore` with a `getServerSnapshot` that returns safe defaults:

### Pattern: useMounted guard (ThemeSwitcher)

```typescript
const subscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true, // client: mounted
    () => false, // server: not mounted
  );

function ThemeSwitcher() {
  const mounted = useMounted();
  if (!mounted) return null; // renders nothing on server
  // ... full client-side rendering
}
```

### Pattern: Store-based breakpoints (useBreakpoints)

```typescript
function createStore(query: string): Store {
  return {
    subscribe(callback) {
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    getSnapshot: () => window.matchMedia(query).matches,
    getServerSnapshot: () => false, // safe default
  };
}

export function useBreakpoints(key: BreakpointKey): boolean {
  const store = stores.get(key)!;
  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}
```

### Pattern: Listbox with aria (LanguageSwitcher)

Uses `useSyncExternalStore` for the mounted check, then renders a custom `role="listbox"` with `aria-selected` attributes only on the client.

## Alternatives Considered

### useEffect + useState (lazy initialization)

```typescript
const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);
```

Rejected because: causes a **layout shift** — the component renders with `mounted=false`, paints to the screen, then re-renders with `mounted=true`. This produces a visible flash. `useSyncExternalStore` avoids the intermediate render by synchronously providing the correct value during hydration.

### suppressHydrationWarning

Rejected because: it masks the problem rather than solving it. The mismatch still exists — React just doesn't warn about it. This can lead to subtle bugs where the server-rendered content is briefly visible before the client takes over.

### dynamic() with ssr: false

```typescript
const ThemeSwitcher = dynamic(() => import("./theme-switcher"), { ssr: false });
```

Rejected because: excludes the component from SSR entirely, which hurts initial page load performance and SEO. The component's container still needs to be present in the server HTML for layout stability.

## Consequences

### Positive

- Zero hydration warnings across all pages
- No FOUC — theme, locale, and breakpoint-dependent UI is either rendered correctly or not rendered at all (no flash of wrong content)
- Type-safe distinction between server and client snapshots
- Consistent pattern across all client-dependent components
- Works with React 19's streaming SSR and Suspense boundaries

### Negative

- Slightly more verbose than the `useState` + `useEffect` pattern
- Requires understanding of `useSyncExternalStore` API semantics
- Components using `useMounted()` return `null` on the server, contributing nothing to initial HTML (acceptable trade-off for correctness)
