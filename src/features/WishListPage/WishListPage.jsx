import { useEffect, useState } from "react";
import { getFestivalDetail } from "../../network/publicData";
import { CardList } from "../../components/CardList";

export default function WishListPage() {
    const [wishListItems, setWishListItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishListItems = async () => {
            const wishedItems = JSON.parse(
                localStorage.getItem("wishedItems") || "[]"
            );

            try {
                const itemPromises = wishedItems.map((item) =>
                    getFestivalDetail(item.id)
                );
                const itemsData = await Promise.all(itemPromises);

                const formattedItems = itemsData.map((response, index) => {
                    const item = response.response.body.items.item[0];
                    const [eventstartdate, eventenddate] =
                        wishedItems[index].date.split("~");
                    return {
                        contentid: item.contentid,
                        firstimage: item.firstimage,
                        title: item.title,
                        eventstartdate,
                        eventenddate,
                        addr1: item.addr1,
                        addr2: item.addr2,
                    };
                });

                setWishListItems(formattedItems);
            } catch (error) {
                console.error("Error fetching wish list items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishListItems();
    }, []);

    if (loading) {
        return <div className="dark:text-white">로딩중...</div>;
    }

    return (
        <div className="mt-[-40px] dark:text-white">
            {wishListItems.length > 0 ? (
                <CardList items={wishListItems} />
            ) : (
                <p className="dark:text-white">찜한 축제가 없습니다</p>
            )}
        </div>
    );
}
