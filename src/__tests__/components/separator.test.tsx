import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Separator } from "@/shared/ui/separator";

describe("Separator", () => {
  it("renders with data-slot attribute", () => {
    render(<Separator data-testid="sep" />);

    expect(screen.getByTestId("sep")).toHaveAttribute("data-slot", "separator");
  });

  it("defaults to horizontal orientation", () => {
    render(<Separator data-testid="sep" />);

    expect(screen.getByTestId("sep")).toHaveAttribute(
      "data-orientation",
      "horizontal",
    );
  });

  it("renders with vertical orientation", () => {
    render(<Separator orientation="vertical" data-testid="sep" />);

    expect(screen.getByTestId("sep")).toHaveAttribute(
      "data-orientation",
      "vertical",
    );
  });

  it("is decorative by default", () => {
    render(<Separator data-testid="sep" />);

    const separator = screen.getByTestId("sep");

    expect(separator).toHaveAttribute("role", "none");
    expect(separator).not.toHaveAttribute("role", "separator");
  });

  it("applies custom className", () => {
    render(<Separator className="my-8" data-testid="sep" />);

    expect(screen.getByTestId("sep")).toHaveClass("my-8");
  });
});
