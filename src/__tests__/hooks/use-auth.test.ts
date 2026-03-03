import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { createWrapper } from "@/test-utils/create-wrapper";

const mockMe = vi.fn();
const mockLogin = vi.fn();
const mockLogout = vi.fn();

vi.mock("@/features/auth/api", () => ({
  me: () => mockMe(),
  login: (creds: { username: string; password: string }) => mockLogin(creds),
  logout: () => mockLogout(),
}));

import { useAuth } from "@/features/auth/hooks/use-auth";

describe("useAuth", () => {
  it("returns isLoading true while fetching user", () => {
    mockMe.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.user).toBeUndefined();
  });

  it("returns user data after successful fetch", async () => {
    const user = { id: 1, username: "admin" };
    mockMe.mockResolvedValue(user);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.user).toEqual(user);
    expect(result.current.isError).toBe(false);
  });

  it("sets isError when me endpoint fails", async () => {
    mockMe.mockRejectedValue(new Error("Unauthorized"));

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isError).toBe(true);
    expect(result.current.user).toBeUndefined();
  });

  it("exposes login function", () => {
    mockMe.mockResolvedValue(null);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    expect(typeof result.current.login).toBe("function");
  });

  it("exposes logout function", () => {
    mockMe.mockResolvedValue(null);

    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    expect(typeof result.current.logout).toBe("function");
  });
});
