import { useEffect, useState, useCallback, useRef } from "react";
import { CardList } from "../../components";
import { getFestivalData } from "../../network/publicData";
import useRegionStore from "../../store/regionStore";
import { TopButtonIcon } from "../../components/ui/icon";

export default function HomePage() {
    const [festivalData, setFestivalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const selectedRegion = useRegionStore((state) => state.selectedRegion);
    const observer = useRef();

    const lastFestivalElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const fetchData = useCallback(
        async (pageNum) => {
            try {
                setLoading(true);
                const currentDate = new Date()
                    .toISOString()
                    .split("T")[0]
                    .replace(/-/g, "");
                const oneYearLater = new Date(
                    new Date().setFullYear(new Date().getFullYear() + 1)
                )
                    .toISOString()
                    .split("T")[0]
                    .replace(/-/g, "");

                const response = await getFestivalData(
                    currentDate,
                    oneYearLater,
                    selectedRegion,
                    pageNum
                );

                const newFestivals = response.response.body.items.item;
                if (Array.isArray(newFestivals)) {
                    setFestivalData((prevData) =>
                        pageNum === 1
                            ? newFestivals
                            : [...prevData, ...newFestivals]
                    );
                    setHasMore(newFestivals.length === 6);
                } else {
                    setHasMore(false);
                }
                setLoading(false);
            } catch (e) {
                setError("데이터를 불러오는 데 실패했습니다.");
                console.error(e);
                setLoading(false);
            }
        },
        [selectedRegion]
    );

    useEffect(() => {
        setFestivalData([]);
        setPage(1);
        setHasMore(true);
        fetchData(1);
    }, [selectedRegion, fetchData]);

    useEffect(() => {
        if (page > 1) {
            fetchData(page);
        }
    }, [page, fetchData]);

    if (error) return <div>{error}</div>;

    return (
        <div className="relative dark:bg-custom-darkmode mt-2">
            <CardList
                items={festivalData}
                lastElementRef={lastFestivalElementRef}
            />
            {loading && <div className="dark:text-white">로딩 중...</div>}
            {!hasMore && (
                <div className="p-2 rounded-lg bg-gray-300">
                    더 이상 불러올 데이터가 없습니다.
                </div>
            )}
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
