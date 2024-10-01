import { useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import { WishFullIcon } from "./ui/icon";
import { useEffect, useState } from "react";

export function Card({ id, img, title, date, location }) {
    const navigate = useNavigate();
    const [isWished, setIsWished] = useState(false);

    useEffect(() => {
        const wishedItems = JSON.parse(
            localStorage.getItem("wishedItems") || "[]"
        );
        setIsWished(wishedItems.includes(id));
    }, [id]);

    const handleCardClick = () => {
        navigate(`detail/${id}`);
    };

    const handleWishClick = (e) => {
        e.stopPropagation();
        const wishedItems = JSON.parse(
            localStorage.getItem("wishedItems") || "[]"
        );

        if (isWished) {
            const updatedItems = wishedItems.filter((item) => item !== id);
            localStorage.setItem("wishedItems", JSON.stringify(updatedItems));
        } else {
            wishedItems.push(id);
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
