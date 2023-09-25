import { useRouter } from "next/router";
import { EmptyPlaceHolder, Layout, Model, ModelInfo } from "../../components";
import axios from "@services/axios";
import { ErrorTypes, SSEH } from "@/lib/serverSideErrorHandler";
import ImageGridSection from "@components/img-grid";
import Card from "@components/card";
import { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Modal } from "antd";
import Modal from "@components/modal";
import ModelDetails from "@components/models/model-details";
import { v4 } from "uuid";

export async function getServerSideProps(context: any) {
    const folderName = context.query.folder_name;
    const { data, error } = await axios.get(
        `${process.env.HOST}/api/v1/folder?name=${folderName}&populate=nodes`
    );
    if (error) return SSEH(context, error.status as ErrorTypes);
    return {
        props: {
            folder: data || {},
            focus: context.query?.swipeRef || null,
        }, // will be passed to the page component as props
    };
}

export default function ServerPage({
    folder = { name: "", nodes: [] },
    focus = null,
}) {
    const [isShown, setIsShown] = useState(false);
    const [slideIndex, setSlideIndex] = useState(-1);
    const router = useRouter();

    return (
        <Layout title={folder.name} className="">
            <ImageGridSection>
                {folder.nodes.map((model: any) => (
                    <Card
                        key={v4()}
                        onClick={() => {
                            setSlideIndex(
                                folder.nodes.findIndex(
                                    (img: any) => img._id === model._id
                                )
                            );
                            setIsShown(true);
                        }}
                        name={model.name}
                        src={model.details.cover}
                        parent={folder.name}
                    />
                ))}
            </ImageGridSection>
            <Modal
                visible={isShown}
                setVisible={setIsShown}
                className="lg:justify-center lg:items-center flex bg-white z-20 overflow-y-scroll no-scrollbar lg:overflow-y-hidden rounded"
            >
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
                    {folder.nodes.map((model: any) => (
                        <SwiperSlide key={model._id} className="">
                            <ModelDetails data={model} className="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Modal>
            {isShown && false && (
                <>
                    <div
                        className="fixed bg-black opacity-50 w-screen h-screen left-0 top-0 cursor-pointer z-10 overflow-hidden"
                        onClick={() => {
                            setIsShown(false);
                        }}
                    ></div>
                    <div className="h-4/5 lg:h-auto max-w-11/12 w-11/12 sm:w-9/12 md:w-8/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 lg:justify-center lg:items-center flex bg-white rounded-3xl m-auto z-20 fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 overflow-y-scroll no-scrollbar lg:overflow-y-hidden">
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
                            {folder.nodes.map((model: any) => (
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
        </Layout>
    );
}
