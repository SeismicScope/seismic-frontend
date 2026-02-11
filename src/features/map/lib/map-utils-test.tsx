import type { Map } from "mapbox-gl";
import React from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";

import { getBounds, renderMapPopup, toGeoJSON } from "./utils";

describe("toGeoJSON", () => {
  it("converts points to GeoJSON features", () => {
    const points = [
      {
        id: 1,
        latitude: 10,
        longitude: 20,
        magnitude: 5,
        depth: 100,
        location: "Test Location",
        occuredAt: "2024-01-01",
      },
    ];

    const result = toGeoJSON(points);

    expect(result).toHaveLength(1);

    expect(result[0]).toEqual({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [20, 10],
      },
      properties: {
        id: "1",
        magnitude: 5,
        depth: 100,
        location: "Test Location",
        occuredAt: "2024-01-01",
      },
    });
  });

  it("returns empty array for empty input", () => {
    expect(toGeoJSON([])).toEqual([]);
  });
});

describe("getBounds", () => {
  it("returns correct bounds from map", () => {
    const mockMap = {
      getBounds: () => ({
        getWest: () => 1,
        getSouth: () => 2,
        getEast: () => 3,
        getNorth: () => 4,
      }),
    } as unknown as Map;

    const bounds = getBounds(mockMap);

    expect(bounds).toEqual({
      west: 1,
      south: 2,
      east: 3,
      north: 4,
    });
  });

  it("returns zeros if bounds are undefined", () => {
    const mockMap = {
      getBounds: () => undefined,
    } as unknown as Map;

    const bounds = getBounds(mockMap);

    expect(bounds).toEqual({
      west: 0,
      south: 0,
      east: 0,
      north: 0,
    });
  });
});

vi.mock("react-dom/client", () => {
  return {
    createRoot: vi.fn(() => ({
      render: vi.fn(),
    })),
  };
});

describe("renderMapPopup", () => {
  it("creates a div and renders content into it", () => {
    const element = <div>Popup</div>;

    const result = renderMapPopup(element);

    expect(result).toBeInstanceOf(HTMLElement);
    expect(createRoot).toHaveBeenCalledWith(result);
  });
});
