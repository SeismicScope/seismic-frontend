import { describe, expect, it } from "vitest";

import {
  COLOR_THEME,
  COLOR_THEME_META,
  COLOR_THEME_VALUES,
  COOKIE_CONSENT_KEY,
  DATE_RANGE_END,
  DATE_RANGE_START,
  DEFAULT_LOCALE,
  LOCALE_META,
  LOCALES,
  PERIODS,
  SORT_OPTIONS_META,
  SORT_VALUES,
} from "@/shared/constants";

describe("LOCALES", () => {
  it("contains en, de, es", () => {
    expect(LOCALES).toEqual(["en", "de", "es"]);
  });

  it("has metadata for every locale", () => {
    for (const locale of LOCALES) {
      expect(LOCALE_META[locale]).toBeDefined();
      expect(LOCALE_META[locale].flag).toBeTruthy();
      expect(LOCALE_META[locale].label).toBeTruthy();
    }
  });
});

describe("DEFAULT_LOCALE", () => {
  it("is en", () => {
    expect(DEFAULT_LOCALE).toBe("en");
  });
});

describe("SORT_VALUES", () => {
  it("contains 6 sort options", () => {
    expect(SORT_VALUES).toHaveLength(6);
  });

  it("includes all expected sort directions", () => {
    expect(SORT_VALUES).toContain("date_asc");
    expect(SORT_VALUES).toContain("date_desc");
    expect(SORT_VALUES).toContain("magnitude_asc");
    expect(SORT_VALUES).toContain("magnitude_desc");
    expect(SORT_VALUES).toContain("depth_asc");
    expect(SORT_VALUES).toContain("depth_desc");
  });

  it("has metadata for every sort option", () => {
    for (const sort of SORT_VALUES) {
      expect(SORT_OPTIONS_META[sort]).toBeTruthy();
    }
  });
});

describe("COLOR_THEME", () => {
  it("has teal, tomato, mango", () => {
    expect(COLOR_THEME.TEAL).toBe("teal");
    expect(COLOR_THEME.TOMATO).toBe("tomato");
    expect(COLOR_THEME.MANGO).toBe("mango");
  });

  it("has 3 values", () => {
    expect(COLOR_THEME_VALUES).toHaveLength(3);
  });

  it("has metadata with label and color for each theme", () => {
    for (const theme of COLOR_THEME_VALUES) {
      const meta = COLOR_THEME_META[theme];

      expect(meta.label).toBeTruthy();
      expect(meta.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});

describe("PERIODS", () => {
  it("defines day, week, month, year", () => {
    expect(PERIODS.DAY).toBe("day");
    expect(PERIODS.WEEK).toBe("week");
    expect(PERIODS.MONTH).toBe("month");
    expect(PERIODS.YEAR).toBe("year");
  });
});

describe("DATE_RANGE", () => {
  it("starts in 1930", () => {
    expect(DATE_RANGE_START.getFullYear()).toBe(1930);
  });

  it("ends in 2018", () => {
    expect(DATE_RANGE_END.getFullYear()).toBe(2018);
  });

  it("start is before end", () => {
    expect(DATE_RANGE_START.getTime()).toBeLessThan(DATE_RANGE_END.getTime());
  });
});

describe("COOKIE_CONSENT_KEY", () => {
  it("is defined", () => {
    expect(COOKIE_CONSENT_KEY).toBe("cookie-consent");
  });
});
