import { useNavigate } from "react-router-dom";
import {
    CalendarIcon,
    CloseIcon,
    LocationIcon,
    TopButtonIcon,
} from "../../components/ui/icon";
import useSearchStore from "../../store/searchStore";
import { CardList } from "../../components/CardList";
import { getFestivalData } from "../../network/publicData";
import { useEffect, useState, useCallback, useRef } from "react";
import { regionList } from "../../constants/regionList";

export default function SearchPage() {
    const navigate = useNavigate();
    const { dateRange, location, keyword, setSearchResults, resetSearch } =
        useSearchStore();

    const [isLoading, setIsLoading] = useState(true);
    const [festivals, setFestivals] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef();
    const lastFestivalElementRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    const fetchData = useCallback(
        async (pageNum) => {
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
                    areaCode,
                    pageNum
                );

                const newFestivals = results.response.body.items.item || [];
                if (Array.isArray(newFestivals)) {
                    setFestivals((prevFestivals) =>
                        pageNum === 1
                            ? newFestivals
                            : [...prevFestivals, ...newFestivals]
                    );
                    setHasMore(newFestivals.length === 6);
                } else {
                    setHasMore(false);
                }

                if (pageNum === 1) {
                    setSearchResults(results);
                }
            } catch (error) {
                console.error("Error searching festivals:", error);
                if (pageNum === 1) {
                    setFestivals([]);
                }
            } finally {
                setIsLoading(false);
            }
        },
        [dateRange, location, keyword, setSearchResults]
    );

    useEffect(() => {
        setFestivals([]);
        setPage(1);
        setHasMore(true);
        fetchData(1);
    }, [dateRange, location, keyword, fetchData]);

    useEffect(() => {
        if (page > 1) {
            fetchData(page);
        }
    }, [page, fetchData]);

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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
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
                {festivals.length > 0 ? (
                    <>
                        <p>검색 결과: {festivals.length}개</p>
                        <CardList
                            items={festivals}
                            lastElementRef={lastFestivalElementRef}
                        />
                    </>
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
                {isLoading && <p>검색 중입니다...</p>}
                {!hasMore && festivals.length > 0 && (
                    <p className="p-2 bg-gray-300 rounded-lg">
                        더 이상 결과가 없습니다.
                    </p>
                )}
            </div>
            <div className="fixed bottom-32 left-1/2 transform -translate-x-1/2 w-full max-w-[480px]">
                <button
                    className="text-white absolute w-10 h-10 right-4 p-2 bg-custom-orange rounded-full shadow-md"
                    onClick={scrollToTop}
                >
                    <TopButtonIcon />
                </button>
            </div>
        </div>
    );
}
