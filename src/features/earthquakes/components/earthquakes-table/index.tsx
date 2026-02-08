"use client";

import { flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import { useEarthquakesTable } from "./use-earthquakes-table";

export function EarthquakeTable() {
  const { isLoading, table, virtualRows, parentRef, rowVirtualizer, rows } =
    useEarthquakesTable();

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div
      ref={parentRef}
      className="relative container h-[600px] w-full overflow-auto"
    >
      <Table className="w-full">
        <TableHeader className="sticky top-0 z-10 grid bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  style={{ width: header.getSize(), position: "relative" }}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableCell>
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
            if (!row)
              return (
                <TableRow key="loader">
                  <TableCell>Загрузка...</TableCell>
                </TableRow>
              );

            return (
              <TableRow
                key={row.id}
                className="absolute w-full"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
