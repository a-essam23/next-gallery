import {
    AdminLayout,
    FourBoxes,
    ImageInputWall,
    ModelSwiper,
    Loading,
    Message,
} from "../../components";
import { Button, Form, Input, Select } from "antd";
import { useLang } from "../../context";
import TextArea from "antd/lib/input/TextArea";
import Dragger from "antd/lib/upload/Dragger";
import { checkJWTcookie, ServerSideErrorHandler } from "../../lib";
import { getOne } from "../../services";
import { useEffect, useState } from "react";
import { useFetch } from "../../hooks";

export async function getServerSideProps(context) {
    const jwt = checkJWTcookie(context);
    if (!jwt) {
        return {
            redirect: {
                permenant: false,
                destination: "/login",
                source: context.req.headers?.referer,
            },
        };
    }
    const { data, error } = await getOne(
        context.req.headers.host,
        "main",
        "main",
        jwt
    );
    if (error) return ServerSideErrorHandler(context, error);
    // let allGroups = [];
    // for (let i = 0; i < 4; i++) {
    //     allGroups.push({
    //         image: "/imgs/placeholder.jpg",
    //         name: `GROUP${i + 1}`,
    //         id: i,
    //     });
    // }
    // const allModels = [
    //     {
    //         image: "/imgs/placeholder.jpg",
    //         folder: "Collection1",
    //         name: `Model1`,
    //         id: "00",
    //     },
    //     {
    //         image: "/imgs/placeholder.jpg",
    //         folder: "Collection1",
    //         name: `Model2`,
    //         id: "10",
    //     },
    //     {
    //         image: "/imgs/placeholder.jpg",
    //         folder: "Collection1",
    //         name: `Model3`,
    //         id: "20",
    //     },
    //     {
    //         image: "/imgs/placeholder.jpg",
    //         folder: "Collection1",
    //         name: `Model4`,
    //         id: "30",
    //     },
    // ];

    // const content = {
    //     names: "Roman Gallery",
    //     title: "",
    //     logo: "",
    //     images: [],
    //     image: "",
    //     groups: [
    //         {
    //             image: "/imgs/placeholder.jpg",
    //             name: `GROUP1`,
    //             id: 0,
    //         },
    //     ],
    //     images: [
    //         {
    //             image: "/imgs/placeholder.jpg",
    //             name: `MODEL1`,
    //             id: "00",
    //         },
    //     ],
    //     data: {
    //         swiper: [
    //             { id: v4(), image: "/imgs/placeholder.jpg", name: "1" },
    //             { id: v4(), image: "/imgs/blank-blue.jpg", name: "2" },
    //             { id: v4(), image: "/imgs/empty.png", name: "3" },
    //         ],
    //     },
    //     facebook: "",
    //     whatsapp: "",
    //     pinterest: "",
    // };
    return {
        props: { pageData: data?.data || null }, // will be passed to the page component as props
    };
}
//// TODO SPLIT ABOUT US PAGE INTO DIFFERENT COMPONENTS
export default function AdminPage({
    pageData = { groups: [], images: [], data: {} },
}) {
    //// ADD SMARTER SEARCH FOR MODELS SELECt
    const { langData } = useLang();
    const [mainData, setMainData] = useState(pageData);
    const [allGroups, setAllGroups] = useState([]);
    const [allModels, setAllModels] = useState([]);
    const { msg, isLoading, handleUpload, handleDelete, handleGetAll } =
        useFetch();

    useEffect(() => {
        handleGetAll("group").then(({ data, error }) =>
            setAllGroups(data || [])
        );
        handleGetAll("image").then(({ data, error }) =>
            setAllModels(data || [])
        );

        // return () => {};
        // eslint-disable-next-line
    }, []);

    return (
        <AdminLayout title="Admin" className="">
            <div className="flex justify-center h-16 pb-2">
                <Button
                    className="bg-blue-600 h-full text-white w-full"
                    size="large"
                    type="primary"
                    onClick={() => {
                        console.log(mainData);
                    }}
                >
                    Save
                </Button>
            </div>
            <Loading isLoading={isLoading} />
            <Message icon options={msg} size="lg" />
            <section className="w-full h-full gap-4 sm:flex sm:h-96 md:h-120 xl:h-144  ">
                <div className="sm:basis-3/5 h-96 sm:h-full w-full center shadow-cd">
                    <ImageInputWall
                        type={"image"}
                        images={pageData.data?.swiper}
                        onFinish={(imageList) => {
                            setMainData({
                                ...mainData,
                                data: { ...mainData.data, swiper: imageList },
                            });
                        }}
                    />
                </div>
                <div className="sm:basis-2/5 h-96 sm:h-full w-full center flex flex-col gap-2">
                    <Select
                        mode="multiple"
                        className="w-full"
                        onChange={(gps) => {
                            setMainData({ ...mainData, groups: gps });
                        }}
                        defaultValue={
                            pageData?.groups?.length
                                ? pageData.groups.map((gp) => gp._id)
                                : []
                        }
                    >
                        {allGroups.map((gp) => {
                            return (
                                <Select.Option key={gp._id} value={gp._id}>
                                    {gp.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                    <FourBoxes groups={pageData?.groups} />
                </div>
            </section>
            <section className="text-3xl 2xl:text-4xl text-center ">
                {langData.latest.toUpperCase()}
            </section>
            <section>
                <Select
                    mode="multiple"
                    className="w-full"
                    onChange={(imgs) => {
                        setMainData({ ...mainData, images: imgs });
                    }}
                    defaultValue={
                        pageData?.images?.length
                            ? pageData.images.map((img) => img._id)
                            : []
                    }
                >
                    {allModels.map((md) => {
                        return (
                            <Select.Option key={md._id} value={md._id}>
                                {md.name}
                            </Select.Option>
                        );
                    })}
                </Select>
                <ModelSwiper
                    images={pageData.images}
                    size={16}
                    showCode
                    autoplay={false}
                    activeLink
                />
            </section>
            <section>
                <section className="text-3xl 2xl:text-4xl text-center ">
                    {langData.about.toUpperCase()}
                </section>
                <Form className="border-2 rounded p-2" size="large">
                    <Form.Item>
                        <Input name="title" placeholder="Title" />
                    </Form.Item>
                    <Form.Item>
                        <Dragger>Upload Image</Dragger>
                    </Form.Item>
                    <Form.Item>
                        <TextArea
                            rows={4}
                            name="content"
                            placeholder="Content"
                        />
                    </Form.Item>
                </Form>
            </section>
            <section className="text-3xl 2xl:text-4xl text-center ">
                {langData.customers.toUpperCase()}
            </section>
            <section>
                <ImageInputWall
                    className="border-2 rounded"
                    images={mainData?.data?.customers || []}
                    type="image"
                    onFinish={(imageList) => {
                        setMainData({
                            ...mainData,
                            data: { ...mainData.data, customers: imageList },
                        });
                    }}
                />
            </section>
            <section className="text-3xl 2xl:text-4xl text-center ">
                {langData.contact.toUpperCase()}
            </section>
            <section className="">
                <Form layout="inline" className="p-2 w-full " size="large">
                    <Form.Item className="w-3/12">
                        <Input name="facebook" placeholder="Facebook" />
                    </Form.Item>
                    <Form.Item className="w-3/12">
                        <Input name="whatsapp" placeholder="Whatsapp" />
                    </Form.Item>
                    <Form.Item className="w-3/12">
                        <Input name="pinterest" placeholder="Pinterest" />
                    </Form.Item>
                </Form>
            </section>
        </AdminLayout>
    );
}
