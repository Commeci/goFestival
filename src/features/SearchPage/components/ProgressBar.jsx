import { useLocation } from "react-router-dom";

export function ProgressBar() {
    const location = useLocation();

    const getCurrentStep = () => {
        if (location.pathname.includes("step1")) return 1;
        if (location.pathname.includes("step2")) return 2;
        if (location.pathname.includes("step3")) return 3;
        return 0; // 기본값 또는 에러 처리
    };

    const currentStep = getCurrentStep();

    const getWidth = () => {
        switch (currentStep) {
            case 1:
                return "0%";
            case 2:
                return "50%";
            case 3:
                return "100%";
            default:
                return "0%";
        }
    };

    return (
        <div className="w-[90%] bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 m-auto mt-8 relative">
            <div
                className="bg-custom-orange h-1.5 rounded-full transition-all duration-300"
                style={{ width: getWidth() }}
            ></div>
            <div className="absolute w-full top-[-22px] flex justify-between">
                <div
                    className="flex flex-col items-center relative"
                    style={{ left: "-10px" }}
                >
                    <span className="text-xs mb-2">날짜</span>
                    <div className="w-5 h-5 bg-custom-orange rounded-full absolute bottom-[-12px]"></div>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-xs mb-2">지역</span>
                    <div
                        className={`w-5 h-5 rounded-full absolute bottom-[-12px] ${
                            currentStep >= 2
                                ? "bg-custom-orange"
                                : "bg-gray-200"
                        }`}
                    ></div>
                </div>
                <div
                    className="flex flex-col items-center relative"
                    style={{ right: "-10px" }}
                >
                    <span className="text-xs mb-2">키워드</span>
                    <div
                        className={`w-5 h-5 rounded-full absolute bottom-[-12px] ${
                            currentStep >= 3
                                ? "bg-custom-orange"
                                : "bg-gray-200"
                        }`}
                    ></div>
                </div>
            </div>
        </div>
    );
}
