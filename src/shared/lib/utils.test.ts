import { AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";
import { describe, expect, it } from "vitest";

import { api } from "@/shared/lib/axios";
import { getApiErrorMessage } from "@/shared/lib/get-api-error-message";

import { cn, formatDate, formatNumber } from "./utils";

const mock = new MockAdapter(api);

mock.onGet("/test").reply(400, {
  message: "Backend error",
});

describe("cn", () => {
  it("merges tailwind classes correctly", () => {
    const result = cn("p-2", "p-4");
    expect(result).toBe("p-4");
  });
});

describe("formatNumber", () => {
  it("formats number with de-DE locale", () => {
    expect(formatNumber(1000000)).toBe("1.000.000");
  });
});

describe("getErrorMessage", () => {
  it("returns string error directly", () => {
    expect(getApiErrorMessage("Error")).toBe("Error");
  });

  it("handles AxiosError with response message", () => {
    const error = new AxiosError("Request failed");

    Object.defineProperty(error, "response", {
      value: {
        data: { message: "Backend error" },
      },
    });

    expect(getApiErrorMessage(error)).toBe("Backend error");
  });

  it("handles AxiosError without response message", () => {
    const error = new AxiosError("Network error");

    expect(getApiErrorMessage(error)).toBe("Network error");
  });

  it("handles generic Error", () => {
    expect(getApiErrorMessage(new Error("Boom"))).toBe("Boom");
  });

  it("fallbacks to default message", () => {
    expect(getApiErrorMessage({})).toBe("Unexpected error");
  });
});

describe("formatDate", () => {
  it("formats date correctly", () => {
    const date = new Date("2024-01-01T10:00:00Z");
    const result = formatDate(date);

    expect(result).toContain("2024");
  });
});
