import { v4 } from "uuid";
import {
    About,
    Contact,
    FourBoxes,
    Layout,
    ModelSwiper,
    SwiperTemplate,
} from "../components";
import { useLang } from "../context";
import { getOne } from "../services";

export async function getServerSideProps(context) {
    const { data, error } = await getOne(
        context.req.headers.host,
        "group",
        "group1"
    );

    const models = [
        {
            image: "/imgs/placeholder.jpg",
            folder: "Collection1",
            name: `Model1`,
            _id: 0,
        },
        {
            image: "/imgs/placeholder.jpg",
            folder: "Collection1",
            name: `Model2`,
            _id: 1,
        },
        {
            image: "/imgs/placeholder.jpg",
            folder: "Collection1",
            name: `Model3`,
            _id: 2,
        },
        {
            image: "/imgs/placeholder.jpg",
            folder: "Collection1",
            name: `Model4`,
            _id: 3,
        },
    ];

    const imageList = [
        "/imgs/blank-blue.jpg",
        "/imgs/blank.jpg",
        "/imgs/blank-blue.jpg",
        "/imgs/blank.jpg",
        "/imgs/blank-blue.jpg",
        "/imgs/blank.jpg",
        "/imgs/blank-blue.jpg",
        "/imgs/blank.jpg",
        "/imgs/blank-blue.jpg",
        "/imgs/blank.jpg",
        "/imgs/blank-blue.jpg",
        "/imgs/blank.jpg",
        "/imgs/blank-blue.jpg",
        "/imgs/blank.jpg",
        "/imgs/blank-blue.jpg",
        "/imgs/blank.jpg",
        "/imgs/blank-blue.jpg",
        "/imgs/blank.jpg",
        "/imgs/blank-blue.jpg",
        "/imgs/blank.jpg",
        "/imgs/blank-blue.jpg",
        "/imgs/blank.jpg",
        "/imgs/blank-blue.jpg",
        "/imgs/blank.jpg",
        "/imgs/blank-blue.jpg",
    ];
    return {
        props: { groups: [], models, imageList }, // will be passed to the page component as props
    };
}

export default function Home({ groups = [], models, imageList }) {
    const { langData } = useLang();
    return (
        <Layout>
            <section className="w-full h-full gap-4 sm:flex sm:h-96 md:h-120 xl:h-144 2xl:h-216">
                <SwiperTemplate
                    showIndex
                    autoplay
                    delay={10}
                    items={Array(4)
                        .fill()
                        .map((i) => {
                            return (
                                <img
                                    alt={"swiper-template-placeholder"}
                                    key={v4()}
                                    src="/imgs/placeholder.jpg"
                                    className="h-full w-full object-cover"
                                />
                            );
                        })}
                    className="sm:basis-3/5 h-96 sm:h-full w-full shadow-cd center "
                />
                <FourBoxes
                    activeLink
                    groups={groups}
                    className="my-12 h-120 sm:h-full sm:my-0 sm:basis-2/5 "
                />
            </section>
            <section className="text-3xl 2xl:text-4xl text-center ">
                {langData.latest.toUpperCase()}
            </section>
            <section>
                <ModelSwiper models={models} size={16} showCode activeLink />
            </section>
            <section id="about">
                <About imageList={imageList} card={{}} />
            </section>
            <section id="contact">
                <Contact />
            </section>
        </Layout>
    );
}
