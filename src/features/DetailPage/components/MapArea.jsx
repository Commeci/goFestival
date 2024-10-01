import { AroundCardList } from "./AroundCardList";
import { Map } from "./Map";

export function MapArea() {
    return (
        <div>
            <h3>주변 정보</h3>
            <Map />
            <AroundCardList />
        </div>
    );
}
