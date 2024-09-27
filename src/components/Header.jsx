import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import logo from "../assets/logo.svg";
import { LightModeIcon } from "./ui/icon";
import { regionList } from "../constants/regionList";
import { useLocation } from "react-router-dom";
import useRegionStore from "../store/regionStore";

export function Header() {
    // TODO: swiper 추가하기
    const selectedRegion = useRegionStore((state) => state.selectedRegion);
    const setSelectedRegion = useRegionStore(
        (state) => state.setSelectedRegion
    );
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <div className="z-10 p-3 bg-white fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] shadow-bottom">
            <div className=" flex justify-between">
                <img src={logo} alt="축제가자 로고" className="w-24" />
                <LightModeIcon />
            </div>
            {isHomePage && (
                <Swiper spaceBetween={5} slidesPerView={5} className="mt-3">
                    {regionList.map((region) => (
                        <SwiperSlide key={region.code}>
                            <button
                                className={`w-full text-custom-font pb-1 ${
                                    selectedRegion === region.code
                                        ? "text-custom-orange border-b-2 border-custom-orange"
                                        : ""
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
