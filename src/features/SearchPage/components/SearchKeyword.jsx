import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import { ProgressBar } from "./ProgressBar";
import { useState } from "react";

export function SearchKeyword() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    return (
        <div className="flex flex-col h-[calc(100vh-250px)">
            <div className="mt-[-90px] flex-grow">
                <ProgressBar />
                <div className="mt-10 px-4">
                    <p className="mb-5">검색하고 싶은 키워드를 입력하세요</p>
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="ex) 강원, 벚꽃"
                        className="w-full p-4 border shadow-bottom rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-orange"
                    />
                </div>
            </div>
            <div className="p-4 fixed max-w-[480px] mx-auto w-full bottom-20 left-0 right-0 flex justify-between">
                <Button
                    text="이전"
                    bgColor="bg-custom-font-lightgray"
                    fontSize="text-xs"
                    onClick={() => navigate("/search/step2")}
                />
                <Button
                    text="검색"
                    fontSize="text-xs"
                    onClick={() => navigate("/search")}
                />
            </div>
        </div>
    );
}
