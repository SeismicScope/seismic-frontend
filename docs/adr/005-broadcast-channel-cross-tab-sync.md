# ADR-005: BroadcastChannel with CallbackRef Pattern for Cross-Tab Sync

## Status

Accepted

## Context

SeismicScope supports a 3-level theme system (light/dark mode + 3 accent colors: teal, tomato, mango). When a user changes their theme or accent color in one browser tab, all other open tabs should reflect the change immediately — without page refresh and without server round-trips.

Additionally, filter state changes could benefit from cross-tab synchronization in the future.

The synchronization mechanism must:

- Work across same-origin tabs in the same browser
- Handle structured data (not just strings)
- Not cause infinite loops (tab A sends → tab B receives → tab B sends → tab A receives → ...)
- Clean up resources when components unmount
- Not recreate the channel when React re-renders with a new callback reference

## Decision

I implement a custom `useBroadcastChannel<T>` hook that uses the **callbackRef pattern** to maintain a stable channel lifecycle:

### Hook implementation

```typescript
export function useBroadcastChannel<T>(
  channelName: string,
  onMessage: (data: T) => void,
) {
  const channelRef = useRef<BroadcastChannel | null>(null);
  const callbackRef = useRef(onMessage);

  // Update callback ref on every render — no effect re-run
  useEffect(() => {
    callbackRef.current = onMessage;
  }, [onMessage]);

  // Channel lifecycle — only depends on channelName
  useEffect(() => {
    const channel = new BroadcastChannel(channelName);
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<T>) => {
      callbackRef.current(event.data); // always calls latest callback
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [channelName]); // stable — channel is NOT recreated on callback change

  function postMessage(data: T) {
    channelRef.current?.postMessage(data);
  }

  return { postMessage };
}
```

### Why callbackRef matters

Without callbackRef, the `onMessage` callback would be in the effect's dependency array. Since React creates a new function reference on each render, the effect would re-run, closing and reopening the BroadcastChannel on every render cycle. This causes:

- Dropped messages during channel recreation
- Unnecessary resource allocation/deallocation
- Potential race conditions with rapid re-renders

The callbackRef pattern decouples the callback's identity from the channel's lifecycle.

### Usage in ThemeSync

```typescript
// theme-sync.tsx
const isReceiving = useRef(false);

const { postMessage } = useBroadcastChannel<ThemeSyncPayload>(
  "theme-sync",
  (data) => {
    isReceiving.current = true;
    setTheme(data.theme);
    setColorTheme(data.colorTheme);
    setTimeout(() => {
      isReceiving.current = false;
    }, 0);
  },
);

// Send changes (guarded against echo)
useEffect(() => {
  if (!isReceiving.current) {
    postMessage({ theme: resolvedTheme, colorTheme });
  }
}, [resolvedTheme, colorTheme, postMessage]);
```

The `isReceiving` ref prevents infinite loops: when a message is received, the ref is set to `true` before applying changes, preventing the outgoing `useEffect` from broadcasting back.

## Alternatives Considered

### localStorage + storage event

```typescript
window.addEventListener("storage", (e) => {
  /* ... */
});
```

Rejected because: `storage` events only fire in **other** tabs (not the originating tab), which is actually fine for cross-tab sync, but localStorage only supports string values. Serializing/deserializing complex objects adds overhead and loses type safety. Also, `storage` events don't fire for same-key overwrites with the same value.

### SharedWorker

Rejected because: SharedWorkers add significant complexity (separate file, message port management, lifecycle handling) for a simple pub/sub use case. BroadcastChannel provides the same cross-tab communication with a much simpler API. SharedWorkers would be appropriate if we needed shared computation or centralized state.

### Server-Sent Events (SSE) / WebSocket

Rejected because: theme preferences are client-local state. Routing them through a server adds unnecessary latency and infrastructure cost for something that only needs browser-level coordination.

## Consequences

### Positive

- Real-time theme sync across all open tabs with zero perceptible delay
- Generic hook — reusable for any cross-tab sync need (filters, notifications, auth state)
- CallbackRef pattern prevents channel recreation on re-renders
- TypeScript generics provide type-safe message payloads
- Clean resource management — channel is closed on unmount

### Negative

- BroadcastChannel API is not available in Web Workers (only in Window contexts) — not a limitation for our use case but limits future reuse
- No persistence — if all tabs are closed, the sync channel is gone (theme is persisted separately via localStorage by next-themes)
- `isReceiving` guard with `setTimeout(0)` is a timing-based heuristic — could theoretically miss edge cases with very rapid state changes
