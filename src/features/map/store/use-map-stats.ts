import { create } from "zustand";

type MapStatsState = {
  pointsCount: number;
  buildTime: number;
  totalInBounds: number;
  limit: number;
  processing: boolean;
};

type MapStatsActions = {
  setMapStats: (stats: Partial<MapStatsState>) => void;
};

type MapStatsStore = MapStatsState & MapStatsActions;

export const useMapStatsStore = create<MapStatsStore>((set) => ({
  pointsCount: 0,
  buildTime: 0,
  totalInBounds: 0,
  limit: 0,
  processing: false,
  setMapStats: (stats) => set(stats),
}));
