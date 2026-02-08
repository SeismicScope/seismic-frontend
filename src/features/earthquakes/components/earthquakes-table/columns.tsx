import type { ColumnDef } from "@tanstack/react-table";

import type { Earthquake } from "../../api/types";

export const columns: ColumnDef<Earthquake>[] = [
  {
    accessorKey: "occuredAt",
    header: "Date",
    cell: (info) => new Date(info.getValue() as string).toLocaleString(),
    size: 180,
  },
  {
    accessorKey: "magnitude",
    header: "Mag",
    cell: (info) => (
      <span className={Number(info.getValue()) > 5 ? "text-red-500" : ""}>
        {Number(info.getValue()).toFixed(1)}
      </span>
    ),
    size: 80,
  },
  {
    accessorKey: "depth",
    header: "Depth",
    cell: (info) => `${info.getValue()} km`,
    size: 100,
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
];
