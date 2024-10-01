import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { WishFullIcon } from "./ui/icon";
import { useEffect, useState } from "react";

export function Card({ id, img, title, date, location }) {
    const navigate = useNavigate();
    const [isWished, setIsWished] = useState(false);
    // TODO: 좋아요 기능으로 contentid 저장할때 날짜도 같이 저장하기

    useEffect(() => {
        const wishedItems = JSON.parse(
            localStorage.getItem("wishedItems") || "[]"
        );
        setIsWished(wishedItems.some((item) => item.id === id));
    }, [id]);

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
        // TODO: 카드 컴포넌트 축제 상태 처리하기
        <div className="w-full relative mb-6 " onClick={handleCardClick}>
            <div className="w-full h-64 overflow-hidden">
                <img
                    src={img}
                    alt="축제 썸네일"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <Button text="축제중" classes="absolute top-0 mt-3 ml-3" />
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
