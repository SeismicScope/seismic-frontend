"use client";

import { useRouter } from "next/navigation";

import type { Earthquake } from "@/features/earthquakes/types";

function SeeMoreDetails({ id }: Pick<Earthquake, "id">) {
  const router = useRouter();

  return (
    <p className="text-muted-foreground text-sm">
      Want to see more details?{" "}
      <button
        onClick={() => router.push(`/earthquake/${id}`)}
        className="text-primary underline-offset-4 hover:underline"
      >
        Open full page
      </button>
    </p>
  );
}

export default SeeMoreDetails;
