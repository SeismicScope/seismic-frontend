"use client";
import { useQueryStates } from "nuqs";
import { useMemo } from "react";

import { FILTER_SCHEMA } from "../constants";
import { getApiFilters } from "../lib/utils";

export function useFilters() {
  const [filters, setFilters] = useQueryStates(FILTER_SCHEMA, {
    shallow: false,
    throttleMs: 500,
    history: "replace",
  });

  const apiFilters = useMemo(() => {
    const params = getApiFilters(filters);

    return {
      ...params,
      dateFrom: params.dateFrom?.toISOString(),
      dateTo: params.dateTo?.toISOString(),
    };
  }, [filters]);

  const hasActiveFilters = useMemo(
    () => Object.values(filters).some((v) => v !== null),
    [filters],
  );

  function resetFilters(): void {
    const empty = Object.fromEntries(
      Object.keys(FILTER_SCHEMA).map((k) => [k, null]),
    ) as typeof filters;

    setFilters(empty);
  }

  function setField<K extends keyof typeof filters>(
    field: K,
    value: (typeof filters)[K],
  ): void {
    setFilters({ [field]: value });
  }

  return {
    filters,
    apiFilters,
    hasActiveFilters,
    setFilters,
    setField,
    resetFilters,
  };
}
