import { Card } from "./Card";
import thumbnail from "../assets/thumbnail.png";

export function CardList({ items }) {
    return (
        <div>
            {items.map((item) => (
                <Card
                    key={item.contentid}
                    img={
                        item.firstimage && item.firstimage !== ""
                            ? item.firstimage
                            : thumbnail
                    }
                    title={item.title}
                    date={`${item.eventstartdate}~${item.eventenddate}`}
                    location={`${item.addr1} ${item.addr2}`.trim()}
                />
            ))}
        </div>
    );
}
