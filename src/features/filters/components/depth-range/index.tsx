"use client";
import { Input } from "@/shared/ui/input";

import { useDepthRange } from "./use-depth-range";

function DepthRange() {
  const {
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
  } = useDepthRange();

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="font-semibold">Min</p>
          <Input
            type="number"
            placeholder="Depth"
            className="max-w-48 lg:max-w-24"
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
            className="max-w-48 lg:max-w-24"
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
    </div>
  );
}

export default DepthRange;
