import { describe, expect, it } from "vitest";

import { formatDate } from "@/features/analytics/components/time-series-chart/helpers";

describe("formatDate", () => {
  it("formats date with short month by default", () => {
    const result = formatDate({ dateStr: "2023-06-15T00:00:00Z" });

    expect(result).toContain("Jun");
    expect(result).toContain("2023");
  });

  it("formats date with long month when specified", () => {
    const result = formatDate({
      dateStr: "2023-06-15T00:00:00Z",
      month: "long",
    });

    expect(result).toContain("June");
    expect(result).toContain("2023");
  });

  it("formats January correctly", () => {
    const result = formatDate({ dateStr: "2024-01-01T00:00:00Z" });

    expect(result).toContain("Jan");
    expect(result).toContain("2024");
  });

  it("formats December correctly", () => {
    const result = formatDate({ dateStr: "2023-12-25T00:00:00Z" });

    expect(result).toContain("Dec");
    expect(result).toContain("2023");
  });

  it("handles different year", () => {
    const result = formatDate({ dateStr: "1995-03-01T00:00:00Z" });

    expect(result).toContain("1995");
  });
});
