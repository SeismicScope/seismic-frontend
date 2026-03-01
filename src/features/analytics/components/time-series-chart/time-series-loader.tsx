"use client";
import { useTranslations } from "next-intl";

function TimeSeriesLoader() {
  const t = useTranslations("analytics");

  return (
    <div className="flex h-[300px] items-center justify-center">
      <div className="text-muted-foreground text-sm">{t("loadingChart")}</div>
    </div>
  );
}

export default TimeSeriesLoader;
