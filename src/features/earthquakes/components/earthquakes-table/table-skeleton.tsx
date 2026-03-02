"use client";
import { useTranslations } from "next-intl";

import { Skeleton } from "@/shared/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";

import { getColumns } from "./columns";

const SKELETON_ROWS = 7;

function TableSkeleton() {
  const t = useTranslations();
  const columns = getColumns(t);

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, i) => (
              <TableHead key={i} style={{ width: col.size }}>
                <Skeleton className="h-4 w-3/4" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <TableRow key={i}>
              {columns.map((col, j) => (
                <TableCell key={j} style={{ width: col.size }}>
                  <Skeleton className="h-4 w-2/3" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableSkeleton;
