import { v4 } from "uuid";
import SwiperTemplate from "../utils/SwiperTemplate";
import ModelList from "./ModelList";

export default function ModelSwiper({
    models = [],
    size,
    activeLink = false,
    showCode = false,
    autoplay = true,
    className = "",
}) {
    // const [albums, setAlbums] = useState([]);
    // setAlbums([]);

    // for (let i = 0; i < albums.length; i += 4) {
    //     albumsArr.push(albums.slice(i, i + 4));
    // }
    let modelsArr = [];
    let temp = [];
    for (let i = 0; i < size; i++) {
        if (models[i]) {
            temp.push(models[i]);
        } else {
            temp.push({
                image: "/imgs/blank.jpg",
                folder: "",
                name: i + 1,
            });
        }
        if (temp.length === 4) {
            modelsArr.push(temp);
            temp = [];
        }
    }
    return (
        <SwiperTemplate
            pagination
            autoplay={autoplay}
            items={modelsArr.map((collection) => {
                return (
                    <div
                        key={v4()}
                        className={`grid gap-8 grid-cols-2 lg:grid-cols-4 pb-12 ${className}`}
                    >
                        <ModelList
                            activeLink={activeLink}
                            showCode={showCode}
                            AlbumClassName=" relative"
                            models={collection}
                        />
                    </div>
                );
            })}
        />
    );
}
