import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 } from "uuid";
import {
    EmptyPlaceHolder,
    Layout,
    Model,
    ModelInfo,
    Searchbar,
} from "../../components";
import { checkJWTcookie, ServerSideErrorHandler } from "../../lib";
import { getOne } from "../../services";

export async function getServerSideProps(context) {
    const jwt = checkJWTcookie(context);
    if (!jwt) return ServerSideErrorHandler(context, { status: 401 });

    const { data, error } = await getOne({
        hostname: context.req.headers.host,
        type: "folder",
        name: context.query.collectionId,
        token: jwt,
        filter: "active=true",
    });

    if (error) return ServerSideErrorHandler(context, error);
    return {
        props: {
            models: data?.images || [],
            swipeRef: context.query?.swipeRef || null,
        }, // will be passed to the page component as props
    };
}

export default function ModelPage({ models = [], swipeRef = null }) {
    ////TODO SEARCHBARS
    const router = useRouter();
    const collectionId = router.query.collectionId;
    // const [searchParams, setSearchParams] = useSearchParams();
    // const [models, setmodels] = useState([]);
    const [isShown, setIsShown] = useState(swipeRef ? true : false);

    const [slideIndex, setSlideIndex] = useState(
        swipeRef ? models.findIndex((el) => el._id === swipeRef) : null
    );

    useEffect(() => {
        isShown
            ? (document.body.style.overflowY = "hidden")
            : (document.body.style.overflowY = "scroll");
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, [isShown]);

    return (
        <Layout>
            <Searchbar
                choices={["model"]}
                onFinish={(data) => {
                    setSearchParams({ [data.type]: data.value });
                }}
            />
            {/* {isLoading && <Spin size="large" />} */}
            {isShown && (
                <>
                    <div
                        className="fixed bg-black opacity-50 w-screen h-screen left-0 top-0 cursor-pointer z-10 overflow-hidden"
                        onClick={() => {
                            setIsShown(false);
                        }}
                    ></div>
                    <div className="h-4/5 lg:h-auto xl:max-h-160 2xl:max-h-232 w-11/12 sm:w-9/12 md:w-8/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 lg:justify-center lg:items-center flex bg-white rounded-3xl m-auto z-20 fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 overflow-y-scroll no-scrollbar lg:overflow-y-hidden">
                        <Swiper
                            onSwiper={(swiper) => {
                                swiper.slideTo(slideIndex, 0);
                            }}
                            navigation
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination, Navigation]}
                            className="flex justify-center items-center w-full h-full"
                        >
                            {models.map((model) => (
                                <SwiperSlide
                                    key={model._id}
                                    className="py-5 px-5 sm:px-10 md:px-12 lg:px-14 xl:py-0 xl:px-4 justify-center items-center flex h-full w-full"
                                >
                                    <ModelInfo data={model} className="" />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </>
            )}
            {models.length > 0 ? (
                <section className="xl:pt-8 grid auto-rows-fr grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 z-0">
                    {models.map((model, i) => (
                        <Model
                            key={v4()}
                            data={model}
                            onClick={(e) => {
                                setIsShown(true);
                                setSlideIndex(i);
                            }}
                        />
                    ))}
                </section>
            ) : (
                <EmptyPlaceHolder />
            )}
        </Layout>
    );
}
