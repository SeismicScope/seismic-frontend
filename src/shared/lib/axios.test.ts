import MockAdapter from "axios-mock-adapter";
import { describe, expect, it, vi } from "vitest";

import { api } from "./axios";

describe("axios interceptor", () => {
  it("logs on 401", async () => {
    const mock = new MockAdapter(api);
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mock.onGet("/test").reply(401);

    await expect(api.get("/test")).rejects.toBeTruthy();

    expect(consoleSpy).toHaveBeenCalledWith("Unauthorized");

    consoleSpy.mockRestore();
    mock.restore();
  });

  it("does not log on other status codes", async () => {
    const mock = new MockAdapter(api);
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    mock.onGet("/test").reply(500);

    await expect(api.get("/test")).rejects.toBeTruthy();

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
    mock.restore();
  });
});
