import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import type { useTranslations } from "next-intl";

import type { Earthquake } from "@/types/main";

type TFunction = ReturnType<typeof useTranslations>;

export const DANGEROUS_MAGNITUDE_LEVEL = 5;

export function getColumns(t: TFunction): ColumnDef<Earthquake>[] {
  return [
    {
      accessorKey: "occurredAt",
      header: t("general.date"),
      cell: (info) => new Date(info.getValue() as string).toLocaleString(),
      size: 200,
    },
    {
      accessorKey: "magnitude",
      header: t("general.magnitude"),
      cell: (info) => (
        <span
          className={
            Number(info.getValue()) > DANGEROUS_MAGNITUDE_LEVEL
              ? "text-error-500"
              : ""
          }
        >
          {Number(info.getValue()).toFixed(1)}
        </span>
      ),
      size: 200,
    },
    {
      accessorKey: "depth",
      header: t("general.depth"),
      cell: (info) => `${info.getValue()} km`,
      size: 200,
    },
    {
      accessorKey: "location",
      header: t("general.location"),
      size: 300,
    },
    {
      header: t("general.coordinates"),
      accessorFn: (row) => `${row.latitude}, ${row.longitude}`,
      size: 200,
    },
    {
      header: t("general.actions"),
      cell: (info) => (
        <Link
          href={`/earthquake/${info.row.original.id}`}
          className="text-blue-500 hover:opacity-60"
        >
          {t("general.moreInfo")}
        </Link>
      ),
    },
  ];
}
