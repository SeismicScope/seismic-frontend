"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { COLOR_THEME, type ColorTheme } from "../constants";

interface ColorThemeContextValue {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "seismic-color-theme";

function getInitialTheme(): ColorTheme {
  if (typeof window === "undefined") return COLOR_THEME.TEAL;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && (Object.values(COLOR_THEME) as string[]).includes(stored)) {
    return stored as ColorTheme;
  }

  return COLOR_THEME.TEAL;
}

export function ColorThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colorTheme, setColorThemeState] =
    useState<ColorTheme>(getInitialTheme);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", colorTheme);
    localStorage.setItem(STORAGE_KEY, colorTheme);
  }, [colorTheme]);

  const setColorTheme = useCallback((theme: ColorTheme) => {
    setColorThemeState(theme);
  }, []);

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
}

export function useColorTheme(): ColorThemeContextValue {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }

  return context;
}
