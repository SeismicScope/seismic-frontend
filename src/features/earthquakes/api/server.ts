import { cache } from "react";

import type { Earthquake } from "../types";

export const getEarthquakeById = cache(
  async (id: string): Promise<Earthquake> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/earthquakes/${id}`,
      {
        next: { revalidate: 60 },
      },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch earthquake");
    }

    return res.json() as Promise<Earthquake>;
  },
);
