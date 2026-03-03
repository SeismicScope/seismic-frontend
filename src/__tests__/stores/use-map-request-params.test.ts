import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useMapRequestParams } from "@/entities/map/model/use-map-request-params";

describe("useMapRequestParams", () => {
  beforeEach(() => {
    act(() => useMapRequestParams.setState({ requestParams: null }));
  });

  it("initializes with null request params", () => {
    const { result } = renderHook(() => useMapRequestParams());

    expect(result.current.requestParams).toBeNull();
  });

  it("sets map request params", () => {
    const { result } = renderHook(() => useMapRequestParams());
    const params = {
      west: -180,
      south: -90,
      east: 180,
      north: 90,
      zoom: 5,
    };

    act(() => result.current.setMapRequestParams(params));

    expect(result.current.requestParams).toEqual(params);
  });

  it("resets params to null", () => {
    const { result } = renderHook(() => useMapRequestParams());

    act(() =>
      result.current.setMapRequestParams({
        west: 0,
        south: 0,
        east: 10,
        north: 10,
        zoom: 8,
      }),
    );
    act(() => result.current.setMapRequestParams(null));

    expect(result.current.requestParams).toBeNull();
  });

  it("updates params with new values", () => {
    const { result } = renderHook(() => useMapRequestParams());

    act(() =>
      result.current.setMapRequestParams({
        west: 0,
        south: 0,
        east: 10,
        north: 10,
        zoom: 5,
      }),
    );
    act(() =>
      result.current.setMapRequestParams({
        west: 20,
        south: 30,
        east: 40,
        north: 50,
        zoom: 12,
      }),
    );

    expect(result.current.requestParams).toEqual({
      west: 20,
      south: 30,
      east: 40,
      north: 50,
      zoom: 12,
    });
  });
});
