import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Button } from "@/shared/ui/button";

describe("Button accessibility", () => {
  it("has no a11y violations with text content", async () => {
    const { container } = render(<Button>Click me</Button>);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no a11y violations for icon button with aria-label", async () => {
    const { container } = render(
      <Button size="icon" aria-label="Close dialog">
        <span aria-hidden="true">X</span>
      </Button>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no a11y violations when disabled", async () => {
    const { container } = render(<Button disabled>Disabled</Button>);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no a11y violations for destructive variant", async () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no a11y violations for outline variant", async () => {
    const { container } = render(<Button variant="outline">Cancel</Button>);

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
