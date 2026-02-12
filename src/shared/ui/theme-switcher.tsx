"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import type { ColorTheme } from "../constants";
import { COLOR_THEME_META, COLOR_THEME_VALUES } from "../constants";
import { useColorTheme } from "../providers/theme-provider";
import { Button } from "./button";

const subscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const { colorTheme, setColorTheme } = useColorTheme();
  const mounted = useMounted();

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="size-9"
      >
        {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </Button>

      <div
        className="flex items-center gap-1"
        role="radiogroup"
        aria-label="Accent color"
      >
        {COLOR_THEME_VALUES.map((theme) => {
          const meta = COLOR_THEME_META[theme as ColorTheme];
          const isActive = colorTheme === theme;

          return (
            <button
              key={theme}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`${meta.label} accent color`}
              onClick={() => setColorTheme(theme as ColorTheme)}
              className="focus-visible:outline-ring flex size-7 items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <span
                className="block rounded-full transition-all"
                style={{
                  backgroundColor: meta.color,
                  width: isActive ? 20 : 14,
                  height: isActive ? 20 : 14,
                  boxShadow: isActive
                    ? `0 0 0 2px var(--background), 0 0 0 4px ${meta.color}`
                    : "none",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ThemeSwitcher;
