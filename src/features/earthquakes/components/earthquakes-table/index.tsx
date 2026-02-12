"use client";

import { flexRender } from "@tanstack/react-table";

import { Skeleton } from "@/shared/ui/skeleton";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import { columns } from "./columns";
import TableSkeleton from "./table-skeleton";
import { useEarthquakesTable } from "./use-earthquakes-table";

export function EarthquakeTable() {
  const { isLoading, table, virtualRows, parentRef, rowVirtualizer, rows } =
    useEarthquakesTable();

  if (isLoading) return <TableSkeleton />;

  return (
    <div ref={parentRef} className="relative h-[400px] w-full overflow-auto">
      <table className="w-full min-w-[700px] caption-bottom text-sm">
        <TableHeader className="bg-background sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="flex w-full">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{ width: header.getSize(), flex: "none" }}
                  className="text-lg font-semibold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody
          className="relative"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {virtualRows.map((virtualRow) => {
            const row = rows[virtualRow.index];

            if (!row) {
              return (
                <TableRow
                  key={`loader-${virtualRow.index}`}
                  className="absolute flex w-full"
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {columns.map((col, j) => (
                    <TableCell
                      key={j}
                      style={{ width: col.size, flex: "none" }}
                    >
                      <Skeleton className="h-4 w-2/3" />
                    </TableCell>
                  ))}
                </TableRow>
              );
            }

            return (
              <TableRow
                key={row.id}
                className="absolute flex w-full"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize(), flex: "none" }}
                    className="text-sm font-semibold"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </table>
    </div>
  );
}
