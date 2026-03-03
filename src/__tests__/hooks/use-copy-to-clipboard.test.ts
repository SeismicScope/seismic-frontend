import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockWriteText = vi.fn().mockResolvedValue(undefined);

Object.defineProperty(navigator, "clipboard", {
  value: { writeText: mockWriteText },
  writable: true,
});

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

import { toast } from "sonner";

import { useCopyToClipboard } from "@/shared/hooks/use-copy-to-clipboard";

describe("useCopyToClipboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("copies text to clipboard", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      result.current.copyToClipboard("Hello world");
    });

    expect(mockWriteText).toHaveBeenCalledWith("Hello world");
  });

  it("shows success toast after copying", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      result.current.copyToClipboard("test text");
    });

    expect(toast.success).toHaveBeenCalledWith("Copied to clipboard");
  });

  it("does not copy empty string", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    await act(async () => {
      result.current.copyToClipboard("");
    });

    expect(mockWriteText).not.toHaveBeenCalled();
  });
});
