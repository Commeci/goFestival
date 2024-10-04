import { CafeIcon, RestaurantIcon } from "../../../components/ui/icon";

export function AroundCard({ name, distance, type, lat, lng }) {
    const Icon = type === "카페" ? CafeIcon : RestaurantIcon;

    const handleClick = () => {
        const kakaoMapUrl = `https://map.kakao.com/link/to/${encodeURIComponent(
            name
        )},${lat},${lng}`;
        window.open(kakaoMapUrl, "_blank");
    };

    return (
        <div
            className="shadow-bottom rounded-lg p-2 cursor-pointer hover:bg-gray-100 transition-colors duration-200 dark:shadow-white"
            onClick={handleClick}
        >
            <div className="flex items-center dark:text-white">
                <Icon className="flex-shrink-0" />
                <h4 className="ml-3 text-base font-bold truncate overflow-hidden flex-grow">
                    {name}
                </h4>
            </div>
            <p className="text-custom-font-gray mt-1 dark:text-custom-font-lightgray">
                축제로부터 {distance}
            </p>
        </div>
    );
}
