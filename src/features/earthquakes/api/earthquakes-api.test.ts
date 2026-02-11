import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@/shared/lib/axios";

import {
  getEarthquakeById,
  getEarthquakes,
  getEarthquakesMagnitudeHistogram,
} from "./index";

vi.mock("@/shared/lib/axios", () => ({
  api: {
    get: vi.fn(),
  },
}));

const mockedGet = vi.mocked(api.get);

describe("earthquakes api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls getEarthquakes with params and returns data", async () => {
    const mockData = { items: [], total: 0 };

    mockedGet.mockResolvedValue({ data: mockData });

    const result = await getEarthquakes({ cursor: 1 });

    expect(api.get).toHaveBeenCalledWith("/earthquakes", {
      params: { cursor: 1 },
    });

    expect(result).toEqual(mockData);
  });

  it("calls getEarthquakeById and returns data", async () => {
    const mockData = { id: "1" };

    mockedGet.mockResolvedValue({ data: mockData });

    const result = await getEarthquakeById("1");

    expect(api.get).toHaveBeenCalledWith("/earthquakes/1");
    expect(result).toEqual(mockData);
  });

  it("calls getEarthquakesMagnitudeHistogram with filters", async () => {
    const mockData = [{ magnitude: 3, count: 10 }];

    mockedGet.mockResolvedValue({ data: mockData });

    const filters = { minMag: 2 };

    const result = await getEarthquakesMagnitudeHistogram(filters);

    expect(api.get).toHaveBeenCalledWith("/earthquakes/magnitude-histogram", {
      params: filters,
    });

    expect(result).toEqual(mockData);
  });
});
