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

export type EarthquakeParams = {
  limit?: number;
  cursor?: number;
  minMag?: number;
  maxMag?: number;
  minDepth?: number;
  maxDepth?: number;
  dateFrom?: string;
  dateTo?: string;
};
