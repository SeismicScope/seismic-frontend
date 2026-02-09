import { create } from "zustand";

type MapStatsState = {
  pointsCount: number;
  buildTime: number;
};

type MapStatsActions = {
  setMapStats: (stats: MapStatsState) => void;
};

type MapStatsStore = MapStatsState & MapStatsActions;

export const useMapStatsStore = create<MapStatsStore>((set) => ({
  pointsCount: 0,
  buildTime: 0,
  setMapStats: (stats) =>
    set({
      pointsCount: stats.pointsCount,
      buildTime: stats.buildTime,
    }),
}));
