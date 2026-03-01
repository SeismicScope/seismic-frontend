import { getTranslations } from "next-intl/server";

import type { Earthquake } from "@/features/earthquakes/types";
import { formatDate } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = {
  earthquake: Earthquake;
};

export default async function EarthquakeDetails({ earthquake }: Props) {
  const t = await getTranslations();

  return (
    <div className="flex w-full flex-col gap-3 lg:w-1/2">
      <p className="text-lg font-bold">{t("general.earthquakeDetails")}</p>

      <div className="grid w-full grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{t("general.occuredAt")}</CardTitle>
          </CardHeader>
          <CardContent>
            {earthquake?.occurredAt
              ? formatDate(new Date(earthquake.occurredAt))
              : "Unknown"}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("general.magnitude")}</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-error-500 text-xl font-bold">
              {earthquake?.magnitude}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("general.depth")}</CardTitle>
          </CardHeader>
          <CardContent>{earthquake?.depth} km</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("general.coordinates")}</CardTitle>
          </CardHeader>
          <CardContent>
            {earthquake?.latitude}, {earthquake?.longitude}
          </CardContent>
        </Card>

        {earthquake?.location && (
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>{t("general.location")}</CardTitle>
            </CardHeader>
            <CardContent>{earthquake.location}</CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
