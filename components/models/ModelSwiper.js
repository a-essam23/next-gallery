import SwiperTemplate from "../utils/SwiperTemplate";
import ModelList from "./ModelList";

export default function ModelSwiper({
    models = [],
    size,
    showCode = false,
    autoplay = true,
}) {
    // const [albums, setAlbums] = useState([]);
    // setAlbums([]);

    // for (let i = 0; i < albums.length; i += 4) {
    //     albumsArr.push(albums.slice(i, i + 4));
    // }
    let modelsArr = [];
    let temp = [];
    for (let i = 0; i < size; i++) {
        if (modelsArr[i]) {
            temp.push(modelsArr[i]);
        } else {
            temp.push({
                image: "/imgs/placeholder.jpg",
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
                    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 p-4 mb-8 ">
                        <ModelList
                            showCode={showCode}
                            AlbumClassName="h-64 sm:h-64 md:h-72 xl:h-96 2xl:h-144"
                            models={collection}
                        />
                    </div>
                );
            })}
        />
    );
}
