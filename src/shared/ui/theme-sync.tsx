"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

import { useBroadcastChannel } from "@/shared/hooks/use-broadcast-channel";

import { COLOR_THEME_VALUES } from "../constants";
import { useColorTheme } from "../providers/theme-provider";

type ThemePayload = {
  theme: string;
  colorTheme: string;
};

export function ThemeSync() {
  const { theme, setTheme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();
  const isReceiving = useRef(false);

  function handleMessage(data: ThemePayload) {
    isReceiving.current = true;
    setTheme(data.theme);
    if (
      COLOR_THEME_VALUES.includes(
        data.colorTheme as (typeof COLOR_THEME_VALUES)[number],
      )
    ) {
      setColorTheme(data.colorTheme as (typeof COLOR_THEME_VALUES)[number]);
    }
    setTimeout(() => {
      isReceiving.current = false;
    }, 0);
  }

  const { postMessage } = useBroadcastChannel<ThemePayload>(
    "seismic-theme",
    handleMessage,
  );

  useEffect(() => {
    if (!isReceiving.current && theme) {
      postMessage({ theme, colorTheme: colorTheme ?? "teal" });
    }
  }, [theme, colorTheme]);

  return null;
}
