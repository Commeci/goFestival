import { create } from "zustand";
import { persist } from "zustand/middleware";

const useThemeStore = create(
    persist(
        (set) => ({
            isDark: false,
            lightMode: () => {
                set({ isDark: false });
                document.documentElement.classList.remove("dark");
            },
            darkMode: () => {
                set({ isDark: true });
                document.documentElement.classList.add("dark");
            },
        }),
        {
            name: "themeStorage",
        }
    )
);

export default useThemeStore;
