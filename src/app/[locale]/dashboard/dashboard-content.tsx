"use client";

import { AlignJustify, Map } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { EarthquakeTable } from "@/features/earthquakes/components/earthquakes-table";
import SortSelect from "@/features/filters/components/sort-select";
import EarthquakeMap from "@/features/map/components/lazy-map";
import { ErrorBoundary } from "@/shared/boundaries/error-boundary";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { Button } from "@/shared/ui/button";

export function DashboardContent() {
  const [showMap, setShowMap] = useState(false);
  const isDesktop = useBreakpoints("isDesktop");
  const t = useTranslations("general");

  const renderTable = isDesktop || !showMap;
  const renderMap = isDesktop || showMap;

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-lg font-bold">{t("earthquakes")}</p>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5 lg:hidden"
            onClick={() => setShowMap((v) => !v)}
          >
            {showMap ? (
              <>
                <AlignJustify className="h-4 w-4" />
                {t("showList")}
              </>
            ) : (
              <>
                <Map className="h-4 w-4" />
                {t("showMap")}
              </>
            )}
          </Button>
        </div>
        <SortSelect />
      </div>

      <div className="flex items-start gap-3">
        {renderTable && (
          <div className="min-w-0 flex-1">
            <ErrorBoundary
              fallback={
                <div className="text-muted-foreground flex h-[300px] items-center justify-center text-sm">
                  {t("general.failedToRenderTable")}
                </div>
              }
            >
              <EarthquakeTable />
            </ErrorBoundary>
          </div>
        )}
        {renderMap && (
          <ErrorBoundary
            fallback={
              <div className="text-muted-foreground flex h-[300px] items-center justify-center text-sm">
                {t("map.failedToRenderMap")}
              </div>
            }
          >
            <EarthquakeMap isDashboard />
          </ErrorBoundary>
        )}
      </div>
    </>
  );
}
