import { useState } from "react";
import Button from "../../../components/ui/Button";
import { AroundCardList } from "./AroundCardList";
import { MapView } from "./MapView";

export function MapArea({ mapx, mapy }) {
    const [category, setCategory] = useState(null);
    const [nearbyPlaces, setNearbyPlaces] = useState([]);

    const handlePlacesFound = (places) => {
        setNearbyPlaces(places);
    };

    return (
        <div className="relative">
            <h3 className="text-base font-bold dark:text-white">주변 정보</h3>
            <Button
                text="음식점"
                bgColor={
                    category === "음식점" ? "bg-custom-orange" : "bg-white"
                }
                color={
                    category === "음식점" ? "text-white" : "text-custom-black"
                }
                classes="shadow-bottom absolute z-10 right-5 top-10"
                onClick={() => setCategory("음식점")}
            />
            <Button
                text="카페"
                bgColor={category === "카페" ? "bg-custom-orange" : "bg-white"}
                color={category === "카페" ? "text-white" : "text-custom-black"}
                classes="shadow-bottom absolute z-10 right-5 top-20"
                onClick={() => setCategory("카페")}
            />
            <MapView
                mapx={mapx}
                mapy={mapy}
                category={category}
                onPlacesFound={handlePlacesFound}
            />
            {category && (
                <>
                    <h3 className="text-base font-bold mt-6 dark:text-white">
                        주변 {category} 검색 결과
                    </h3>
                    <AroundCardList places={nearbyPlaces} />
                </>
            )}
        </div>
    );
}
