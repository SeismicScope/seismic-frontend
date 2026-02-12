"use client";
import { useTheme } from "next-themes";

import { THEMES_VALUES } from "../constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";

function ThemeSwitcher() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setTheme } = useTheme();

  return (
    <Select>
      <SelectTrigger
        className="w-full max-w-48"
        onClick={(value) => console.log(value)}
      >
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Themes</SelectLabel>
          {THEMES_VALUES.map((theme) => (
            <SelectItem key={theme} value={theme}>
              {theme}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ThemeSwitcher;
