import { getTranslations } from "next-intl/server";

import type { Locale } from "@/shared/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

async function EarthquakeSkeleton({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });

  return (
    <div className="mt-5 flex w-full flex-col items-start gap-10 px-4 lg:flex-row lg:px-10">
      <div className="flex w-full flex-col gap-3 lg:w-1/2">
        <p className="text-lg font-bold">{t("general.earthquakeDetails")}</p>
        <div className="grid w-full grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("general.occuredAt")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-40" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("general.magnitude")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-16" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("general.depth")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-20" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("general.coordinates")}</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-5 w-32" />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 lg:w-1/2">
        <p className="text-lg font-bold">{t("general.locationOnMap")}</p>
        <Skeleton className="h-[400px] w-full rounded-lg" />
      </div>
    </div>
  );
}

export default EarthquakeSkeleton;
