import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import EarthquakesStats from "@/features/analytics/components/earthquakes-stats";
import { Card, CardHeader, CardTitle } from "@/shared/ui/card";

import TimeSeries from "./time-series";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("analyticsTitle"),
    description: t("analyticsDescription"),
  };
}

async function AnalyticsPage() {
  const t = await getTranslations();

  return (
    <div className="mt-5 w-full px-4 lg:px-10">
      <EarthquakesStats />

      <Card>
        <CardHeader>
          <CardTitle>{t("general.seismicEventsOverTime")}</CardTitle>
        </CardHeader>
        <TimeSeries />
      </Card>
    </div>
  );
}

export default AnalyticsPage;
