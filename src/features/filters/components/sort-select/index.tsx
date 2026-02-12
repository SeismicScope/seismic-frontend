"use client";

import { useFilters } from "@/features/filters/hooks/use-filters";
import type { SortOption } from "@/shared/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

const SORT_LABELS: Record<SortOption, string> = {
  date_asc: "Date (oldest first)",
  date_desc: "Date (newest first)",
  magnitude_asc: "Magnitude (low to high)",
  magnitude_desc: "Magnitude (high to low)",
  depth_asc: "Depth (shallow to deep)",
  depth_desc: "Depth (deep to shallow)",
};

export default function SortSelect() {
  const { filters, setField } = useFilters();

  return (
    <Select
      value={filters.sort ?? ""}
      onValueChange={(value) => setField("sort", value as SortOption)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(SORT_LABELS).map(([value, label]) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
