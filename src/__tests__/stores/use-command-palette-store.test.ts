import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { useCommandPaletteStore } from "@/features/command-palette/store/use-command-palette-store";

describe("useCommandPaletteStore", () => {
  beforeEach(() => {
    act(() => useCommandPaletteStore.setState({ open: false }));
  });

  it("initializes with open set to false", () => {
    const { result } = renderHook(() => useCommandPaletteStore());

    expect(result.current.open).toBe(false);
  });

  it("sets open to true", () => {
    const { result } = renderHook(() => useCommandPaletteStore());

    act(() => result.current.setOpen(true));

    expect(result.current.open).toBe(true);
  });

  it("sets open back to false", () => {
    const { result } = renderHook(() => useCommandPaletteStore());

    act(() => result.current.setOpen(true));
    act(() => result.current.setOpen(false));

    expect(result.current.open).toBe(false);
  });

  it("shares state across multiple hook instances", () => {
    const { result: a } = renderHook(() => useCommandPaletteStore());
    const { result: b } = renderHook(() => useCommandPaletteStore());

    act(() => a.current.setOpen(true));

    expect(b.current.open).toBe(true);
  });
});
