import { v4 } from "uuid";
import {
    About,
    Contact,
    FourBoxes,
    Layout,
    ModelSwiper,
    SwiperTemplate,
} from "../components";
import { useAuth, useLang } from "../context";
import { checkJWTcookie, ServerSideErrorHandler } from "../lib";
import { getOne } from "../services";

export async function getServerSideProps(context) {
    const jwt = checkJWTcookie(context);
    if (!jwt) return ServerSideErrorHandler(context, { status: 401 });
    const { data, error } = await getOne(
        context.req.headers.host,
        "main",
        "main",
        jwt
    );
    if (error) return ServerSideErrorHandler(context, error);

    // const models = [
    //     {
    //         image: "/imgs/placeholder.jpg",
    //         folder: "Collection1",
    //         name: `Model1`,
    //         _id: 0,
    //     },
    //     {
    //         image: "/imgs/placeholder.jpg",
    //         folder: "Collection1",
    //         name: `Model2`,
    //         _id: 1,
    //     },
    //     {
    //         image: "/imgs/placeholder.jpg",
    //         folder: "Collection1",
    //         name: `Model3`,
    //         _id: 2,
    //     },
    //     {
    //         image: "/imgs/placeholder.jpg",
    //         folder: "Collection1",
    //         name: `Model4`,
    //         _id: 3,
    //     },
    // ];

    // const imageList = [
    //     "/imgs/blank-blue.jpg",
    //     "/imgs/blank.jpg",
    //     "/imgs/blank-blue.jpg",
    //     "/imgs/blank.jpg",
    //     "/imgs/blank-blue.jpg",
    //     "/imgs/blank.jpg",
    //     "/imgs/blank-blue.jpg",
    //     "/imgs/blank.jpg",
    //     "/imgs/blank-blue.jpg",
    //     "/imgs/blank.jpg",
    //     "/imgs/blank-blue.jpg",
    //     "/imgs/blank.jpg",
    //     "/imgs/blank-blue.jpg",
    //     "/imgs/blank.jpg",
    //     "/imgs/blank-blue.jpg",
    //     "/imgs/blank.jpg",
    //     "/imgs/blank-blue.jpg",
    //     "/imgs/blank.jpg",
    //     "/imgs/blank-blue.jpg",
    //     "/imgs/blank.jpg",
    //     "/imgs/blank-blue.jpg",
    //     "/imgs/blank.jpg",
    //     "/imgs/blank-blue.jpg",
    //     "/imgs/blank.jpg",
    //     "/imgs/blank-blue.jpg",
    // ];
    return {
        props: {
            pageData: data.data || { groups: [], models: [], data: {} },
        },
    };
}

export default function Home({ pageData }) {
    const { langData } = useLang();
    return (
        <Layout>
            <section className="w-full h-full gap-4 sm:flex sm:h-96 md:h-120 xl:h-144 2xl:h-216">
                <SwiperTemplate
                    autoplay
                    delay={10}
                    items={
                        pageData?.data?.swiper
                            ? pageData?.data?.swiper.map((img) => {
                                  return (
                                      <img
                                          alt={img?.name}
                                          src={img?.sizes?.original}
                                          className="w-full h-full object-cover"
                                      />
                                  );
                              })
                            : []
                    }
                    className="sm:basis-3/5 h-96 sm:h-full w-full shadow-cd center "
                />
                <FourBoxes
                    activeLink
                    groups={pageData?.groups}
                    className="my-12 h-120 sm:h-full sm:my-0 sm:basis-2/5 "
                />
            </section>
            <section className="text-3xl 2xl:text-4xl text-center ">
                {langData.latest.toUpperCase()}
            </section>
            <section>
                <ModelSwiper
                    models={pageData?.images}
                    size={16}
                    showCode
                    activeLink
                />
            </section>
            <section id="about">
                <About
                    imageList={pageData?.data?.customers || []}
                    card={{
                        description: pageData?.data?.about?.content,
                        previewImg:
                            pageData?.data?.about?.cover?.sizes?.original,
                        title: pageData?.data?.about?.title,
                    }}
                />
            </section>
            <section id="contact">
                <Contact
                    hrefs={{
                        facebook: pageData?.data?.contact?.facebook,
                        whatsapp: pageData?.data?.contact?.whatsapp,
                        pinterest: pageData?.data?.contact?.pinterest,
                    }}
                />
            </section>
        </Layout>
    );
}
