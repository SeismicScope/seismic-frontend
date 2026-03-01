import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import EarthquakesStats from "@/features/analytics/components/earthquakes-stats";
import { EarthquakeTable } from "@/features/earthquakes/components/earthquakes-table";
import SortSelect from "@/features/filters/components/sort-select";
import EarthquakeMap from "@/features/map/components/lazy-map";
import { ShareLinkDialog } from "@/features/share-link/components/share-link-dialog";
import type { Locale } from "@/shared/constants";

import DashbardFilters from "./dashboard-filters";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("dashboardTitle"),
    description: t("dashboardDescription"),
  };
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return (
    <div className="mt-5 w-full px-4 lg:px-10">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">{t("pages.dashboard")}</h1>
        <ShareLinkDialog />
      </div>
      <div className="my-4 flex flex-col items-stretch gap-4 lg:flex-row">
        <div className="w-full lg:w-1/4">
          <p className="text-lg font-bold">{t("analytics.kpiCards")}</p>
          <EarthquakesStats />
        </div>
        <div className="hidden pt-15 pb-10 lg:block">
          <div className="h-full w-px bg-black/40" />
        </div>
        <DashbardFilters />
      </div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-lg font-bold">{t("general.earthquakes")}</p>
        <SortSelect />
      </div>
      <div className="flex items-start gap-3">
        <EarthquakeTable />
        <EarthquakeMap isDashboard />
      </div>
    </div>
  );
}
