import { create } from "zustand";

type CommandPaletteState = {
  open: boolean;
};

type CommandPaletteActions = {
  setOpen: (open: boolean) => void;
};

type CommandPaletteStore = CommandPaletteState & CommandPaletteActions;

export const useCommandPaletteStore = create<CommandPaletteStore>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
