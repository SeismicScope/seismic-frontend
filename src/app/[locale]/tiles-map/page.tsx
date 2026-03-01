import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import LazyTilesMap from "@/features/map/components/lazy-tiles-map";
import MapStats from "@/features/map/components/map-stats";
import { ErrorBoundary } from "@/shared/boundaries/error-boundary";

import AboutThisMap from "./about-this-map";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("tilesMapTitle"),
    description: t("tilesMapDescription"),
  };
}

async function TilesMapPage() {
  const t = await getTranslations();

  return (
    <div className="relative h-[calc(100vh-8rem)] w-full">
      <div className="mb-4 flex items-center justify-between">
        <MapStats />
        <AboutThisMap />
      </div>
      <ErrorBoundary
        fallback={
          <div className="text-muted-foreground flex h-[300px] items-center justify-center text-sm">
            {t("map.failedToRenderMap")}
          </div>
        }
      >
        <LazyTilesMap />
      </ErrorBoundary>
    </div>
  );
}

export default TilesMapPage;
