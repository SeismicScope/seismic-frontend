import { describe, expect, it, vi } from "vitest";

vi.mock("@/shared/lib/axios", () => ({
  api: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

import { api } from "@/shared/lib/axios";

import { generateShortURL, getShortLinkQRCode } from "./index";

describe("generateShortURL", () => {
  it("posts url to /shortener/generate", async () => {
    const mockResponse = {
      id: 1,
      code: "abc123",
      url: "https://example.com",
      clicks: 0,
      expiresAt: "2024-04-01T00:00:00Z",
      createdAt: "2024-03-01T00:00:00Z",
    };
    vi.mocked(api.post).mockResolvedValue({ data: mockResponse });

    const result = await generateShortURL("https://example.com");

    expect(api.post).toHaveBeenCalledWith("/shortener/generate", {
      url: "https://example.com",
    });
    expect(result).toEqual(mockResponse);
  });
});

describe("getShortLinkQRCode", () => {
  it("fetches QR code for the given code", async () => {
    const mockResponse = { qr: "data:image/png;base64,abc" };
    vi.mocked(api.get).mockResolvedValue({ data: mockResponse });

    const result = await getShortLinkQRCode("abc123");

    expect(api.get).toHaveBeenCalledWith("/shortener/qr/abc123");
    expect(result).toEqual(mockResponse);
  });
});
