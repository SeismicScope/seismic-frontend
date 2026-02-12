import { Metadata } from "next";

import { getEarthquakeById } from "@/features/earthquakes/api/server";

import EarthquakeDetails from "./earthquake-details";
import EarthquakeMapClient from "./earthquake-map-client";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const earthquake = await getEarthquakeById(id);

  return {
    title: `M${earthquake.magnitude} — ${earthquake.location}`,
    description: `Earthquake at ${earthquake.location}, depth ${earthquake.depth}km`,
  };
}

export default async function EarthquakePage({ params }: Props) {
  const { id } = await params;
  const earthquake = await getEarthquakeById(id);

  if (!earthquake) {
    return <div className="p-10">Earthquake not found</div>;
  }

  return (
    <div className="mt-5 flex w-full flex-col gap-10 px-4 lg:flex-row lg:px-10">
      <EarthquakeDetails earthquake={earthquake} />
      <EarthquakeMapClient
        lat={earthquake.latitude}
        lng={earthquake.longitude}
      />
    </div>
  );
}
