import { describe, expect, it } from "vitest";

import { generateLdJson } from "@/features/earthquakes/lib/generate-ld-json";

describe("generateLdJson", () => {
  const mockEarthquake = {
    id: 1,
    externalId: "us2023abc",
    magnitude: 6.2,
    depth: 10.5,
    location: "35km NE of Tokyo, Japan",
    latitude: 35.6895,
    longitude: 139.6917,
    occurredAt: "2023-03-15T14:30:00.000Z",
    createdAt: "2023-03-15T14:35:00.000Z",
  };

  it("generates valid JSON-LD structure", () => {
    const result = generateLdJson(mockEarthquake);
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("Event");
  });

  it("includes earthquake location data", () => {
    const result = generateLdJson(mockEarthquake);
    expect(result.location).toBeDefined();

    const location = result.location as { "@type": string };
    expect(location["@type"]).toBe("Place");
  });

  it("includes date information", () => {
    const result = generateLdJson(mockEarthquake);
    expect(result.startDate).toBe("2023-03-15T14:30:00.000Z");
  });

  it("includes magnitude in name", () => {
    const result = generateLdJson(mockEarthquake);
    expect(result.name).toContain("6.2");
  });
});
