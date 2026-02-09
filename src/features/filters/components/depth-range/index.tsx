"use client";
import { useState } from "react";

import { useDebouncedCallback } from "@/shared/hooks/use-debounce";
import { Input } from "@/shared/ui/input";

import { useFilters } from "../../hooks/use-filters";

const DEBOUNCE_DELAY = 500;

function DepthRange() {
  const { filters, setField } = useFilters();
  const [min, setMin] = useState(filters.minDepth);
  const [max, setMax] = useState(filters.maxDepth);

  const syncMin = useDebouncedCallback(
    (value: number | null) => setField("minDepth", value),
    DEBOUNCE_DELAY,
  );

  const syncMax = useDebouncedCallback(
    (value: number | null) => setField("maxDepth", value),
    DEBOUNCE_DELAY,
  );

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <p className="font-semibold">Min</p>
        <Input
          type="number"
          placeholder="Depth"
          className="max-w-24"
          value={min ?? ""}
          onChange={(e) => {
            const value = e.target.value ? Number(e.target.value) : null;
            setMin(value);
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
          value={max ?? ""}
          onChange={(e) => {
            const value = e.target.value ? Number(e.target.value) : null;
            setMax(value);
            syncMax(value);
          }}
        />
      </div>
    </div>
  );
}

export default DepthRange;
