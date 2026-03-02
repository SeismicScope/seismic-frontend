import type { Event, WithContext } from "schema-dts";

import type { Earthquake } from "@/features/earthquakes/types";

export function generateLdJson({
  magnitude,
  occurredAt,
  latitude,
  longitude,
  depth,
}: Earthquake): WithContext<Event> {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `Earthquake M${magnitude}`,
    startDate: occurredAt,
    location: {
      "@type": "Place",
      name: "No location data",
      geo: {
        "@type": "GeoCoordinates",
        latitude: latitude,
        longitude: longitude,
      },
    },
    description: `Magnitude ${magnitude} earthquake at depth ${depth} km`,
  };
}
