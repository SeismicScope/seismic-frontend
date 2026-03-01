import { create } from "zustand";

export type MapRequestParamsState = {
  requestParams: {
    west: number;
    south: number;
    east: number;
    north: number;
    zoom: number;
  } | null;
};

export type MapParams = Partial<
  NonNullable<MapRequestParamsState["requestParams"]>
>;

type MapRequestParamsActions = {
  setMapRequestParams: (params: MapRequestParamsState["requestParams"]) => void;
};

type MapRequestParamsStore = MapRequestParamsState & MapRequestParamsActions;

export const useMapRequestParams = create<MapRequestParamsStore>((set) => ({
  requestParams: null,
  setMapRequestParams: (params) => set({ requestParams: params }),
}));
