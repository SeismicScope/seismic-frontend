import { useState } from "react";
import { toast } from "sonner";

import { useFilters } from "@/features/filters/hooks/use-filters";
import { useDebouncedCallback } from "@/shared/hooks/use-debounce";

const DEBOUNCE_DELAY = 500;

export function useDepthRange() {
  const { filters, setField } = useFilters();
  const [localMin, setLocalMin] = useState<number | null>(null);
  const [localMax, setLocalMax] = useState<number | null>(null);
  const [editingMin, setEditingMin] = useState(false);
  const [editingMax, setEditingMax] = useState(false);

  function validate(min: number | null, max: number | null): boolean {
    if (min !== null && max !== null && min > max) {
      toast.error("Min must be less than Max");

      return false;
    }

    return true;
  }

  const syncMin = useDebouncedCallback((value: number | null) => {
    const currentMax = editingMax ? localMax : filters.maxDepth;

    if (validate(value, currentMax ?? null)) {
      setField("minDepth", value);
    }

    setEditingMin(false);
  }, DEBOUNCE_DELAY);

  const syncMax = useDebouncedCallback((value: number | null) => {
    const currentMin = editingMin ? localMin : filters.minDepth;

    if (validate(currentMin ?? null, value)) {
      setField("maxDepth", value);
    }

    setEditingMax(false);
  }, DEBOUNCE_DELAY);

  return {
    editingMin,
    localMin,
    filters,
    setLocalMin,
    setEditingMin,
    syncMin,
    syncMax,
    editingMax,
    localMax,
    setLocalMax,
    setEditingMax,
  };
}
