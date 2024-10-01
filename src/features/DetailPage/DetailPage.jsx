import { useParams } from "react-router-dom";
import { DetailCard } from "./components/DetailCard";
import { MapArea } from "./components/MapArea";
import { useEffect, useState } from "react";
import { getFestivalDetail } from "../../network/publicData";

export default function DetailPage() {
    const { id } = useParams();
    const [festivalDetail, setFestivalDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFestivalDetail = async () => {
            try {
                const data = await getFestivalDetail(id);
                setFestivalDetail(data.response.body.items.item[0]);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFestivalDetail();
    }, [id]);

    if (loading) return <div>로딩중...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="mt-[-40px]">
            <DetailCard data={festivalDetail} />
            <MapArea mapx={festivalDetail.mapx} mapy={festivalDetail.mapy} />
        </div>
    );
}
