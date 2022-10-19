import { v4 as uuidv4 } from "uuid";
import Collection from "./Collection";

export default function CollectionList({ collections }) {
    return (
        <>
            {collections.map((collection) => (
                <Collection key={uuidv4()} data={collection} />
            ))}
        </>
    );
}
