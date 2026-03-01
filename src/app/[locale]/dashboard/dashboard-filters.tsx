"use client";
import Filters from "@/features/filters/components/filters";
import { useFilters } from "@/features/filters/hooks/use-filters";
import { Button } from "@/shared/ui/button";

function DashbardFilters() {
  const { hasActiveFilters, resetFilters } = useFilters();

  return (
    <div className="w-full lg:w-3/4">
      <div className="flex items-center gap-3">
        <p className="text-lg font-bold">Filters</p>
        {hasActiveFilters && (
          <Button variant="destructive" size="sm" onClick={resetFilters}>
            Reset
          </Button>
        )}
      </div>
      <Filters />
    </div>
  );
}

export default DashbardFilters;
