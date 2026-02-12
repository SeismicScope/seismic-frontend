import { cache } from "react";

export const getEarthquakeById = cache(async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/earthquakes/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch earthquake");
  }

  return res.json();
});
