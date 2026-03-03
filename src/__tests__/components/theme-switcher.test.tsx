import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const mockSetTheme = vi.fn();
const mockSetColorTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({
    setTheme: mockSetTheme,
    resolvedTheme: "light",
  }),
}));

vi.mock("@/app/providers/theme-provider", () => ({
  useColorTheme: () => ({
    colorTheme: "teal",
    setColorTheme: mockSetColorTheme,
  }),
}));

import ThemeSwitcher from "@/widgets/theme/theme-switcher";

describe("ThemeSwitcher", () => {
  it("renders light/dark toggle button", () => {
    render(<ThemeSwitcher />);
    const toggle = screen.getByRole("button", {
      name: /switch to dark mode/i,
    });
    expect(toggle).toBeInTheDocument();
  });

  it("renders color theme radio group", () => {
    render(<ThemeSwitcher />);
    const radioGroup = screen.getByRole("radiogroup", {
      name: /accent color/i,
    });
    expect(radioGroup).toBeInTheDocument();
  });

  it("renders all color theme options", () => {
    render(<ThemeSwitcher />);
    const radios = screen.getAllByRole("radio");
    expect(radios.length).toBeGreaterThanOrEqual(3);
  });

  it("toggles theme on click", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);
    await user.click(
      screen.getByRole("button", { name: /switch to dark mode/i }),
    );
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("changes color theme on radio click", async () => {
    const user = userEvent.setup();
    render(<ThemeSwitcher />);
    const radios = screen.getAllByRole("radio");
    const secondRadio = radios[1];
    expect(secondRadio).toBeDefined();
    await user.click(secondRadio!);
    expect(mockSetColorTheme).toHaveBeenCalled();
  });

  it("marks current color theme as checked", () => {
    render(<ThemeSwitcher />);
    const tealRadio = screen.getByRole("radio", {
      name: /teal accent color/i,
    });
    expect(tealRadio).toHaveAttribute("aria-checked", "true");
  });
});
