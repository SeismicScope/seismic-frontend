/**
 * Accessibility audit tests using axe-core
 *
 * These tests verify WCAG 2.1 AA compliance for critical UI components.
 */
import { render } from "@testing-library/react";
import type { AxeResults } from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { axe } from "vitest-axe";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme: vi.fn(),
    resolvedTheme: "light",
    theme: "light",
  }),
}));

vi.mock("@/shared/providers/theme-provider", () => ({
  useColorTheme: () => ({
    colorTheme: "teal",
    setColorTheme: vi.fn(),
  }),
}));

import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import ThemeSwitcher from "@/shared/ui/theme-switcher";

function expectNoViolations(results: AxeResults) {
  expect(results.violations).toEqual([]);
}

describe("Accessibility Audit (axe-core)", () => {
  it("Button — has no a11y violations", async () => {
    const { container } = render(
      <main>
        <Button>Click me</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </main>,
    );
    const results = await axe(container);
    expectNoViolations(results);
  });

  it("Alert — has no a11y violations", async () => {
    const { container } = render(
      <main>
        <Alert>
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>This is an informational alert</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong</AlertDescription>
        </Alert>
      </main>,
    );
    const results = await axe(container);
    expectNoViolations(results);
  });

  it("Card — has no a11y violations", async () => {
    const { container } = render(
      <main>
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
          <CardContent>Card content here</CardContent>
        </Card>
      </main>,
    );
    const results = await axe(container);
    expectNoViolations(results);
  });

  it("ThemeSwitcher — has no a11y violations", async () => {
    const { container } = render(
      <main>
        <ThemeSwitcher />
      </main>,
    );
    const results = await axe(container);
    expectNoViolations(results);
  });

  it("KPI Stats layout — has no a11y violations", async () => {
    const { container } = render(
      <main>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total events</CardTitle>
            </CardHeader>
            <CardContent>800,000</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Max magnitude</CardTitle>
            </CardHeader>
            <CardContent>9.1</CardContent>
          </Card>
        </div>
      </main>,
    );
    const results = await axe(container);
    expectNoViolations(results);
  });

  it("Form elements — buttons have accessible names", async () => {
    const { container } = render(
      <main>
        <Button aria-label="Close dialog">X</Button>
        <Button aria-label="Share link">Share</Button>
        <button type="button" aria-label="Toggle theme">
          Toggle
        </button>
      </main>,
    );
    const results = await axe(container);
    expectNoViolations(results);
  });

  it("Navigation structure — has no a11y violations", async () => {
    const { container } = render(
      <nav aria-label="Main navigation">
        <ul>
          <li>
            <Link href="/en/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/en/analytics">Analytics</Link>
          </li>
          <li>
            <Link href="/en/map">Map</Link>
          </li>
        </ul>
      </nav>,
    );
    const results = await axe(container);
    expectNoViolations(results);
  });
});
