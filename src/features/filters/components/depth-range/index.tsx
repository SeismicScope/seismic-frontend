"use client";
import { useState } from "react";

import { useDebouncedCallback } from "@/shared/hooks/use-debounce";
import { Input } from "@/shared/ui/input";

import { useFilters } from "../../hooks/use-filters";

const DEBOUNCE_DELAY = 500;

function DepthRange() {
  const { filters, setField } = useFilters();
  const [localMin, setLocalMin] = useState<number | null>(null);
  const [localMax, setLocalMax] = useState<number | null>(null);
  const [editingMin, setEditingMin] = useState(false);
  const [editingMax, setEditingMax] = useState(false);

  const syncMin = useDebouncedCallback((value: number | null) => {
    setField("minDepth", value);
    setEditingMin(false);
  }, DEBOUNCE_DELAY);

  const syncMax = useDebouncedCallback((value: number | null) => {
    setField("maxDepth", value);
    setEditingMax(false);
  }, DEBOUNCE_DELAY);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <p className="font-semibold">Min</p>
        <Input
          type="number"
          placeholder="Depth"
          className="max-w-24"
          value={(editingMin ? localMin : filters.minDepth) ?? ""}
          onChange={(e) => {
            const value = e.target.value ? Number(e.target.value) : null;
            setLocalMin(value);
            setEditingMin(true);
            syncMin(value);
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <p className="font-semibold">Max</p>
        <Input
          type="number"
          placeholder="Depth"
          className="max-w-24"
          value={(editingMax ? localMax : filters.maxDepth) ?? ""}
          onChange={(e) => {
            const value = e.target.value ? Number(e.target.value) : null;
            setLocalMax(value);
            setEditingMax(true);
            syncMax(value);
          }}
        />
      </div>
    </div>
  );
}

export default DepthRange;
