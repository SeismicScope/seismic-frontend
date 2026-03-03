"use client";
import { useTranslations } from "next-intl";

import { useFilters } from "@/entities/filter/hooks/use-filters";
import Filters from "@/features/filters/components/filters";
import { Button } from "@/shared/ui/button";

function DashbardFilters() {
  const t = useTranslations();
  const { hasActiveFilters, resetFilters } = useFilters();

  return (
    <div className="w-full lg:w-3/4">
      <div className="flex items-center gap-3">
        <p className="text-lg font-bold">{t("filters.title")}</p>
        {hasActiveFilters && (
          <Button variant="destructive" size="sm" onClick={resetFilters}>
            {t("filters.reset")}
          </Button>
        )}
      </div>
      <Filters />
    </div>
  );
}

export default DashbardFilters;
