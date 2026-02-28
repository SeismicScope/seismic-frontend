"use client";

import { useEffect, useRef } from "react";

export function useBroadcastChannel<T>(
  channelName: string,
  onMessage: (data: T) => void,
) {
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    channelRef.current = new BroadcastChannel(channelName);

    channelRef.current.onmessage = (event: MessageEvent<T>) => {
      onMessage(event.data);
    };

    return () => {
      channelRef.current?.close();
    };
  }, [channelName, onMessage]);

  function postMessage(data: T) {
    channelRef.current?.postMessage(data);
  }

  return { postMessage };
}
