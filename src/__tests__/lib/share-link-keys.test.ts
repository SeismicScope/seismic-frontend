import { describe, expect, it } from "vitest";

import { SHARE_LINK_KEYS } from "@/features/share-link/constants";

describe("SHARE_LINK_KEYS", () => {
  it("returns base key for all", () => {
    expect(SHARE_LINK_KEYS.all).toEqual(["short"]);
  });

  it("generates url key with the provided url", () => {
    const key = SHARE_LINK_KEYS.url("https://example.com/dashboard?minMag=5");

    expect(key).toContain("url");
    expect(key[key.length - 1]).toBe("https://example.com/dashboard?minMag=5");
  });

  it("generates qr key with the provided code", () => {
    const key = SHARE_LINK_KEYS.qr("abc123");

    expect(key).toContain("url-qr");
    expect(key[key.length - 1]).toBe("abc123");
  });

  it("includes base key in url key", () => {
    const key = SHARE_LINK_KEYS.url("https://example.com");

    expect(key[0]).toEqual(SHARE_LINK_KEYS.all);
  });

  it("includes base key in qr key", () => {
    const key = SHARE_LINK_KEYS.qr("code");

    expect(key[0]).toEqual(SHARE_LINK_KEYS.all);
  });

  it("produces different keys for different urls", () => {
    const key1 = SHARE_LINK_KEYS.url("https://a.com");
    const key2 = SHARE_LINK_KEYS.url("https://b.com");

    expect(key1).not.toEqual(key2);
  });
});
