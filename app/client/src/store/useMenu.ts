import { create } from "zustand";
import type { MenuStore } from "./types/Menu.types";

export const useMenuStore = create<MenuStore>((set) => ({
	isOpen: false,
	toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));
