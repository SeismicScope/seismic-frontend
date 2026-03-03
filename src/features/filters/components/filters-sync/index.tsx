"use client";

import { useEffect, useRef } from "react";

import { useFilters } from "@/entities/filter/hooks/use-filters";
import { useBroadcastChannel } from "@/shared/hooks/use-broadcast-channel";

type FiltersPayload = ReturnType<typeof useFilters>["filters"];

export function FiltersSync() {
  const { filters, setFilters } = useFilters();
  const isReceiving = useRef(false);

  function handleMessage(data: FiltersPayload) {
    isReceiving.current = true;
    setFilters(data);
    setTimeout(() => {
      isReceiving.current = false;
    }, 0);
  }

  const { postMessage } = useBroadcastChannel<FiltersPayload>(
    "seismic-filters",
    handleMessage,
  );

  useEffect(() => {
    if (!isReceiving.current) {
      postMessage(filters);
    }
  }, [filters]);

  return null;
}
