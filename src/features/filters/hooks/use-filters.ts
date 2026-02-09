"use client";
import {
  parseAsFloat,
  parseAsInteger,
  parseAsIsoDate,
  useQueryStates,
} from "nuqs";

import { getApiFilters } from "../lib/utils";
import type { FilterType } from "../types";

export const useFilters = () => {
  const [filters, setFilters] = useQueryStates(
    {
      minMagnitude: parseAsFloat,
      maxMagnitude: parseAsFloat,
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

  const setField = (field: keyof typeof filters, value: FilterType) => {
    setFilters({ [field]: value });
  };

  return { filters, apiFilters: apiParams, setFilters, setField };
};
