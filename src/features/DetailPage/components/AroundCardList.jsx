import { AroundCard } from "./AroundCard";

export function AroundCardList({ places }) {
    if (!places || places.length === 0) {
        return (
            <div className="mt-4 text-center p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-600">
                    주변에 장소가 존재하지 않습니다.
                </p>
            </div>
        );
    }
    return (
        <div className="mt-4">
            <div className="flex flex-wrap -mx-2">
                {places.map((place, index) => (
                    <div key={index} className="w-1/2 px-2 mb-4">
                        <AroundCard
                            name={place.name}
                            distance={place.distance}
                            type={place.type}
                            lat={place.lat}
                            lng={place.lng}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
