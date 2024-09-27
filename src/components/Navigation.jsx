import { useLocation, useNavigate } from "react-router-dom";
import { HomeIcon, SearchIcon, WishIcon } from "./ui/icon";

export function Navigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = (path) => {
        navigate(path);
    };

    const getButtonColor = (path) => {
        const isActive = location.pathname === path;
        return isActive ? "text-custom-orange" : "text-gray-500";
    };
    return (
        <div className="flex bg-white justify-evenly p-3 fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] shadow-top z-10">
            <button
                onClick={() => handleClick("/")}
                className={getButtonColor("/")}
            >
                <HomeIcon />
                <p className="text-xs">홈</p>
            </button>
            <button
                onClick={() => handleClick("/search")}
                className={getButtonColor("/search")}
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
