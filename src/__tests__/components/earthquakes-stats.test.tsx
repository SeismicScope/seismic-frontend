import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const t: Record<string, string> = {
      "analytics.totalEvents": "Total events",
      "analytics.maxMagnitude": "Max magnitude",
      "analytics.avgMagnitude": "Avg magnitude",
      "analytics.avgDepth": "Avg depth",
      "general.noDataAvailable": "No data available",
    };

    return t[key] ?? key;
  },
}));

const mockUseStats = vi.fn();

vi.mock("@/features/analytics/hooks/use-earthquakes-stats", () => ({
  useEarthquakesStats: () => mockUseStats(),
}));

import EarthquakesStats from "@/features/analytics/components/earthquakes-stats";

describe("EarthquakesStats", () => {
  it("renders skeleton when loading", () => {
    mockUseStats.mockReturnValue({ data: null, isLoading: true });
    const { container } = render(<EarthquakesStats />);
    const skeletons = container.querySelectorAll("[data-slot='skeleton']");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders no data message when data is null and not loading", () => {
    mockUseStats.mockReturnValue({ data: null, isLoading: false });
    render(<EarthquakesStats />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  it("renders all four KPI cards with data", () => {
    mockUseStats.mockReturnValue({
      data: {
        totalEvents: 800000,
        maxMagnitude: 9.1,
        avgMagnitude: 4.5,
        avgDepth: 33.2,
      },
      isLoading: false,
    });
    render(<EarthquakesStats />);
    expect(screen.getByText("Total events")).toBeInTheDocument();
    expect(screen.getByText("Max magnitude")).toBeInTheDocument();
    expect(screen.getByText("Avg magnitude")).toBeInTheDocument();
    expect(screen.getByText("Avg depth")).toBeInTheDocument();
    expect(screen.getByText("9.1")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("33.2")).toBeInTheDocument();
  });
});
