import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { createWrapper } from "@/test-utils/create-wrapper";

vi.mock("@/features/share-link/api", () => ({
  getShortLinkQRCode: vi.fn(),
}));

import { getShortLinkQRCode } from "@/features/share-link/api";
import { useShortUrlQR } from "@/features/share-link/hooks/use-short-url-qr";

describe("useShortUrlQR", () => {
  it("fetches QR code when code is provided", async () => {
    const qrData = { qr: "data:image/png;base64,abc123" };
    vi.mocked(getShortLinkQRCode).mockResolvedValue(qrData);

    const { result } = renderHook(() => useShortUrlQR("abc123"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(qrData);
    expect(getShortLinkQRCode).toHaveBeenCalledWith("abc123");
  });

  it("does not fetch when code is empty", () => {
    const { result } = renderHook(() => useShortUrlQR(""), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe("idle");
  });

  it("respects enabled option", () => {
    const { result } = renderHook(
      () => useShortUrlQR("abc", { enabled: false }),
      { wrapper: createWrapper() },
    );

    expect(result.current.fetchStatus).toBe("idle");
  });

  it("is enabled when code is provided and enabled is not set", () => {
    vi.mocked(getShortLinkQRCode).mockResolvedValue({ qr: "data:..." });

    const { result } = renderHook(() => useShortUrlQR("valid-code"), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe("fetching");
  });
});
