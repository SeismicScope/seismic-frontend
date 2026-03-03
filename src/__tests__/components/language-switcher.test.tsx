import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => "/en/dashboard",
}));

import LanguageSwitcher from "@/shared/ui/language-switcher";

describe("LanguageSwitcher", () => {
  it("renders language button with flag", () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole("button", { name: /change language/i });
    expect(button).toBeInTheDocument();
  });

  it("opens popover with language options on click", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    await user.click(screen.getByRole("button", { name: /change language/i }));
    const listbox = screen.getByRole("listbox", { name: /language/i });
    expect(listbox).toBeInTheDocument();
  });

  it("renders all available locale options", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    await user.click(screen.getByRole("button", { name: /change language/i }));
    const options = screen.getAllByRole("option");
    expect(options.length).toBe(3);
  });

  it("marks current locale as selected", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    await user.click(screen.getByRole("button", { name: /change language/i }));
    const enOption = screen.getByRole("option", { name: /english/i });
    expect(enOption).toHaveAttribute("aria-selected", "true");
  });

  it("navigates to selected locale", async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);
    await user.click(screen.getByRole("button", { name: /change language/i }));
    const deOption = screen.getByRole("option", { name: /deutsch/i });
    await user.click(deOption);
    expect(mockPush).toHaveBeenCalledWith("/de/dashboard");
  });
});
