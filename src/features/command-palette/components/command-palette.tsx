"use client";

import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/shared/ui/command";

import { FILTERS, PAGES } from "../constants";
import { useCommandPalette } from "../hooks/use-command-palette";

export default function CommandPalette() {
  const t = useTranslations();
  const { handleNavigate, handleFilter, open, setOpen } = useCommandPalette();

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, filters, actions..." />
      <CommandList>
        <CommandEmpty>{t("general.noResults")}</CommandEmpty>

        <CommandGroup heading="Pages">
          {PAGES.map((page) => (
            <CommandItem
              key={page.path}
              onSelect={() => handleNavigate(page.path)}
            >
              <page.icon className="mr-2 size-4" />
              {page.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Filters">
          {FILTERS.map((filter) => (
            <CommandItem
              key={filter.label}
              onSelect={() => handleFilter(filter.action)}
            >
              <SlidersHorizontal className="mr-2 size-4" />
              {filter.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
