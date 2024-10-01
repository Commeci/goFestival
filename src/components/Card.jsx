import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { WishFullIcon } from "./ui/icon";
import { useEffect, useState } from "react";

export function Card({ id, img, title, date, location }) {
    const navigate = useNavigate();
    const [isWished, setIsWished] = useState(false);
    const [festivalStatus, setFestivalStatus] = useState("예정");

    useEffect(() => {
        const wishedItems = JSON.parse(
            localStorage.getItem("wishedItems") || "[]"
        );
        setIsWished(wishedItems.some((item) => item.id === id));
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
    }, [id, date]);

    const handleCardClick = () => {
        navigate(`/detail/${id}`, { state: { date } });
    };

    const handleWishClick = (e) => {
        e.stopPropagation();
        const wishedItems = JSON.parse(
            localStorage.getItem("wishedItems") || "[]"
        );

        if (isWished) {
            const updatedItems = wishedItems.filter((item) => item.id !== id);
            localStorage.setItem("wishedItems", JSON.stringify(updatedItems));
        } else {
            wishedItems.push({ id, date });
            localStorage.setItem("wishedItems", JSON.stringify(wishedItems));
        }

        setIsWished(!isWished);
    };

    return (
        <div className="w-full relative mb-6 " onClick={handleCardClick}>
            <div className="w-full h-64 overflow-hidden">
                <img
                    src={img}
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
                    isWished ? "text-custom-orange" : "text-white opacity-80"
                }`}
                onClick={handleWishClick}
            >
                <WishFullIcon />
            </button>
            <p className="text-base font-bold mt-3 mb-3 text-custom-font">
                {title}
            </p>
            <p className="text-sm text-custom-font-gray">{date}</p>
            <p className="text-sm text-custom-font-gray">{location}</p>
        </div>
    );
}
