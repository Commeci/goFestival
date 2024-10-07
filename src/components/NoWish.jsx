import { WishIcon } from "./ui/icon";

export function NoWish() {
    return (
        <div className="flex flex-col items-center justify-center h-full mt-36 p-6">
            <i className="text-custom-font-gray dark: text-custom-font-lightgray">
                <WishIcon />
            </i>
            <div className="text-lg font-semibold text-center text-custom-font-gray dark: text-custom-font-lightgray">
                마음에 드는 축제를 지금 찜해보세요!
            </div>
        </div>
    );
}
