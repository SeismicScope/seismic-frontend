import { fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockSetFilters = vi.fn();
const mockResetFilters = vi.fn();

vi.mock("@/entities/filter/hooks/use-filters", () => ({
  useFilters: () => ({
    setFilters: mockSetFilters,
    resetFilters: mockResetFilters,
  }),
}));

import { act, renderHook } from "@testing-library/react";

import { useCommandPalette } from "@/features/command-palette/hooks/use-command-palette";
import { useCommandPaletteStore } from "@/features/command-palette/store/use-command-palette-store";

describe("useCommandPalette", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    act(() => useCommandPaletteStore.setState({ open: false }));
  });

  it("returns open as false initially", () => {
    const { result } = renderHook(() => useCommandPalette());

    expect(result.current.open).toBe(false);
  });

  it("toggles open state with setOpen", () => {
    const { result } = renderHook(() => useCommandPalette());

    act(() => result.current.setOpen(true));

    expect(result.current.open).toBe(true);
  });

  it("navigates and closes palette on handleNavigate", () => {
    const { result } = renderHook(() => useCommandPalette());

    act(() => result.current.setOpen(true));
    act(() => result.current.handleNavigate("/dashboard"));

    expect(mockPush).toHaveBeenCalledWith("/dashboard");
    expect(result.current.open).toBe(false);
  });

  it("sets filters and closes palette on handleFilter with object", () => {
    const { result } = renderHook(() => useCommandPalette());

    act(() => result.current.setOpen(true));
    act(() => result.current.handleFilter(() => ({ minMag: 5 })));

    expect(mockSetFilters).toHaveBeenCalledWith({ minMag: 5 });
    expect(result.current.open).toBe(false);
  });

  it("resets filters when action returns null", () => {
    const { result } = renderHook(() => useCommandPalette());

    act(() => result.current.handleFilter(() => null));

    expect(mockResetFilters).toHaveBeenCalled();
  });

  it("toggles open on Cmd+K keydown", () => {
    renderHook(() => useCommandPalette());

    act(() => {
      fireEvent.keyDown(document, { key: "k", metaKey: true });
    });

    expect(useCommandPaletteStore.getState().open).toBe(true);
  });

  it("toggles open on Ctrl+K keydown", () => {
    renderHook(() => useCommandPalette());

    act(() => {
      fireEvent.keyDown(document, { key: "k", ctrlKey: true });
    });

    expect(useCommandPaletteStore.getState().open).toBe(true);
  });

  it("does not toggle on regular K keypress", () => {
    renderHook(() => useCommandPalette());

    act(() => {
      fireEvent.keyDown(document, { key: "k" });
    });

    expect(useCommandPaletteStore.getState().open).toBe(false);
  });
});
