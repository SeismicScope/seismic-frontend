import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { TilesMapViewer } from "@/widgets/tiles-map-viewer";

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

function TilesMapPage() {
  return <TilesMapViewer />;
}

export default TilesMapPage;
