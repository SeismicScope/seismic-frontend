import { render } from "@testing-library/react";
import type { AxeResults } from "axe-core";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

function expectNoViolations(results: AxeResults) {
  expect(results.violations).toEqual([]);
}

describe("Card accessibility", () => {
  it("has no a11y violations for basic card", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Total Events</CardTitle>
          <CardDescription>800,000 earthquake records</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content here</p>
        </CardContent>
      </Card>,
    );

    const results = await axe(container);

    expectNoViolations(results);
  });

  it("has no a11y violations for KPI card pattern", async () => {
    const { container } = render(
      <Card>
        <CardHeader>
          <CardTitle>Max Magnitude</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-3xl font-bold">9.1</span>
        </CardContent>
      </Card>,
    );

    const results = await axe(container);

    expectNoViolations(results);
  });
});
