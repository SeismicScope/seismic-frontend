"use client";

import { useEffect, useRef } from "react";

export function useBroadcastChannel<T>(
  channelName: string,
  onMessage: (data: T) => void,
) {
  const channelRef = useRef<BroadcastChannel | null>(null);
  const callbackRef = useRef(onMessage);

  useEffect(() => {
    callbackRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    const channel = new BroadcastChannel(channelName);
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<T>) => {
      callbackRef.current(event.data);
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [channelName]);

  function postMessage(data: T) {
    channelRef.current?.postMessage(data);
  }

  return { postMessage };
}
