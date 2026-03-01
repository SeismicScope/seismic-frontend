"use client";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

import { useCommandPaletteStore } from "../store/use-command-palette-store";

export default function CommandPaletteTrigger() {
  const t = useTranslations();
  const { open, setOpen } = useCommandPaletteStore();

  return (
    <button
      onClick={() => setOpen(!open)}
      className="text-muted-foreground flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm"
    >
      <Search className="size-3.5" />
      <span>{t("general.search")}</span>
      <kbd className="bg-muted ml-2 rounded px-1.5 py-0.5 text-xs">⌘K</kbd>
    </button>
  );
}
