import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useEarthquake } from "./use-earthquake";

vi.mock("../api", () => ({
  getEarthquakeById: vi.fn(),
}));

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useEarthquake", () => {
  it("does not fetch when id is undefined", () => {
    const { result } = renderHook(() => useEarthquake({ id: undefined }), {
      wrapper,
    });

    expect(result.current.fetchStatus).toBe("idle");
  });

  it("fetches when id is provided", () => {
    const { result } = renderHook(() => useEarthquake({ id: "123" }), {
      wrapper,
    });

    expect(result.current.fetchStatus).not.toBe("idle");
  });
});
