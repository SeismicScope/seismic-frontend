"use client";

import { ArrowUpDownIcon, CheckIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { useFilters } from "@/features/filters/hooks/use-filters";
import { SORT_OPTIONS_META, type SortOption } from "@/shared/constants";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

export default function SortSelect() {
  const { filters, setField } = useFilters();
  const [open, setOpen] = useState(false);

  const activeLabel = filters.sort
    ? SORT_OPTIONS_META[filters.sort]
    : undefined;

  const handleSelect = useCallback(
    (value: SortOption) => {
      setField("sort", value);
      setOpen(false);
    },
    [setField],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" aria-label="Sort earthquakes">
          <ArrowUpDownIcon />
          {activeLabel ?? "Sort by..."}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-1">
        {(Object.entries(SORT_OPTIONS_META) as [SortOption, string][]).map(
          ([value, label]) => {
            const isActive = filters.sort === value;

            return (
              <button
                key={value}
                role="option"
                aria-selected={isActive}
                onClick={() => handleSelect(value)}
                className={cn(
                  "relative flex w-full cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none",
                  "hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:bg-accent focus-visible:text-accent-foreground",
                )}
              >
                {label}
                {isActive && (
                  <CheckIcon className="absolute right-2 size-3.5" />
                )}
              </button>
            );
          },
        )}
      </PopoverContent>
    </Popover>
  );
}
