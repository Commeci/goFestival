import Button from "./ui/Button";
import { WishIcon } from "./ui/icon";

export function Card({ img, title, date, location }) {
    return (
        // TODO: 카드 컴포넌트 축제 상태 처리하기
        <div className="w-full relative mb-6">
            <div className="w-full h-64 overflow-hidden">
                <img
                    src={img}
                    alt="축제 썸네일"
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <Button text="축제중" classes="absolute top-0 mt-3 ml-3" />
            <button className="absolute top-0 right-0 mt-3 mr-3">
                <WishIcon />
            </button>
            <p className="text-base font-bold mt-3 mb-3 text-custom-font">
                {title}
            </p>
            <p className="text-sm text-custom-font-gray">{date}</p>
            <p className="text-sm text-custom-font-gray">{location}</p>
        </div>
    );
}
