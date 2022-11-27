import { v4 } from "uuid";
import {
    About,
    Contact,
    Customers,
    FourBoxes,
    Layout,
    ModelSwiper,
    SwiperTemplate,
} from "../components";
import { useLang } from "../context";
import { checkJWTcookie, ServerSideErrorHandler } from "../lib";
import { getOne } from "../services";

export async function getServerSideProps(context) {
    const jwt = checkJWTcookie(context);
    if (!jwt) return ServerSideErrorHandler(context, { status: 401 });
    const { data, error } = await getOne({
        hostname: context.req.headers.host,
        type: "main",
        name: "main",
        token: jwt,
    });
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
        <Layout className={"gap-16 lg:gap-24 2xl:gap-32"}>
            <section className="w-full h-full gap-4 sm:flex sm:h-96 md:h-120 lg:h-128 xl:h-158 2xl:h-216 aspect-3/4">
                <SwiperTemplate
                    autoplay
                    delay={10}
                    items={
                        pageData?.data?.swiper
                            ? pageData?.data?.swiper.map((img) => {
                                  return (
                                      <img
                                          key={img?._id}
                                          alt={img?.name}
                                          src={img?.sizes?.original}
                                          className="w-full h-full object-fill"
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
            <div className="text-3xl 2xl:text-4xl text-center font-bold">
                {langData.latest.toUpperCase()}
            </div>
            <section>
                <ModelSwiper
                    className="pt-6"
                    models={pageData?.images}
                    size={16}
                    showCode
                    activeLink
                />
            </section>
            <About
                card={{
                    description: pageData?.data?.about?.content,
                    previewImg: pageData?.data?.about?.cover?.sizes?.original,
                    title: pageData?.data?.about?.title,
                }}
            />
            <div className="text-3xl 2xl:text-4xl text-center ">
                {langData.customers.toUpperCase()}
            </div>
            <Customers imageList={pageData?.data?.customers || []} />
            <section id="contact" className="w-full relative">
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
