import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useMapStatsStore } from "@/entities/map/model/use-map-stats";

describe("useMapStatsStore", () => {
  beforeEach(() => {
    act(() =>
      useMapStatsStore.setState({
        pointsCount: 0,
        buildTime: 0,
        totalInBounds: 0,
        limit: 0,
      }),
    );
  });

  it("initializes with zero values", () => {
    const { result } = renderHook(() => useMapStatsStore());

    expect(result.current.pointsCount).toBe(0);
    expect(result.current.buildTime).toBe(0);
    expect(result.current.totalInBounds).toBe(0);
    expect(result.current.limit).toBe(0);
  });

  it("updates partial stats", () => {
    const { result } = renderHook(() => useMapStatsStore());

    act(() => result.current.setMapStats({ pointsCount: 500 }));

    expect(result.current.pointsCount).toBe(500);
    expect(result.current.buildTime).toBe(0);
  });

  it("updates multiple stats at once", () => {
    const { result } = renderHook(() => useMapStatsStore());

    act(() =>
      result.current.setMapStats({
        pointsCount: 1000,
        buildTime: 42.5,
        totalInBounds: 50000,
        limit: 100000,
      }),
    );

    expect(result.current.pointsCount).toBe(1000);
    expect(result.current.buildTime).toBe(42.5);
    expect(result.current.totalInBounds).toBe(50000);
    expect(result.current.limit).toBe(100000);
  });

  it("preserves existing stats when updating partially", () => {
    const { result } = renderHook(() => useMapStatsStore());

    act(() => result.current.setMapStats({ pointsCount: 100, buildTime: 10 }));
    act(() => result.current.setMapStats({ totalInBounds: 5000 }));

    expect(result.current.pointsCount).toBe(100);
    expect(result.current.buildTime).toBe(10);
    expect(result.current.totalInBounds).toBe(5000);
  });
});
