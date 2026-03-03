import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("useBreakpoints", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
  });

  it("returns true for desktop viewport", async () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query) => ({
        matches: true,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );

    const { useBreakpoints } = await import("@/shared/hooks/use-breakpoints");
    const { result } = renderHook(() => useBreakpoints("isDesktop"));

    expect(result.current).toBe(true);
  });

  it("returns false for mobile viewport", async () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );

    const { useBreakpoints } = await import("@/shared/hooks/use-breakpoints");
    const { result } = renderHook(() => useBreakpoints("isDesktop"));

    expect(result.current).toBe(false);
  });
});
