import Button from "../../../components/ui/Button";
import {
    ArrowBack,
    CalendarIcon,
    CallIcon,
    LocationIcon,
    WishFullIcon,
} from "../../../components/ui/icon";

export function DetailCard() {
    return (
        <div>
            <button>
                <ArrowBack />
            </button>
            <h2>title</h2>
            <div className="w-full relative mb-6">
                <div className="w-full h-64 overflow-hidden">
                    <img
                        src=""
                        alt="축제 썸네일"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <Button text="축제중" classes="absolute top-0 mt-3 ml-3" />
                <button className="absolute top-0 right-0 mt-3 mr-3">
                    <WishFullIcon />
                </button>
                <p className="text-sm text-custom-font-gray">
                    <CalendarIcon />
                    <span>date</span>
                </p>
                <p className="text-sm text-custom-font-gray">
                    <LocationIcon />
                    <span>location</span>
                </p>
                <p className="text-sm text-custom-font-gray">
                    <CallIcon />
                    <span>call</span>
                </p>
                <p>text</p>
            </div>
        </div>
    );
}
