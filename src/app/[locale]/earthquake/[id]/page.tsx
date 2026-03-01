import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getEarthquakeById } from "@/features/earthquakes/api/server";

import EarthquakeDetails from "./earthquake-details";
import LazyEarthquakeMap from "./lazy-earthquake-map";

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;

  const t = await getTranslations({ locale, namespace: "earthquake" });

  const earthquake = await getEarthquakeById(id);

  return {
    title: t("title", {
      magnitude: earthquake.magnitude,
      depth: earthquake.depth,
    }),
    description: t("description", {
      location: earthquake?.location || "",
      depth: earthquake.depth,
    }),
  };
}

export default async function EarthquakePage({ params }: Props) {
  const { id } = await params;
  const t = await getTranslations();
  const earthquake = await getEarthquakeById(id);

  if (!earthquake) {
    return <div className="p-10">{t("general.earthquakeNotFound")}</div>;
  }

  return (
    <div className="mt-5 flex w-full flex-col gap-10 px-4 lg:flex-row lg:px-10">
      <EarthquakeDetails earthquake={earthquake} />
      <LazyEarthquakeMap lat={earthquake.latitude} lng={earthquake.longitude} />
    </div>
  );
}
