"use client";

import { useSyncExternalStore } from "react";

const queries = {
  isSmall: "(max-width: 420px)",
  isMobile: "(max-width: 767px)",
  isTablet: "(min-width: 768px) and (max-width: 1023px)",
  isDesktop: "(min-width: 1024px)",
  isXL: "(min-width: 1280px)",
  isWide: "(min-width: 1440px)",
} as const;

type BreakpointKey = keyof typeof queries;

type Store = {
  subscribe: (cb: () => void) => () => void;
  getSnapshot: () => boolean;
  getServerSnapshot: () => boolean;
};

const stores = new Map<BreakpointKey, Store>();

function createStore(query: string): Store {
  let mql: MediaQueryList | null = null;

  function getMql() {
    if (typeof window === "undefined") return null;
    if (!mql) mql = window.matchMedia(query);

    return mql;
  }

  return {
    subscribe(callback) {
      const media = getMql();
      if (!media) return () => {};

      media.addEventListener("change", callback);

      return () => media.removeEventListener("change", callback);
    },

    getSnapshot: () => getMql()?.matches ?? false,

    getServerSnapshot: () => false,
  };
}

export function useBreakpoints(key: BreakpointKey): boolean {
  if (!stores.has(key)) {
    stores.set(key, createStore(queries[key]));
  }

  const store = stores.get(key)!;

  return useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
}
