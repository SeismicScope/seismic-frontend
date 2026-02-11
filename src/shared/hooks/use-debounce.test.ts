import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useDebounce, useDebouncedCallback } from "./use-debounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("hello", 300));

    expect(result.current).toBe("hello");
  });

  it("updates value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } },
    );

    rerender({ value: "b" });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("b");
  });

  it("updates using custom delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 500 } },
    );

    rerender({ value: "b", delay: 500 });

    act(() => {
      vi.advanceTimersByTime(499);
    });

    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe("b");
  });

  it("clears timeout on unmount", () => {
    const { result, rerender, unmount } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } },
    );

    rerender({ value: "b" });

    unmount();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("a");
  });
});

describe("useDebouncedCallback", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls callback after delay", () => {
    const fn = vi.fn();

    const { result } = renderHook(() => useDebouncedCallback(fn, 300));

    act(() => {
      result.current("test");
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(fn).toHaveBeenCalledWith("test");
  });

  it("debounces rapid calls", () => {
    const fn = vi.fn();

    const { result } = renderHook(() => useDebouncedCallback(fn, 300));

    act(() => {
      result.current("a");
      result.current("b");
      result.current("c");
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("c");
  });

  it("uses latest callback reference", () => {
    const first = vi.fn();
    const second = vi.fn();

    const { result, rerender } = renderHook(
      ({ cb }) => useDebouncedCallback(cb, 300),
      { initialProps: { cb: first } },
    );

    rerender({ cb: second });

    act(() => {
      result.current("value");
      vi.advanceTimersByTime(300);
    });

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledWith("value");
  });

  it("clears timeout on unmount", () => {
    const fn = vi.fn();

    const { result, unmount } = renderHook(() => useDebouncedCallback(fn, 300));

    act(() => {
      result.current("test");
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(fn).not.toHaveBeenCalled();
  });
});
