import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@/shared/lib/axios";

import { getEarthquakesMagnitudeHistogram } from ".";

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
