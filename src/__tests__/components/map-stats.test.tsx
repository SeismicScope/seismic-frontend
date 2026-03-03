import { render, screen } from "@testing-library/react";
import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      inBounds: "In bounds",
      points: "Points",
      buildTime: "Build time",
      heap: "Heap",
      fps: "FPS",
    };

    return translations[key] ?? key;
  },
}));

vi.mock("@/features/map/hooks/use-performance-metrics", () => ({
  usePerformanceMetrics: () => ({ fps: 60, heap: 128.5 }),
}));

import { useMapStatsStore } from "@/entities/map/model/use-map-stats";
import MapStats from "@/features/map/components/map-stats";

describe("MapStats", () => {
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

  it("renders all stat labels", () => {
    render(<MapStats />);

    expect(screen.getByText("In bounds:")).toBeInTheDocument();
    expect(screen.getByText("Points:")).toBeInTheDocument();
    expect(screen.getByText("Build time:")).toBeInTheDocument();
    expect(screen.getByText("Heap:")).toBeInTheDocument();
    expect(screen.getByText("FPS:")).toBeInTheDocument();
  });

  it("displays formatted point count", () => {
    act(() =>
      useMapStatsStore.setState({
        pointsCount: 50000,
        totalInBounds: 80000,
        limit: 100000,
        buildTime: 42.567,
      }),
    );

    render(<MapStats />);

    expect(screen.getByText("50.000")).toBeInTheDocument();
    expect(screen.getByText("80.000")).toBeInTheDocument();
  });

  it("shows limit when totalInBounds exceeds limit", () => {
    act(() =>
      useMapStatsStore.setState({
        totalInBounds: 150000,
        limit: 100000,
        pointsCount: 100000,
        buildTime: 10,
      }),
    );

    render(<MapStats />);

    expect(screen.getByText(/limit: 100.000/)).toBeInTheDocument();
  });

  it("does not show limit when within bounds", () => {
    act(() =>
      useMapStatsStore.setState({
        totalInBounds: 5000,
        limit: 100000,
        pointsCount: 5000,
        buildTime: 10,
      }),
    );

    render(<MapStats />);

    expect(screen.queryByText(/limit:/)).not.toBeInTheDocument();
  });

  it("displays performance metrics", () => {
    render(<MapStats />);

    expect(screen.getByText("60")).toBeInTheDocument();
    expect(screen.getByText("128.50 MB")).toBeInTheDocument();
  });
});
