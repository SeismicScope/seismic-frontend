import {
  parseAsFloat,
  parseAsInteger,
  parseAsIsoDate,
  parseAsStringLiteral,
} from "nuqs";

import { SORT_VALUES } from "@/shared/constants";

export const FILTER_SCHEMA = {
  minMag: parseAsFloat,
  maxMag: parseAsFloat,
  minDepth: parseAsInteger,
  maxDepth: parseAsInteger,
  dateFrom: parseAsIsoDate,
  dateTo: parseAsIsoDate,
  sort: parseAsStringLiteral(SORT_VALUES),
};
