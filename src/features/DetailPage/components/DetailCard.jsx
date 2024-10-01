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

export function DetailCard({ data, date }) {
    // TODO: 없는 이미지 처리하기
    // TODO: 찜 기능 처리하기
    const navigate = useNavigate();
    const [isWished, setIsWished] = useState(false);

    useEffect(() => {
        const wishedItems = JSON.parse(
            localStorage.getItem("wishedItems") || "[]"
        );
        setIsWished(wishedItems.some((item) => item.id === data.contentid));
    }, [data.contentid]);

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
                        src={data.firstimage}
                        alt="축제 썸네일"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <Button text="축제중" classes="absolute top-0 mt-3 ml-3" />
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
