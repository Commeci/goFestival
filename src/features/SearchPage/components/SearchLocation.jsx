import { regionList } from "../../../constants/regionList";
import { ProgressBar } from "./ProgressBar";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import useSearchStore from "../../../store/searchStore";

export function SearchLocation() {
    const { location, setLocation } = useSearchStore();
    const navigate = useNavigate();

    const handleRegionSelect = (region) => {
        setLocation(region.name);
        navigate("/search/step3");
    };

    const handleSkip = () => {
        setLocation("전체");
        navigate("/search/step3");
    };

    return (
        <div className="flex flex-col h-[calc(100vh-250px)]">
            <div className="mt-[-90px] flex-grow overflow-hidden">
                <ProgressBar />
                <div className="flex-1 overflow-y-auto h-[calc(100vh-250px)] mt-10">
                    <div className="flex flex-col items-center rounded-lg shadow-bottom">
                        {regionList.map((region) => (
                            <button
                                key={region.code}
                                className={`w-full p-6 text-lg border-b-2 border-custom-lightgray overflow-hidden ${
                                    location === region.name
                                        ? "bg-custom-orange text-white"
                                        : "bg-white text-custom-font"
                                }`}
                                onClick={() => handleRegionSelect(region)}
                            >
                                {region.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="p-4 max-w-[480px] mx-auto w-full fixed bottom-20 left-0 right-0 flex justify-between">
                <Button
                    text="이전"
                    bgColor="bg-custom-font-lightgray"
                    fontSize="text-xs"
                    onClick={() => navigate("/search/step1")}
                />
                <Button
                    text="건너뛰기"
                    fontSize="text-xs"
                    onClick={handleSkip}
                />
            </div>
        </div>
    );
}
