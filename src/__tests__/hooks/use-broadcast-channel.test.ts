import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockPostMessage = vi.fn();
const mockClose = vi.fn();

class MockBroadcastChannel {
  onmessage: ((this: BroadcastChannel, ev: MessageEvent) => unknown) | null =
    null;
  onmessageerror:
    | ((this: BroadcastChannel, ev: MessageEvent) => unknown)
    | null = null;
  name: string;

  constructor(name: string) {
    this.name = name;
    MockBroadcastChannel.instances.push(this);
  }

  postMessage = mockPostMessage;
  close = mockClose;
  addEventListener = vi.fn();
  removeEventListener = vi.fn();
  dispatchEvent = vi.fn(() => true);

  static instances: MockBroadcastChannel[] = [];
  static reset() {
    MockBroadcastChannel.instances = [];
  }
}

Object.defineProperty(globalThis, "BroadcastChannel", {
  value: MockBroadcastChannel,
  writable: true,
});

import { useBroadcastChannel } from "@/shared/hooks/use-broadcast-channel";

describe("useBroadcastChannel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    MockBroadcastChannel.reset();
  });

  it("creates a BroadcastChannel with the given name", () => {
    renderHook(() => useBroadcastChannel("test-channel", vi.fn()));
    expect(MockBroadcastChannel.instances).toHaveLength(1);

    const instance = MockBroadcastChannel.instances[0];
    expect(instance).toBeDefined();
    expect(instance!.name).toBe("test-channel");
  });

  it("calls onMessage when message is received", () => {
    const onMessage = vi.fn();
    renderHook(() => useBroadcastChannel("test", onMessage));

    const channel = MockBroadcastChannel.instances[0];
    expect(channel).toBeDefined();

    act(() => {
      channel!.onmessage?.call(
        channel as unknown as BroadcastChannel,
        new MessageEvent("message", { data: { theme: "dark" } }),
      );
    });

    expect(onMessage).toHaveBeenCalledWith({ theme: "dark" });
  });

  it("provides postMessage function", () => {
    const { result } = renderHook(() => useBroadcastChannel("test", vi.fn()));
    act(() => {
      result.current.postMessage({ value: 42 });
    });
    expect(mockPostMessage).toHaveBeenCalledWith({ value: 42 });
  });

  it("closes channel on unmount", () => {
    const { unmount } = renderHook(() => useBroadcastChannel("test", vi.fn()));
    unmount();
    expect(mockClose).toHaveBeenCalled();
  });

  it("uses callback ref pattern - does not recreate channel when callback changes", () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();

    const { rerender } = renderHook(
      ({ cb }) => useBroadcastChannel("test", cb),
      { initialProps: { cb: callback1 } },
    );

    expect(MockBroadcastChannel.instances).toHaveLength(1);

    rerender({ cb: callback2 });

    // Should NOT create a new channel - still 1 instance
    expect(MockBroadcastChannel.instances).toHaveLength(1);

    // New callback should be used for messages
    const channel = MockBroadcastChannel.instances[0];
    expect(channel).toBeDefined();

    act(() => {
      channel!.onmessage?.call(
        channel as unknown as BroadcastChannel,
        new MessageEvent("message", { data: "test" }),
      );
    });
    expect(callback2).toHaveBeenCalledWith("test");
    expect(callback1).not.toHaveBeenCalled();
  });
});
