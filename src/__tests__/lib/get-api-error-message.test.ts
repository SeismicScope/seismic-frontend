import { AxiosError } from "axios";
import { describe, expect, it } from "vitest";

import { getApiErrorMessage } from "@/shared/lib/get-api-error-message";

describe("getApiErrorMessage", () => {
  it("extracts message from AxiosError response data", () => {
    const error = new AxiosError("Request failed");
    error.response = {
      data: { message: "User not found" },
      status: 404,
      statusText: "Not Found",
      headers: {},
      config: {} as never,
    };
    expect(getApiErrorMessage(error)).toBe("User not found");
  });

  it("falls back to AxiosError.message when no response data", () => {
    const error = new AxiosError("Network Error");
    expect(getApiErrorMessage(error)).toBe("Network Error");
  });

  it("extracts message from standard Error", () => {
    const error = new Error("Something broke");
    expect(getApiErrorMessage(error)).toBe("Something broke");
  });

  it("returns the string itself if a string is passed", () => {
    expect(getApiErrorMessage("string error")).toBe("string error");
  });

  it("returns fallback for null/undefined", () => {
    expect(getApiErrorMessage(null)).toBe("Unknown error");
    expect(getApiErrorMessage(undefined)).toBe("Unknown error");
  });
});
