import { AroundCard } from "./AroundCard";

export function AroundCardList({ places }) {
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
