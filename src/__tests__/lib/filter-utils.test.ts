import { describe, expect, it } from "vitest";

import { getApiFilters } from "@/entities/filter/lib/utils";
import type { FilterType } from "@/entities/filter/types";

describe("getApiFilters", () => {
  it("converts null values to undefined", () => {
    const filters: FilterType = {
      minMag: null,
      maxMag: null,
      minDepth: null,
      maxDepth: null,
      dateFrom: null,
      dateTo: null,
      sort: null,
    };

    const result = getApiFilters(filters);

    expect(result.minMag).toBeUndefined();
    expect(result.maxMag).toBeUndefined();
    expect(result.minDepth).toBeUndefined();
    expect(result.maxDepth).toBeUndefined();
    expect(result.dateFrom).toBeUndefined();
    expect(result.dateTo).toBeUndefined();
    expect(result.sort).toBeUndefined();
  });

  it("preserves numeric values", () => {
    const filters: FilterType = {
      minMag: 3.5,
      maxMag: 7.0,
      minDepth: 10,
      maxDepth: 100,
    };

    const result = getApiFilters(filters);

    expect(result.minMag).toBe(3.5);
    expect(result.maxMag).toBe(7.0);
    expect(result.minDepth).toBe(10);
    expect(result.maxDepth).toBe(100);
  });

  it("preserves date values", () => {
    const dateFrom = new Date("2023-01-01");
    const dateTo = new Date("2023-12-31");
    const filters: FilterType = { dateFrom, dateTo };

    const result = getApiFilters(filters);

    expect(result.dateFrom).toEqual(dateFrom);
    expect(result.dateTo).toEqual(dateTo);
  });

  it("preserves sort value", () => {
    const filters: FilterType = { sort: "date_desc" };

    const result = getApiFilters(filters);

    expect(result.sort).toBe("date_desc");
  });

  it("handles mixed null and defined values", () => {
    const filters: FilterType = {
      minMag: 5,
      maxMag: null,
      minDepth: null,
      maxDepth: 200,
      sort: "magnitude_desc",
    };

    const result = getApiFilters(filters);

    expect(result.minMag).toBe(5);
    expect(result.maxMag).toBeUndefined();
    expect(result.minDepth).toBeUndefined();
    expect(result.maxDepth).toBe(200);
    expect(result.sort).toBe("magnitude_desc");
  });

  it("handles undefined values in input", () => {
    const filters: FilterType = {
      minMag: undefined,
      maxMag: undefined,
    };

    const result = getApiFilters(filters);

    expect(result.minMag).toBeUndefined();
    expect(result.maxMag).toBeUndefined();
  });

  it("handles empty filter object", () => {
    const filters: FilterType = {};

    const result = getApiFilters(filters);

    expect(result.minMag).toBeUndefined();
    expect(result.maxMag).toBeUndefined();
    expect(result.minDepth).toBeUndefined();
    expect(result.maxDepth).toBeUndefined();
    expect(result.dateFrom).toBeUndefined();
    expect(result.dateTo).toBeUndefined();
    expect(result.sort).toBeUndefined();
  });
});
