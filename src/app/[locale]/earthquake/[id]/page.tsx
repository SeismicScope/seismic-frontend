import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getEarthquakeById } from "@/features/earthquakes/api/server";
import { generateLdJson } from "@/features/earthquakes/lib/generate-ld-json";
import type { Locale } from "@/shared/constants";

import EarthquakeDetails from "./earthquake-details";
import LazyEarthquakeMap from "./lazy-earthquake-map";
import { StructuredData } from "./structured-data";

type Props = {
  params: Promise<{ locale: Locale; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;

  const t = await getTranslations({ locale, namespace: "earthquake" });

  const earthquake = await getEarthquakeById(id);

  return {
    title: t("earthquakeTitle", {
      magnitude: earthquake.magnitude,
      depth: earthquake.depth,
    }),
    description: t("earthquakeDescription", {
      location: earthquake?.location || "",
      depth: earthquake.depth,
    }),
  };
}

export default async function EarthquakePage({ params }: Props) {
  const { id, locale } = await params;
  const t = await getTranslations({ locale });
  const earthquake = await getEarthquakeById(id);

  if (!earthquake) {
    return <div className="p-10">{t("general.earthquakeNotFound")}</div>;
  }

  const ldJson = generateLdJson(earthquake);

  return (
    <>
      <StructuredData ldJson={ldJson} />
      <div className="mt-5 flex w-full flex-col gap-10 px-4 lg:flex-row lg:px-10">
        <EarthquakeDetails earthquake={earthquake} locale={locale} />
        <LazyEarthquakeMap
          lat={earthquake.latitude}
          lng={earthquake.longitude}
        />
      </div>
    </>
  );
}
