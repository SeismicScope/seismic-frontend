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

  const setField = <K extends keyof typeof filters>(
    field: K,
    value: (typeof filters)[K],
  ) => {
    setFilters({ [field]: value });
  };

  return { filters, apiFilters: apiParams, setFilters, setField };
};
