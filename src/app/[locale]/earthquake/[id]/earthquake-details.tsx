import { getTranslations } from "next-intl/server";

import type { Locale } from "@/shared/constants";
import { formatDate } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import type { Earthquake } from "@/types/main";

import {
  EarthquakeCardAnimated,
  EarthquakeDetailsGrid,
} from "./earthquake-details-grid";

type Props = {
  earthquake: Earthquake;
  locale: Locale;
};

export default async function EarthquakeDetails({ earthquake, locale }: Props) {
  const t = await getTranslations({ locale });

  return (
    <EarthquakeDetailsGrid>
      <p className="text-lg font-bold">{t("general.earthquakeDetails")}</p>

      <div className="grid w-full grid-cols-2 gap-4">
        <EarthquakeCardAnimated index={0}>
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
        </EarthquakeCardAnimated>

        <EarthquakeCardAnimated index={1}>
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
        </EarthquakeCardAnimated>

        <EarthquakeCardAnimated index={2}>
          <Card>
            <CardHeader>
              <CardTitle>{t("general.depth")}</CardTitle>
            </CardHeader>
            <CardContent>{earthquake?.depth} km</CardContent>
          </Card>
        </EarthquakeCardAnimated>

        <EarthquakeCardAnimated index={3}>
          <Card>
            <CardHeader>
              <CardTitle>{t("general.coordinates")}</CardTitle>
            </CardHeader>
            <CardContent>
              {earthquake?.latitude}, {earthquake?.longitude}
            </CardContent>
          </Card>
        </EarthquakeCardAnimated>

        {earthquake?.location && (
          <EarthquakeCardAnimated index={4}>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>{t("general.location")}</CardTitle>
              </CardHeader>
              <CardContent>{earthquake.location}</CardContent>
            </Card>
          </EarthquakeCardAnimated>
        )}
      </div>
    </EarthquakeDetailsGrid>
  );
}
