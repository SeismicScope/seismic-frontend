import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      "analytics.failedToRenderChart": "Failed to render chart",
      "analytics.loadingChart": "Loading chart...",
      "general.noDataAvailable": "No data available",
      "general.seismicEventsOverTime": "Seismic Events Over Time",
    };

    return translations[key] ?? key;
  },
}));

vi.mock("recharts", () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  AreaChart: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="area-chart">{children}</div>
  ),
  Area: () => <div data-testid="area" />,
  XAxis: () => <div />,
  YAxis: () => <div />,
  CartesianGrid: () => <div />,
}));

vi.mock("@/shared/ui/chart", () => ({
  ChartContainer: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    role?: string;
    "aria-label"?: string;
    "aria-describedby"?: string;
    className?: string;
    config: Record<string, unknown>;
  }) => (
    <div
      role={props.role}
      aria-label={props["aria-label"]}
      aria-describedby={props["aria-describedby"]}
    >
      {children}
    </div>
  ),
  ChartTooltip: () => <div />,
  ChartTooltipContent: () => <div />,
}));

import { TimeSeriesChart } from "@/features/analytics/components/time-series-chart";
import type { EarthquakeTimeSeries } from "@/features/analytics/types";

describe("TimeSeriesChart", () => {
  const mockData: EarthquakeTimeSeries[] = [
    { date: "2023-01-01T00:00:00Z", count: 10 },
    { date: "2023-02-01T00:00:00Z", count: 25 },
    { date: "2023-03-01T00:00:00Z", count: 5 },
  ];

  it("renders chart when data is provided", () => {
    render(<TimeSeriesChart data={mockData} />);

    expect(screen.getByTestId("area-chart")).toBeInTheDocument();
  });

  it("renders no data state when data is empty", () => {
    render(<TimeSeriesChart data={[]} />);

    expect(screen.queryByTestId("area-chart")).not.toBeInTheDocument();
  });

  it("has accessible chart container with role img", () => {
    render(<TimeSeriesChart data={mockData} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("has aria-describedby linking to summary", () => {
    render(<TimeSeriesChart data={mockData} />);

    const chart = screen.getByRole("img");

    expect(chart).toHaveAttribute("aria-describedby", "chart-summary");
  });

  it("generates accessible summary with min, max, and total", () => {
    render(<TimeSeriesChart data={mockData} />);

    const summary = document.getElementById("chart-summary");

    expect(summary).toBeInTheDocument();
    expect(summary?.textContent).toContain("40");
    expect(summary?.textContent).toContain("5");
    expect(summary?.textContent).toContain("25");
  });

  it("hides summary from visual users", () => {
    render(<TimeSeriesChart data={mockData} />);

    const summary = document.getElementById("chart-summary");

    expect(summary).toHaveClass("sr-only");
  });
});
