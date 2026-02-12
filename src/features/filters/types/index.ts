import type { SortOption } from "@/shared/constants";

export type FilterType = {
  dateFrom?: Date | null;
  dateTo?: Date | null;
  minDepth?: number | null;
  maxDepth?: number | null;
  minMag?: number | null;
  maxMag?: number | null;
  sort?: SortOption | null;
};
