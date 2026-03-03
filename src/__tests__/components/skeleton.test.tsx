import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Skeleton } from "@/shared/ui/skeleton";

describe("Skeleton", () => {
  it("renders with data-slot attribute", () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton")).toHaveAttribute(
      "data-slot",
      "skeleton",
    );
  });

  it("has animate-pulse class for loading animation", () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton")).toHaveClass("animate-pulse");
  });

  it("applies custom className", () => {
    render(<Skeleton className="h-10 w-40" data-testid="skeleton" />);
    const el = screen.getByTestId("skeleton");

    expect(el).toHaveClass("h-10");
    expect(el).toHaveClass("w-40");
  });

  it("renders as a div element", () => {
    render(<Skeleton data-testid="skeleton" />);

    expect(screen.getByTestId("skeleton").tagName).toBe("DIV");
  });

  it("passes additional props through", () => {
    render(<Skeleton data-testid="skeleton" aria-label="Loading" />);

    expect(screen.getByTestId("skeleton")).toHaveAttribute(
      "aria-label",
      "Loading",
    );
  });
});
