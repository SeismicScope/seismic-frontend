import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { createWrapper } from "@/test-utils/create-wrapper";

vi.mock("@/entities/filter/hooks/use-filters", () => ({
  useFilters: () => ({
    apiFilters: { minMag: 3, dateFrom: "2023-01-01T00:00:00Z" },
  }),
}));

vi.mock("@/entities/map/model/use-map-request-params", () => ({
  useMapRequestParams: (selector: (state: { requestParams: null }) => null) =>
    selector({ requestParams: null }),
}));

const mockGetEarthquakes = vi.fn();

vi.mock("@/features/earthquakes/api", () => ({
  getEarthquakes: (...args: unknown[]) => mockGetEarthquakes(...args),
}));

import { useEarthquakes } from "@/features/earthquakes/hooks/use-earthquakes";

describe("useEarthquakes", () => {
  it("fetches first page of earthquakes", async () => {
    mockGetEarthquakes.mockResolvedValue({
      data: [{ id: 1, magnitude: 5.5 }],
      total: 100,
      nextCursor: 2,
    });

    const { result } = renderHook(() => useEarthquakes(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.pages).toHaveLength(1);
    expect(result.current.data?.pages[0]?.data).toHaveLength(1);
  });

  it("passes filters and params to API call", async () => {
    mockGetEarthquakes.mockResolvedValue({
      data: [],
      total: 0,
      nextCursor: null,
    });

    const { result } = renderHook(() => useEarthquakes(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockGetEarthquakes).toHaveBeenCalledWith(
      expect.objectContaining({
        minMag: 3,
        dateFrom: "2023-01-01T00:00:00Z",
        cursor: undefined,
      }),
    );
  });

  it("determines hasNextPage from nextCursor", async () => {
    mockGetEarthquakes.mockResolvedValue({
      data: [{ id: 1 }],
      total: 100,
      nextCursor: 50,
    });

    const { result } = renderHook(() => useEarthquakes(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.hasNextPage).toBe(true);
  });

  it("has no next page when cursor is null", async () => {
    mockGetEarthquakes.mockResolvedValue({
      data: [{ id: 1 }],
      total: 1,
      nextCursor: null,
    });

    const { result } = renderHook(() => useEarthquakes(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.hasNextPage).toBe(false);
  });
});
