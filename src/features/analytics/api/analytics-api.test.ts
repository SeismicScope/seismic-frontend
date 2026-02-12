import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@/shared/lib/axios";

import type { TimeSeriesParams } from "../types";
import { getEarthquakesStats, getEarthquakesTimeSeries } from "./index";

vi.mock("@/shared/lib/axios", () => ({
  api: {
    get: vi.fn(),
  },
}));

const mockedGet = vi.mocked(api.get);

describe("earthquakes analytics api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls getEarthquakesStats with filters and returns data", async () => {
    const mockData = {
      totalCount: 150,
      maxMagnitude: 7.2,
      avgDepth: 10.5,
    };

    mockedGet.mockResolvedValue({ data: mockData });

    const filters = { minMag: 5, dateFrom: "2024-01-01" };

    const result = await getEarthquakesStats(filters);

    expect(api.get).toHaveBeenCalledWith("/analytics/stats", {
      params: filters,
    });

    expect(result).toEqual(mockData);
  });

  it("calls getEarthquakesTimeSeries with params and returns data", async () => {
    const mockData = [
      { date: "2024-01-01", count: 5 },
      { date: "2024-01-02", count: 8 },
    ];

    mockedGet.mockResolvedValue({ data: mockData });

    const params: TimeSeriesParams = { interval: "day" };

    const result = await getEarthquakesTimeSeries(params);

    expect(api.get).toHaveBeenCalledWith("/analytics/time-series", {
      params,
    });

    expect(result).toEqual(mockData);
  });
});
