import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      "general.share": "Share",
      "general.shareLink": "Share link",
      "general.copy": "Copy",
      "general.orScanQRCode": "OR Scan QR Code",
      "general.generating": "Generating...",
    };

    return translations[key] ?? key;
  },
}));

vi.mock("@/features/share-link/hooks/use-short-url", () => ({
  useShortUrl: () => ({
    data: { shortUrl: "https://short.url/abc" },
    isLoading: false,
  }),
}));

vi.mock("@/features/share-link/hooks/use-short-url-qr", () => ({
  useShortUrlQr: () => ({
    data: { qr: "data:image/png;base64,abc123" },
    isLoading: false,
  }),
}));

import { ShareLinkDialog } from "@/features/share-link/components/share-link-dialog";

describe("ShareLinkDialog", () => {
  it("renders share button trigger", () => {
    render(<ShareLinkDialog />);
    expect(screen.getByRole("button", { name: /share/i })).toBeInTheDocument();
  });

  it("opens dialog on button click", async () => {
    const user = userEvent.setup();
    render(<ShareLinkDialog />);
    await user.click(screen.getByRole("button", { name: /share/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("shows share title in dialog header", async () => {
    const user = userEvent.setup();
    render(<ShareLinkDialog />);
    await user.click(screen.getByRole("button", { name: /share/i }));
    expect(screen.getByText("Share")).toBeInTheDocument();
  });
});
