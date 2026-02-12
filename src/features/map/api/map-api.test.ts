import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@/shared/lib/axios";

import { getMapData } from "./index";

vi.mock("@/shared/lib/axios", () => ({
  api: {
    get: vi.fn(),
  },
}));

const mockedGet = vi.mocked(api.get);

describe("map api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls getMapData with bounds, zoom and returns data", async () => {
    const mockData = {
      points: [{ id: "1", lat: 40, lng: 45, magnitude: 5 }],
      clusters: [],
    };

    mockedGet.mockResolvedValue({ data: mockData });

    const params = {
      west: 40,
      east: 50,
      north: 45,
      south: 35,
      zoom: 10,
    };

    const result = await getMapData(params);

    expect(api.get).toHaveBeenCalledWith("/map", {
      params,
      signal: undefined,
    });

    expect(result).toEqual(mockData);
  });

  it("calls getMapData with AbortSignal", async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const params = { west: 0, east: 10, north: 10, south: 0, zoom: 5 };

    mockedGet.mockResolvedValue({ data: { points: [], clusters: [] } });

    await getMapData(params, signal);

    expect(api.get).toHaveBeenCalledWith("/map", {
      params,
      signal,
    });
  });
});
