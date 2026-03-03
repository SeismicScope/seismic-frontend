import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import CookieBanner from "@/shared/components/cookie-banner";

const mockGetItem = vi.fn();
const mockSetItem = vi.fn();

Object.defineProperty(window, "localStorage", {
  value: { getItem: mockGetItem, setItem: mockSetItem },
  writable: true,
});

describe("CookieBanner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders when consent is not acknowledged", () => {
    mockGetItem.mockReturnValue(null);
    render(<CookieBanner />);
    expect(screen.getByText(/we use cookies/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /got it/i })).toBeInTheDocument();
  });

  it("does not render when consent is already acknowledged", () => {
    mockGetItem.mockReturnValue("acknowledged");
    const { container } = render(<CookieBanner />);
    expect(container.firstChild).toBeNull();
  });

  it("hides banner and saves consent on acknowledge", async () => {
    const user = userEvent.setup();
    mockGetItem.mockReturnValue(null);
    render(<CookieBanner />);

    await user.click(screen.getByRole("button", { name: /got it/i }));

    expect(mockSetItem).toHaveBeenCalledWith(
      expect.any(String),
      "acknowledged",
    );
    expect(screen.queryByText(/we use cookies/i)).not.toBeInTheDocument();
  });
});
