import { useLocation, useNavigate } from "react-router-dom";
import { HomeIcon, SearchIcon, WishIcon } from "./ui/icon";
import useSearchStore from "../store/searchStore";

export function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const resetSearch = useSearchStore((state) => state.resetSearch);
    const handleClick = (path) => {
        if (path === "/search/step1") {
            resetSearch();
        }
        navigate(path);
    };

    const getButtonColor = (path) => {
        if (path === "/") {
            return location.pathname === "/"
                ? "text-custom-orange"
                : "text-custom-font-gray dark:text-custom-font-lightgray";
        } else if (path.startsWith("/search")) {
            return location.pathname.startsWith("/search")
                ? "text-custom-orange"
                : "text-custom-font-gray dark:text-custom-font-lightgray";
        } else if (path === "/wish") {
            return location.pathname === "/wish"
                ? "text-custom-orange"
                : "text-custom-font-gray dark:text-custom-font-lightgray";
        }
        return "text-custom-font-gray dark:text-custom-font-lightgray";
    };
    return (
        <div className="flex bg-white justify-evenly p-3 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] shadow-top z-10 dark:bg-custom-darkmode dark:shadow-white">
            <button
                onClick={() => handleClick("/")}
                className={getButtonColor("/")}
            >
                <HomeIcon />
                <p className="text-xs">홈</p>
            </button>
            <button
                onClick={() => handleClick("/search/step1")}
                className={getButtonColor("/search/step1")}
            >
                <SearchIcon />
                <p className="text-xs">축제 검색</p>
            </button>
            <button
                onClick={() => handleClick("/wish")}
                className={getButtonColor("/wish")}
            >
                <WishIcon />
                <p className="text-xs">찜</p>
            </button>
        </div>
    );
}
