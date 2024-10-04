import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import logo from "../assets/logo.svg";
import { LightModeIcon, DarkModeIcon } from "./ui/icon";
import { regionList } from "../constants/regionList";
import { useLocation, useNavigate } from "react-router-dom";
import useRegionStore from "../store/regionStore";
import useThemeStore from "../store/themeStore";
import { useEffect } from "react";

// TODO: 다크모드
export function Header() {
    const { isDark, lightMode, darkMode } = useThemeStore();
    const selectedRegion = useRegionStore((state) => state.selectedRegion);
    const setSelectedRegion = useRegionStore(
        (state) => state.setSelectedRegion
    );
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const navigate = useNavigate();

    useEffect(() => {
        const storedTheme = JSON.parse(localStorage.getItem("themeStorage"))
            ?.state?.isDark;
        if (storedTheme !== undefined) {
            storedTheme ? darkMode() : lightMode();
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            lightMode();
        } else {
            darkMode();
        }
    };

    return (
        <div className="z-50 p-3 bg-white fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] shadow-bottom dark:bg-custom-darkmode dark:shadow-white">
            <div className=" flex justify-between">
                <img
                    src={logo}
                    alt="축제가자 로고"
                    className="w-24"
                    onClick={() => navigate("/")}
                />
                <button
                    onClick={toggleTheme}
                    className="text-custom-font dark:text-white"
                >
                    {isDark ? <DarkModeIcon /> : <LightModeIcon />}
                </button>
            </div>
            {isHomePage && (
                <Swiper
                    spaceBetween={5}
                    slidesPerView={5}
                    className="mt-3 dark:bg-custom-darkmode"
                >
                    {regionList.map((region) => (
                        <SwiperSlide key={region.code}>
                            <button
                                className={`w-full pb-1 ${
                                    selectedRegion === region.code
                                        ? "text-custom-orange border-b-2 border-custom-orange dark:text-custom-orange"
                                        : "text-custom-font dark:text-white"
                                }`}
                                onClick={() => setSelectedRegion(region.code)}
                            >
                                {region.name}
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
