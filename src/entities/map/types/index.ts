export type MapBounds = {
  west: number;
  east: number;
  north: number;
  south: number;
};

export type MapRequest = MapBounds & {
  zoom: number;
};
