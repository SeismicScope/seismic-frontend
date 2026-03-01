"use client";
import { useTranslations } from "next-intl";

function TimeSeriesNoData() {
  const t = useTranslations("general");

  return (
    <div className="flex h-[300px] items-center justify-center">
      <div className="text-muted-foreground text-sm">
        {t("general.noDataAvailable")}
      </div>
    </div>
  );
}

export default TimeSeriesNoData;
