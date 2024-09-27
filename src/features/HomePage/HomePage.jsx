import { useEffect, useState } from "react";
import { CardList } from "../../components";
import { getFestivalData } from "../../network/publicData";
import useRegionStore from "../../store/regionStore";

export default function HomePage() {
    // TODO: 무한 스크롤 구현
    const [festivalData, setFestivalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const selectedRegion = useRegionStore((state) => state.selectedRegion);
    useEffect(() => {
        const fetchData = async () => {
            try {
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
                let response;
                if (selectedRegion === "0") {
                    response = await getFestivalData(currentDate, oneYearLater);
                } else {
                    response = await getFestivalData(
                        currentDate,
                        oneYearLater,
                        selectedRegion
                    );
                }
                setFestivalData(response.response.body.items.item);
                setLoading(false);
            } catch (e) {
                setError("데이터를 불러오는 데 실패했습니다.");
                console.log(e);
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedRegion]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <CardList items={festivalData} />
        </div>
    );
}
