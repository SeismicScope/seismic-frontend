export type ImportStatus = {
  fileName: string;
  id: number;
  processed: number;
  status: string;
  totalRows: number | null;
  updatedAt: string;
};

export type Earthquake = {
  id: number;
  externalId: string | null;
  occuredAt: string;
  magnitude: number;
  depth: number;
  latitude: number;
  longitude: number;
  location: string | null;
  createdAt: string;
};

export type EarthquakesResponse = {
  data: Earthquake[];
  total: number;
  nextCursor: number | null;
};

export type EarthquakeFilters = {
  minMag?: number;
  maxMag?: number;
  minDepth?: number;
  maxDepth?: number;
  dateFrom?: string;
  dateTo?: string;
};

export type EarthquakeParams = EarthquakeFilters & {
  limit?: number;
  cursor?: number;
};

export type MagnitudeHistogram = {
  magnitude: number;
  count: number;
};
