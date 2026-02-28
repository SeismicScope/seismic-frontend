import { getEarthquakeById } from "@/features/earthquakes/api/server";

import EarthquakeModalDetails from "./earthquake-modal-details";
import ModalWrapper from "./modal-wrapper";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EarthquakeModal({ params }: Props) {
  const { id } = await params;
  const earthquake = await getEarthquakeById(id);

  if (!earthquake) return null;

  return (
    <ModalWrapper>
      <EarthquakeModalDetails earthquake={earthquake} />
    </ModalWrapper>
  );
}
