import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FieldError } from "@/shared/ui/field";

describe("FieldError", () => {
  it("renders nothing when no errors and no children", () => {
    const { container } = render(<FieldError />);

    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when errors array is empty", () => {
    const { container } = render(<FieldError errors={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it("renders single error message", () => {
    render(<FieldError errors={[{ message: "Required field" }]} />);

    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("renders multiple errors as a list", () => {
    render(
      <FieldError
        errors={[{ message: "Too short" }, { message: "Must contain numbers" }]}
      />,
    );

    expect(screen.getByText("Too short")).toBeInTheDocument();
    expect(screen.getByText("Must contain numbers")).toBeInTheDocument();
  });

  it("deduplicates errors with same message", () => {
    render(
      <FieldError
        errors={[
          { message: "Required" },
          { message: "Required" },
          { message: "Too short" },
        ]}
      />,
    );

    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(2);
  });

  it("renders children when provided instead of errors", () => {
    render(
      <FieldError errors={[{ message: "ignored" }]}>Custom error</FieldError>,
    );

    expect(screen.getByText("Custom error")).toBeInTheDocument();
    expect(screen.queryByText("ignored")).not.toBeInTheDocument();
  });

  it("has role alert for accessibility", () => {
    render(<FieldError errors={[{ message: "Error" }]} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("has data-slot field-error", () => {
    render(<FieldError errors={[{ message: "Error" }]} />);

    expect(screen.getByRole("alert")).toHaveAttribute(
      "data-slot",
      "field-error",
    );
  });

  it("filters out undefined errors", () => {
    render(<FieldError errors={[undefined, { message: "Valid error" }]} />);

    expect(screen.getByText("Valid error")).toBeInTheDocument();
  });
});
