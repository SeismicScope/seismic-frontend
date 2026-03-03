import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";

describe("Alert accessibility", () => {
  it("has no a11y violations with default variant", async () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>This is an informational alert.</AlertDescription>
      </Alert>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no a11y violations with destructive variant", async () => {
    const { container } = render(
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has role=alert for screen reader announcement", () => {
    const { container } = render(
      <Alert>
        <AlertTitle>Warning</AlertTitle>
      </Alert>,
    );

    const alert = container.querySelector("[role='alert']");

    expect(alert).toBeInTheDocument();
  });
});
