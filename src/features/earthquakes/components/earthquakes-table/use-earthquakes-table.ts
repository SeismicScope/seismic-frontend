"use client";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useRef } from "react";

import { useEarthquakes } from "@/features/earthquakes/hooks/use-earthquakes";

import { getColumns } from "./columns";

export function useEarthquakesTable() {
  const t = useTranslations();
  const locale = useLocale();
  const parentRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useEarthquakes();

  const flatData = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: flatData,
    columns: getColumns(t, locale),
    getCoreRowModel: getCoreRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? rows.length + 1 : rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  useEffect(
    function fetchNextPageIfNeeded() {
      const lastItem = virtualRows[virtualRows.length - 1];
      if (!lastItem) return;

      if (
        lastItem.index >= rows.length - 1 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage, virtualRows, rows.length, isFetchingNextPage],
  );

  return {
    isLoading,
    isEmpty: !isLoading && flatData.length === 0,
    table,
    virtualRows,
    parentRef,
    rowVirtualizer,
    rows,
  };
}
