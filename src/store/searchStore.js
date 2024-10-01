import { create } from "zustand";

const useSearchStore = create((set) => ({
    dateRange: [],
    location: "",
    keyword: "",
    searchResults: [],
    setDateRange: (dateRange) => set({ dateRange }),
    setLocation: (location) => set({ location }),
    setKeyword: (keyword) => set({ keyword }),
    setSearchResults: (results) => set({ searchResults: results }),
    resetSearch: () =>
        set({ dateRange: [], location: "", keyword: "", searchResults: [] }),
}));

export default useSearchStore;
