"use client";
import { useTranslations } from "next-intl";

import { Input } from "@/shared/ui/input";

import { useDepthRange } from "./use-depth-range";

function DepthRange() {
  const t = useTranslations();
  const {
    editingMin,
    localMin,
    filters,
    setLocalMin,
    setEditingMin,
    syncMin,
    syncMax,
    editingMax,
    localMax,
    setLocalMax,
    setEditingMax,
  } = useDepthRange();

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{t("general.min")}</p>
          <Input
            type="number"
            placeholder={t("general.depth")}
            className="max-w-48 lg:max-w-24"
            value={(editingMin ? localMin : filters.minDepth) ?? ""}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : null;
              setLocalMin(value);
              setEditingMin(true);
              syncMin(value);
            }}
            aria-label={t("filters.minDepthInput")}
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="font-semibold">{t("general.max")}</p>
          <Input
            type="number"
            placeholder={t("general.depth")}
            className="max-w-48 lg:max-w-24"
            value={(editingMax ? localMax : filters.maxDepth) ?? ""}
            onChange={(e) => {
              const value = e.target.value ? Number(e.target.value) : null;
              setLocalMax(value);
              setEditingMax(true);
              syncMax(value);
            }}
            aria-label={t("filters.maxDepthInput")}
          />
        </div>
      </div>
    </div>
  );
}

export default DepthRange;
