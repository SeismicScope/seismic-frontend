import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import type { Earthquake } from "../../types";

export const columns: ColumnDef<Earthquake>[] = [
  {
    accessorKey: "occuredAt",
    header: "Date",
    cell: (info) => new Date(info.getValue() as string).toLocaleString(),
    size: 200,
  },
  {
    accessorKey: "magnitude",
    header: "Magnitude",
    cell: (info) => (
      <span className={Number(info.getValue()) > 5 ? "text-red-500" : ""}>
        {Number(info.getValue()).toFixed(1)}
      </span>
    ),
    size: 200,
  },
  {
    accessorKey: "depth",
    header: "Depth",
    cell: (info) => `${info.getValue()} km`,
    size: 200,
  },
  {
    accessorKey: "place",
    header: "Location",
    size: 300,
  },
  {
    header: "Coordinates",
    accessorFn: (row) => `${row.latitude}, ${row.longitude}`,
    size: 200,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (info) => (
      <Link
        href={`/earthquake/${info.row.original.id}`}
        className="text-blue-500 hover:opacity-60"
      >
        More info
      </Link>
    ),
  },
];
