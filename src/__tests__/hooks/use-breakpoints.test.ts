import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

let matchMediaMatches = false;
const listeners: Array<(e: { matches: boolean }) => void> = [];

Object.defineProperty(window, "matchMedia", {
  value: vi.fn().mockImplementation((query: string) => ({
    matches: matchMediaMatches,
    media: query,
    addEventListener: (
      _event: string,
      handler: (e: { matches: boolean }) => void,
    ) => {
      listeners.push(handler);
    },
    removeEventListener: vi.fn(),
  })),
  writable: true,
});

import { useBreakpoints } from "@/shared/hooks/use-breakpoints";

describe("useBreakpoints", () => {
  beforeEach(() => {
    matchMediaMatches = false;
    listeners.length = 0;
  });

  it("returns true for desktop viewport", () => {
    matchMediaMatches = true;
    const { result } = renderHook(() => useBreakpoints("isDesktop"));
    expect(result.current).toBe(true);
  });

  it("returns false for mobile viewport", () => {
    matchMediaMatches = false;
    const { result } = renderHook(() => useBreakpoints("isDesktop"));
    expect(result.current).toBe(false);
  });
});
