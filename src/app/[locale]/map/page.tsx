import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { MapViewer } from "@/widgets/map-viewer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("mapTitle"),
    description: t("mapDescription"),
  };
}

function MapPage() {
  return <MapViewer />;
}

export default MapPage;
