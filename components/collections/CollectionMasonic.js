import { Masonry, useInfiniteLoader } from "masonic";
import { useCallback, useEffect, useState } from "react";
import Collection from "./Collection";

export default function CollectionMasonic({ collections = [], amount = 10 }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(collections);
        // eslint-disable-next-line
    }, [items]);

    const maybeLoadMore = useInfiniteLoader(
        (startIndex, stopIndex, currentItems) => {
            try {
                console.log("CUTTING");
                const nextItems = collections.slice(startIndex, stopIndex);
                setItems((current) => [...current, ...nextItems]);
            } catch (e) {
                console.log(e);
            }
        },
        {
            isItemLoaded: (index, items) => !!items[index],
            minimumBatchSize: amount,
            threshold: amount,
        }
    );

    return (
        <>
            {collections.length > amount ? (
                <Masonry
                    columnGutter={16}
                    columnWidth={245}
                    items={items}
                    render={Collection}
                    onRender={maybeLoadMore}
                />
            ) : (
                <Masonry
                    columnGutter={16}
                    items={items}
                    columnWidth={245}
                    render={Collection}
                />
            )}
        </>
    );
}
