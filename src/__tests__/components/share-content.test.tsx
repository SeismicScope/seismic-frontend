import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      "general.shareLink": "Share link",
      "general.copy": "Copy",
      "general.orScanQRCode": "OR Scan QR Code",
      "general.generating": "Generating...",
    };

    return translations[key] ?? key;
  },
}));

vi.mock("@/shared/hooks/use-copy-to-clipboard", () => ({
  useCopyToClipboard: () => ({
    copyToClipboard: vi.fn(),
  }),
}));

vi.mock("@/features/share-link/hooks/use-short-url", () => ({
  useShortUrl: () => ({
    data: { code: "abc123" },
    isLoading: false,
  }),
}));

vi.mock("@/features/share-link/hooks/use-short-url-qr", () => ({
  useShortUrlQR: () => ({
    data: { qr: "data:image/png;base64,test" },
    isLoading: false,
  }),
}));

vi.mock("next/image", () => ({
  default: (props: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) => (
    <Image
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
    />
  ),
}));

import Image from "next/image";

import ShareContent from "@/features/share-link/components/share-content";

describe("ShareContent", () => {
  it("renders share link label", () => {
    render(<ShareContent />);

    expect(screen.getByText("Share link")).toBeInTheDocument();
  });

  it("renders copy button", () => {
    render(<ShareContent />);

    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
  });

  it("renders QR code label", () => {
    render(<ShareContent />);

    expect(screen.getByText("OR Scan QR Code")).toBeInTheDocument();
  });

  it("renders QR code image when available", () => {
    render(<ShareContent />);

    const img = screen.getByAltText("QR Code");

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "data:image/png;base64,test");
  });

  it("renders readonly input with short URL", () => {
    render(<ShareContent />);

    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("readonly");
  });
});
