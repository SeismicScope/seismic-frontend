"use client";
import { Search } from "lucide-react";

import { useCommandPaletteStore } from "../store/use-command-palette-store";

export default function CommandPaletteTrigger() {
  const { open, setOpen } = useCommandPaletteStore();

  return (
    <button
      onClick={() => setOpen(!open)}
      className="text-muted-foreground flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm"
    >
      <Search className="size-3.5" />
      <span>Search</span>
      <kbd className="bg-muted ml-2 rounded px-1.5 py-0.5 text-xs">⌘K</kbd>
    </button>
  );
}
