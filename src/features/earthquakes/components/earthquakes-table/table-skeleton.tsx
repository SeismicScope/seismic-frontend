"use client";
import { useLocale, useTranslations } from "next-intl";

import { generateSkeletonItems } from "@/shared/lib/generate-skeleton-items";
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
  const locale = useLocale();
  const columns = getColumns(t, locale);
  const tableItems = generateSkeletonItems(SKELETON_ROWS, "row");

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.id} style={{ width: col.size }}>
                <Skeleton className="h-4 w-3/4" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableItems.map((item) => (
            <TableRow key={item}>
              {columns.map((col) => (
                <TableCell key={col.id} style={{ width: col.size }}>
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
