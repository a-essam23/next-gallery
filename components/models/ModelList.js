import { v4 } from "uuid";
import Model from "./Model";

export default function ModelList({
    models,
    AlbumClassName,
    showCode,
    activeLink,
    useOriginal = true,
}) {
    return (
        <>
            {models.map((mnodel) => (
                <Model
                    useOriginal={useOriginal}
                    showCode={showCode}
                    key={v4()}
                    data={mnodel}
                    className={AlbumClassName}
                    activeLink={activeLink}
                />
            ))}
        </>
    );
}
