import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import {
    ArrowBack,
    CalendarIcon,
    CallIcon,
    LocationIcon,
    WishFullIcon,
} from "../../../components/ui/icon";
import { useEffect, useState } from "react";
import thumbnail from "../../../assets/thumbnail.png";

export function DetailCard({ data, date }) {
    const navigate = useNavigate();
    const [isWished, setIsWished] = useState(false);
    const [festivalStatus, setFestivalStatus] = useState("예정");

    useEffect(() => {
        const wishedItems = JSON.parse(
            localStorage.getItem("wishedItems") || "[]"
        );
        setIsWished(wishedItems.some((item) => item.id === data.contentid));
        const [startDate, endDate] = date.split("~");
        const today = new Date();
        const festivalStart = new Date(
            startDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
        );
        const festivalEnd = new Date(
            endDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
        );

        if (today >= festivalStart && today <= festivalEnd) {
            setFestivalStatus("개최중");
        } else if (today > festivalEnd) {
            setFestivalStatus("종료");
        } else {
            setFestivalStatus("예정");
        }
    }, [data.contentid, date]);

    const handleWishClick = () => {
        const wishedItems = JSON.parse(
            localStorage.getItem("wishedItems") || "[]"
        );

        if (isWished) {
            const updatedItems = wishedItems.filter(
                (item) => item.id !== data.contentid
            );
            localStorage.setItem("wishedItems", JSON.stringify(updatedItems));
        } else {
            wishedItems.push({ id: data.contentid, date });
            localStorage.setItem("wishedItems", JSON.stringify(wishedItems));
        }

        setIsWished(!isWished);
    };

    const getImageSource = () => {
        if (data.firstimage && data.firstimage !== "") {
            return data.firstimage;
        }
        return thumbnail;
    };

    return (
        <div>
            <button className="absolute" onClick={() => navigate("/")}>
                <ArrowBack />
            </button>
            <h2 className="text-base font-bold text-center mb-6">
                {data.title}
            </h2>
            <div className="w-full relative mb-6">
                <div className="w-full h-64 overflow-hidden mb-3">
                    <img
                        src={getImageSource()}
                        alt="축제 썸네일"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <Button
                    text={festivalStatus}
                    bgColor={
                        festivalStatus === "개최중"
                            ? "bg-custom-orange"
                            : festivalStatus === "예정"
                            ? "bg-custom-blue"
                            : "bg-gray-500"
                    }
                    classes="absolute top-0 mt-3 ml-3"
                />
                <button
                    className={`absolute top-0 right-0 mt-3 mr-3 ${
                        isWished
                            ? "text-custom-orange"
                            : "text-white opacity-80"
                    }`}
                    onClick={handleWishClick}
                >
                    <WishFullIcon />
                </button>
                <p className="text-sm text-custom-font-gray flex mb-2 items-center">
                    <CalendarIcon />
                    <span className="ml-2"> {date}</span>
                </p>
                <p className="text-sm text-custom-font-gray flex mb-2 items-center">
                    <LocationIcon />
                    <span className="ml-2">
                        {data.addr1} {data.addr2}
                    </span>
                </p>
                <p className="text-sm text-custom-font-gray flex mb-2 items-center">
                    <CallIcon />
                    <span className="ml-2"> {data.tel}</span>
                </p>
                <p>{data.overview}</p>
            </div>
        </div>
    );
}
