import { describe, expect, it } from "vitest";

import { formatDate } from "./helpers";

describe("formatDate", () => {
  it("formats date with short month by default", () => {
    const result = formatDate({ dateStr: "2024-01-15" });

    expect(result).toBe("Jan 2024");
  });

  it("formats date with long month", () => {
    const result = formatDate({
      dateStr: "2024-01-15",
      month: "long",
    });

    expect(result).toBe("January 2024");
  });

  it("handles different dates correctly", () => {
    const result = formatDate({
      dateStr: "2023-12-01",
    });

    expect(result).toBe("Dec 2023");
  });

  it("returns 'Invalid Date' for invalid input", () => {
    const result = formatDate({
      dateStr: "invalid-date",
    });

    expect(result).toBe("Invalid Date");
  });
});
