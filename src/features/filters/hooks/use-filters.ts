"use client";
import {
  parseAsFloat,
  parseAsInteger,
  parseAsIsoDate,
  useQueryStates,
} from "nuqs";
import { useMemo } from "react";

import { getApiFilters } from "../lib/utils";

export function useFilters() {
  const [filters, setFilters] = useQueryStates(
    {
      minMag: parseAsFloat,
      maxMag: parseAsFloat,
      minDepth: parseAsInteger,
      maxDepth: parseAsInteger,
      dateFrom: parseAsIsoDate,
      dateTo: parseAsIsoDate,
    },
    {
      shallow: false,
      throttleMs: 500,
      history: "replace",
    },
  );

  const apiParams = useMemo(() => {
    const params = getApiFilters(filters);

    return {
      ...params,
      dateFrom: params.dateFrom?.toISOString(),
      dateTo: params.dateTo?.toISOString(),
    };
  }, [filters]);

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== null,
  );

  function resetFilters(): void {
    setFilters(Object.fromEntries(Object.keys(filters).map((k) => [k, null])));
  }

  function setField<K extends keyof typeof filters>(
    field: K,
    value: (typeof filters)[K],
  ): void {
    setFilters({ [field]: value });
  }

  return {
    filters,
    apiFilters: apiParams,
    hasActiveFilters,
    setFilters,
    setField,
    resetFilters,
  };
}
