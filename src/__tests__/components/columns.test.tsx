import { describe, expect, it } from "vitest";

import {
  DANGEROUS_MAGNITUDE_LEVEL,
  getColumns,
} from "@/features/earthquakes/components/earthquakes-table/columns";
import type { TFunction } from "@/types/main";

const translations: Record<string, string> = {
  "general.date": "Date",
  "general.magnitude": "Magnitude",
  "general.depth": "Depth",
  "general.location": "Location",
  "general.coordinates": "Coordinates",
  "general.actions": "Actions",
  "general.moreInfo": "More info",
};

const mockT = ((key: string) => {
  return translations[key] ?? key;
}) as unknown as TFunction;

describe("getColumns", () => {
  const columns = getColumns(mockT, "en");

  it("returns 6 columns", () => {
    expect(columns).toHaveLength(6);
  });

  it("has date column with correct header", () => {
    expect(columns[0]?.header).toBe("Date");
  });

  it("has magnitude column with correct header", () => {
    expect(columns[1]?.header).toBe("Magnitude");
  });

  it("has depth column with correct header", () => {
    expect(columns[2]?.header).toBe("Depth");
  });

  it("has location column with correct header", () => {
    expect(columns[3]?.header).toBe("Location");
  });

  it("has coordinates column with correct header", () => {
    expect(columns[4]?.header).toBe("Coordinates");
  });

  it("has actions column with correct header", () => {
    expect(columns[5]?.header).toBe("Actions");
  });
});

describe("DANGEROUS_MAGNITUDE_LEVEL", () => {
  it("is set to 5", () => {
    expect(DANGEROUS_MAGNITUDE_LEVEL).toBe(5);
  });
});
