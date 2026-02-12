import { ThemeProvider as ThemeProviderNext } from "next-themes";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProviderNext attribute="data-theme">{children}</ThemeProviderNext>
  );
};
