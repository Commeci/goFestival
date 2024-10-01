import { useNavigate } from "react-router-dom";
import {
    CalendarIcon,
    CloseIcon,
    LocationIcon,
} from "../../components/ui/icon";
import useSearchStore from "../../store/searchStore";
import { CardList } from "../../components/CardList";
import { getFestivalData } from "../../network/publicData";
import { useEffect, useState } from "react";
import { regionList } from "../../constants/regionList";

export default function SearchPage() {
    const navigate = useNavigate();
    const { dateRange, location, keyword, setSearchResults, resetSearch } =
        useSearchStore();

    const [isLoading, setIsLoading] = useState(true);
    const [festivals, setFestivals] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [startDate, endDate] = dateRange || [];
                const formattedStartDate = startDate
                    ? formatDate(startDate)
                    : "";
                const formattedEndDate = endDate ? formatDate(endDate) : "";

                const selectedRegion = regionList.find(
                    (region) => region.name === location
                );
                const areaCode = selectedRegion ? selectedRegion.code : "";

                const results = await getFestivalData(
                    formattedStartDate,
                    formattedEndDate,
                    areaCode
                );
                setSearchResults(results);
                // 실제 축제 데이터 배열을 festivals 상태에 저장
                setFestivals(results.response.body.items.item || []);
            } catch (error) {
                console.error("Error searching festivals:", error);
                setFestivals([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [dateRange, location, keyword, setSearchResults]);

    const formatDate = (date) => {
        return (
            date.getFullYear().toString() +
            (date.getMonth() + 1).toString().padStart(2, "0") +
            date.getDate().toString().padStart(2, "0")
        );
    };

    const formatDateRange = (start, end) => {
        if (!start || !end) return "날짜";
        return `${formatDate(start)} - ${formatDate(end)}`;
    };

    return (
        <div className="mt-[-90px] text-custom-font-gray">
            <div className="flex gap-2 mb-2">
                <p
                    className="flex shadow-bottom p-2 rounded-lg items-center w-1/2"
                    onClick={() => navigate("/search/step1")}
                >
                    <CalendarIcon />
                    <span className="ml-3 text-xs">
                        {dateRange && dateRange.length === 2
                            ? formatDateRange(dateRange[0], dateRange[1])
                            : "날짜"}
                    </span>
                </p>
                <p
                    className="flex shadow-bottom p-2 rounded-lg items-center w-1/2"
                    onClick={() => navigate("/search/step2")}
                >
                    <LocationIcon />
                    <span className="ml-3 text-xs">{location || "지역"}</span>
                </p>
            </div>
            <p
                className="flex shadow-bottom p-2 relative rounded-lg"
                onClick={() => navigate("/search/step3")}
            >
                <span>{keyword || "키워드"}</span>
                <button
                    className="absolute right-2"
                    onClick={(e) => {
                        e.stopPropagation();
                        resetSearch();
                    }}
                >
                    <CloseIcon />
                </button>
            </p>
            <div className="mt-4">
                {isLoading ? (
                    <p>검색 중입니다...</p>
                ) : festivals.length > 0 ? (
                    <>
                        <p>검색 결과: {festivals.length}개</p>
                        <CardList items={festivals} />
                    </>
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </div>
        </div>
    );
}
