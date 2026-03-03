import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Histogram from "@/shared/ui/histogram";
import type { Range } from "@/shared/ui/histogram/types";

describe("Histogram", () => {
  const mockHistogram = [
    { magnitude: 2, count: 100 },
    { magnitude: 3, count: 250 },
    { magnitude: 4, count: 500 },
    { magnitude: 5, count: 300 },
    { magnitude: 6, count: 150 },
    { magnitude: 7, count: 50 },
    { magnitude: 8, count: 10 },
  ];

  it("renders histogram bars", () => {
    render(
      <Histogram
        histogram={mockHistogram}
        range={[2, 8] as Range}
        onRangeCommit={vi.fn()}
        isLoading={false}
      />,
    );

    expect(document.querySelector(".flex")).toBeInTheDocument();
  });

  it("renders skeleton when loading", () => {
    const { container } = render(
      <Histogram
        histogram={[]}
        range={[2, 8] as Range}
        onRangeCommit={vi.fn()}
        isLoading={true}
      />,
    );
    expect(
      container.querySelector("[data-slot='skeleton']"),
    ).toBeInTheDocument();
  });

  it("renders range input fields", () => {
    render(
      <Histogram
        histogram={mockHistogram}
        range={[3, 7] as Range}
        onRangeCommit={vi.fn()}
        isLoading={false}
      />,
    );
    const inputs = screen.getAllByRole("spinbutton");
    expect(inputs.length).toBe(2);
  });
});
