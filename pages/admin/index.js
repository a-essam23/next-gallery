import { v4 } from "uuid";
import Draggable, { DraggableCore } from "react-draggable"; // Both at the same time
import {
    About,
    AdminLayout,
    Contact,
    FourBoxs,
    ImageInputWall,
    ModelSwiper,
} from "../../components";
import { Button, Select } from "antd";
import { useLang } from "../../hooks";

export async function getServerSideProps(context) {
    let allGroups = [];
    for (let i = 0; i < 4; i++) {
        allGroups.push({
            image: "/imgs/placeholder.jpg",
            name: `GROUP${i + 1}`,
            id: i,
        });
    }
    const allModels = [
        {
            image: "/imgs/placeholder.jpg",
            folder: "Collection1",
            name: `Model1`,
            id: "00",
        },
        {
            image: "/imgs/placeholder.jpg",
            folder: "Collection1",
            name: `Model2`,
            id: "10",
        },
        {
            image: "/imgs/placeholder.jpg",
            folder: "Collection1",
            name: `Model3`,
            id: "20",
        },
        {
            image: "/imgs/placeholder.jpg",
            folder: "Collection1",
            name: `Model4`,
            id: "30",
        },
    ];

    const content = {
        groups: [
            {
                image: "/imgs/placeholder.jpg",
                name: `GROUP1`,
                id: 0,
            },
        ],
        models: [
            {
                image: "/imgs/placeholder.jpg",
                name: `MODEL1`,
                id: "00",
            },
        ],
        misc: {
            swiper: [
                { id: v4(), image: "/imgs/placeholder.jpg", name: "1" },
                { id: v4(), image: "/imgs/blank-blue.jpg", name: "2" },
                { id: v4(), image: "/imgs/empty.png", name: "3" },
            ],
        },
    };
    return {
        props: { content, allGroups, allModels }, // will be passed to the page component as props
    };
}

export default function AdminPage({ content, allGroups = [], allModels = [] }) {
    //// ADD SMARTER SEARCH FOR MODELS SELECt
    const { langData } = useLang();
    const {
        groups,
        models,
        misc: { swiper },
    } = content;
    console.log(groups);
    return (
        <AdminLayout className="">
            <div className="flex justify-center pb-4 h-20">
                <Button
                    className="bg-blue-600 h-full text-white w-full"
                    size="large"
                    type="primary"
                    onClick={() => {}}
                >
                    Save
                </Button>
            </div>
            <section className="w-full h-full gap-4 sm:flex sm:h-96 md:h-120 xl:h-144  ">
                <div className="sm:basis-3/5 h-96 sm:h-full w-full center border-2">
                    <ImageInputWall images={swiper} />
                </div>
                <div className="sm:basis-2/5 h-96 sm:h-full w-full center flex flex-col gap-2">
                    <Select
                        mode="multiple"
                        className="w-full"
                        defaultValue={
                            groups.length && groups.map((gp) => gp.id)
                        }
                    >
                        {allGroups.map((gp) => {
                            return (
                                <Select.Option key={gp.id} value={gp.id}>
                                    {gp.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                    <FourBoxs groups={groups} />
                </div>
            </section>{" "}
            <section className="text-3xl 2xl:text-4xl text-center ">
                {langData.latest.toUpperCase()}
            </section>
            <section>
                <Select
                    mode="multiple"
                    className="w-full"
                    defaultValue={models.length && models.map((md) => md.id)}
                >
                    {allModels.map((md) => {
                        return (
                            <Select.Option key={md.id} value={md.id}>
                                {md.name}
                            </Select.Option>
                        );
                    })}
                </Select>
                <ModelSwiper
                    models={models}
                    size={16}
                    showCode
                    autoplay={false}
                    activeLink
                />
            </section>
            <section id="about">
                <About card={{}} />
            </section>
            <section id="contact">
                <Contact />
            </section>
        </AdminLayout>
    );
}
