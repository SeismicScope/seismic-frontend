"use client";
import { useTranslations } from "next-intl";

import { useFilters } from "@/entities/filter/hooks/use-filters";
import Filters from "@/features/filters/components/filters";
import { Button } from "@/shared/ui/button";
import { MotionDiv, SLIDE_UP } from "@/shared/ui/motion";

export function DashboardFilters() {
  const t = useTranslations();
  const { hasActiveFilters, resetFilters } = useFilters();

  return (
    <MotionDiv
      className="w-full lg:w-3/4"
      {...SLIDE_UP}
      transition={{ ...SLIDE_UP.transition, delay: 0.1 }}
    >
      <div className="flex items-center gap-3">
        <p className="text-lg font-bold">{t("filters.title")}</p>
        {hasActiveFilters && (
          <Button variant="destructive" size="sm" onClick={resetFilters}>
            {t("filters.reset")}
          </Button>
        )}
      </div>
      <Filters />
    </MotionDiv>
  );
}
