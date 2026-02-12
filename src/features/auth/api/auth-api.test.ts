import { beforeEach, describe, expect, it, vi } from "vitest";

import { api } from "@/shared/lib/axios";

import { login, logout, me } from "./index";

vi.mock("@/shared/lib/axios", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const mockedGet = vi.mocked(api.get);
const mockedPost = vi.mocked(api.post);

describe("auth api", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls login and returns user data", async () => {
    const mockData = { id: 1, email: "test@example.com", accessToken: "token" };

    mockedPost.mockResolvedValue({ data: mockData });

    const result = await login();

    expect(api.post).toHaveBeenCalledWith("/auth/login");
    expect(result).toEqual(mockData);
  });

  it("calls logout and returns success message", async () => {
    const mockData = { success: true };

    mockedPost.mockResolvedValue({ data: mockData });

    const result = await logout();

    expect(api.post).toHaveBeenCalledWith("/auth/logout");
    expect(result).toEqual(mockData);
  });

  it("calls me and returns current user profile", async () => {
    const mockData = { id: 1, email: "test@example.com" };

    mockedGet.mockResolvedValue({ data: mockData });

    const result = await me();

    expect(api.get).toHaveBeenCalledWith("/auth/me");
    expect(result).toEqual(mockData);
  });
});
