import { useLocation, useParams } from "react-router-dom";
import { DetailCard } from "./components/DetailCard";
import { MapArea } from "./components/MapArea";
import { useEffect, useState } from "react";
import { getFestivalDetail } from "../../network/publicData";
import { Spinner } from "../../components";

export default function DetailPage() {
    const { id } = useParams();
    const location = useLocation();
    const date = location.state?.date;
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

    if (loading) return <Spinner />;
    if (error) return <div className="dark:text-white">Error: {error}</div>;

    return (
        <div className="mt-[-35px]">
            <DetailCard data={festivalDetail} date={date} />
            <MapArea mapx={festivalDetail.mapx} mapy={festivalDetail.mapy} />
        </div>
    );
}
