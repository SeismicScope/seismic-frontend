import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "@/shared/ui/input";

describe("Input", () => {
  it("renders with data-slot attribute", () => {
    render(<Input data-testid="input" />);

    expect(screen.getByTestId("input")).toHaveAttribute("data-slot", "input");
  });

  it("renders with specified type", () => {
    render(<Input type="email" data-testid="input" />);

    expect(screen.getByTestId("input")).toHaveAttribute("type", "email");
  });

  it("applies custom className", () => {
    render(<Input className="custom" data-testid="input" />);

    expect(screen.getByTestId("input")).toHaveClass("custom");
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input data-testid="input" />);

    const input = screen.getByTestId("input");
    await user.type(input, "hello world");

    expect(input).toHaveValue("hello world");
  });

  it("renders as disabled", () => {
    render(<Input disabled data-testid="input" />);

    expect(screen.getByTestId("input")).toBeDisabled();
  });

  it("shows placeholder text", () => {
    render(<Input placeholder="Enter value..." />);

    expect(screen.getByPlaceholderText("Enter value...")).toBeInTheDocument();
  });

  it("calls onChange handler", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input onChange={onChange} data-testid="input" />);

    await user.type(screen.getByTestId("input"), "a");

    expect(onChange).toHaveBeenCalled();
  });

  it("renders as readonly", () => {
    render(<Input readOnly value="readonly" data-testid="input" />);

    expect(screen.getByTestId("input")).toHaveAttribute("readonly");
  });

  it("supports aria-invalid for error states", () => {
    render(<Input aria-invalid="true" data-testid="input" />);

    expect(screen.getByTestId("input")).toHaveAttribute("aria-invalid", "true");
  });
});
