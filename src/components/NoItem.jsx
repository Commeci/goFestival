import { Warning } from "./ui/icon";

export function NoItem() {
    return (
        <div className="flex flex-col items-center justify-center h-full p-4 mt-36 text-center">
            <Warning />
            <div className="text-lg font-semibold text-custom-font-gray dark:text-custom-font-lightgray">
                검색 결과가 없습니다
            </div>
        </div>
    );
}
