import { describe, expect, it } from "vitest";

import { FILTERS, PAGES } from "@/features/command-palette/constants";

describe("PAGES", () => {
  it("contains 6 navigation pages", () => {
    expect(PAGES).toHaveLength(6);
  });

  it("every page has label, path, and icon", () => {
    for (const page of PAGES) {
      expect(page.label).toBeTruthy();
      expect(page.path).toBeTruthy();
      expect(page.icon).toBeDefined();
    }
  });

  it("includes home page at root path", () => {
    const home = PAGES.find((p) => p.path === "/");

    expect(home).toBeDefined();
    expect(home?.label).toBe("Home");
  });

  it("includes dashboard page", () => {
    const dashboard = PAGES.find((p) => p.path === "/dashboard");

    expect(dashboard).toBeDefined();
  });

  it("all paths start with /", () => {
    for (const page of PAGES) {
      expect(page.path.startsWith("/")).toBe(true);
    }
  });
});

describe("FILTERS", () => {
  it("contains 5 filter presets", () => {
    expect(FILTERS).toHaveLength(5);
  });

  it("every filter has label and action function", () => {
    for (const filter of FILTERS) {
      expect(filter.label).toBeTruthy();
      expect(typeof filter.action).toBe("function");
    }
  });

  it("magnitude 5+ filter returns correct value", () => {
    const mag5 = FILTERS.find((f) => f.label.includes("magnitude 5+"));

    expect(mag5?.action()).toEqual({ minMag: 5 });
  });

  it("magnitude 7+ filter returns correct value", () => {
    const mag7 = FILTERS.find((f) => f.label.includes("magnitude 7+"));

    expect(mag7?.action()).toEqual({ minMag: 7 });
  });

  it("depth < 50km filter returns correct value", () => {
    const shallow = FILTERS.find((f) => f.label.includes("depth < 50"));

    expect(shallow?.action()).toEqual({ maxDepth: 50 });
  });

  it("depth > 50km filter returns correct value", () => {
    const deep = FILTERS.find((f) => f.label.includes("depth > 50"));

    expect(deep?.action()).toEqual({ minDepth: 50 });
  });

  it("reset filter returns null", () => {
    const reset = FILTERS.find((f) => f.label.includes("Reset"));

    expect(reset?.action()).toBeNull();
  });
});
