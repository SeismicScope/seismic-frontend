export type MapBounds = {
  west: number;
  east: number;
  north: number;
  south: number;
};

export type MapRequest = MapBounds & {
  zoom: number;
};

export type MapPoint = {
  id: number;
  occuredAt: string;
  magnitude: number;
  depth: number;
  latitude: number;
  longitude: number;
  location: string | null;
};

export type MapResponse = {
  data: MapPoint[];
  total: number;
  limit: number;
};

export type MapPointProperties = {
  id: number;
  magnitude: number;
  depth: number;
  location: string | null;
  occuredAt: string;
};

export type WorkerOnMessageEvent = MessageEvent<
  | { type: "clusters"; data: GeoJSON.Feature[] }
  | { type: "expansionZoom"; data: number }
  | {
      type: "clusterStats";
      data: { pointsCount: number; buildTime: number };
    }
>;
