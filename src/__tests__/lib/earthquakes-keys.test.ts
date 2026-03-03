import { describe, expect, it } from "vitest";

import { EARTHQUAKES_KEYS } from "@/features/earthquakes/constants";

describe("EARTHQUAKES_KEYS", () => {
  it("returns base key for all", () => {
    expect(EARTHQUAKES_KEYS.all).toEqual(["earthquakes"]);
  });

  it("includes filters and params in filtered key", () => {
    const filters = { minMag: 5, maxMag: 8 };
    const params = { west: -10, south: 30, east: 10, north: 50, zoom: 6 };
    const key = EARTHQUAKES_KEYS.filtered(filters, params);

    expect(key[0]).toBe("earthquakes");
    expect(key[1]).toEqual(expect.objectContaining({ minMag: 5, maxMag: 8 }));
    expect(key[1]).toEqual(expect.objectContaining({ west: -10, zoom: 6 }));
  });

  it("returns same structure for earthquakes key", () => {
    const filters = { minMag: 3 };
    const params = { zoom: 8 };
    const filtered = EARTHQUAKES_KEYS.filtered(filters, params);
    const earthquakes = EARTHQUAKES_KEYS.earthquakes(filters, params);

    expect(earthquakes).toEqual(filtered);
  });

  it("appends histogram to filtered key", () => {
    const filters = {};
    const params = {};
    const key = EARTHQUAKES_KEYS.histogram(filters, params);

    expect(key[key.length - 1]).toBe("histogram");
  });

  it("produces different keys for different filters", () => {
    const key1 = EARTHQUAKES_KEYS.earthquakes({ minMag: 3 }, {});
    const key2 = EARTHQUAKES_KEYS.earthquakes({ minMag: 7 }, {});

    expect(key1).not.toEqual(key2);
  });

  it("produces different keys for different params", () => {
    const key1 = EARTHQUAKES_KEYS.earthquakes({}, { zoom: 5 });
    const key2 = EARTHQUAKES_KEYS.earthquakes({}, { zoom: 10 });

    expect(key1).not.toEqual(key2);
  });
});
