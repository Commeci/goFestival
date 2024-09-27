import { create } from "zustand";

const useRegionStore = create((set) => ({
    selectedRegion: "0",
    setSelectedRegion: (region) => set({ selectedRegion: region }),
}));

export default useRegionStore;
