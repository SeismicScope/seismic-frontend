import Link from "next/link";

import { formatDate } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import type { Earthquake } from "@/types/main";

type Props = {
  earthquake: Earthquake;
};

export default function EarthquakeModalDetails({ earthquake }: Props) {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-lg font-bold">Earthquake details</p>

      <div className="grid w-full grid-cols-2 gap-3">
        <Card className="py-3">
          <CardHeader className="px-3">
            <CardTitle>Occurred At</CardTitle>
          </CardHeader>
          <CardContent className="px-3">
            {earthquake?.occurredAt
              ? formatDate(new Date(earthquake.occurredAt))
              : "Unknown"}
          </CardContent>
        </Card>

        <Card className="py-3">
          <CardHeader className="px-3">
            <CardTitle>Magnitude</CardTitle>
          </CardHeader>
          <CardContent className="px-3">
            <span className="text-error-500 text-xl font-bold">
              {earthquake?.magnitude}
            </span>
          </CardContent>
        </Card>

        <Card className="py-3">
          <CardHeader className="px-3">
            <CardTitle>Depth</CardTitle>
          </CardHeader>
          <CardContent className="px-3">{earthquake?.depth} km</CardContent>
        </Card>

        <Card className="py-3">
          <CardHeader className="px-3">
            <CardTitle>Coordinates</CardTitle>
          </CardHeader>
          <CardContent className="px-3">
            {earthquake?.latitude}, {earthquake?.longitude}
          </CardContent>
        </Card>
      </div>

      <p className="text-muted-foreground text-sm">
        Want to see more details?{" "}
        <Link
          href={`/earthquake/${earthquake.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline-offset-4 hover:underline"
        >
          Open full page
        </Link>
      </p>
    </div>
  );
}
