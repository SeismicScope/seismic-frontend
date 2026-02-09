"use client";
import {
  parseAsFloat,
  parseAsInteger,
  parseAsIsoDate,
  useQueryStates,
} from "nuqs";

import { getApiFilters } from "../lib/utils";

export const useFilters = () => {
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

  const apiParams = getApiFilters(filters);
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
};
