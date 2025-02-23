import { Card } from "./Card";
import thumbnail from "../assets/thumbnail.png";

export function CardList({ items, lastElementRef }) {
    return (
        <div>
            {items.map((item, index) => (
                <div
                    key={item.contentid}
                    ref={index === items.length - 1 ? lastElementRef : null}
                >
                    <Card
                        id={item.contentid}
                        img={
                            item.firstimage && item.firstimage !== ""
                                ? item.firstimage
                                : thumbnail
                        }
                        title={item.title}
                        date={`${item.eventstartdate}~${item.eventenddate}`}
                        location={`${item.addr1} ${item.addr2}`.trim()}
                    />
                </div>
            ))}
        </div>
    );
}
