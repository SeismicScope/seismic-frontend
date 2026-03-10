import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { AnalyticsChart } from "@/widgets/analytics-chart";
import { AnalyticsStats } from "@/widgets/analytics-stats";

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

function AnalyticsPage() {
  return (
    <div className="mt-5 w-full px-4 lg:px-10">
      <AnalyticsStats />
      <AnalyticsChart />
    </div>
  );
}

export default AnalyticsPage;
