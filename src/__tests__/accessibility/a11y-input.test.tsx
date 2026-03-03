import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";

import { Field, FieldError, FieldLabel } from "@/shared/ui/field";
import { Input } from "@/shared/ui/input";

describe("Input accessibility", () => {
  it("has no a11y violations when used standalone", async () => {
    const { container } = render(
      <label>
        Email
        <Input type="email" placeholder="Enter email" />
      </label>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no a11y violations with Field wrapper", async () => {
    const { container } = render(
      <Field>
        <FieldLabel htmlFor="test-input">Username</FieldLabel>
        <Input id="test-input" />
      </Field>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no a11y violations in error state", async () => {
    const { container } = render(
      <Field data-invalid="true">
        <FieldLabel htmlFor="error-input">Password</FieldLabel>
        <Input id="error-input" aria-invalid="true" />
        <FieldError errors={[{ message: "Required" }]} />
      </Field>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("has no a11y violations when disabled", async () => {
    const { container } = render(
      <label>
        Disabled field
        <Input disabled value="cannot edit" />
      </label>,
    );

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });
});
