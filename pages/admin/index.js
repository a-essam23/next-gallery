import { Select, Tag } from "antd";
import { v4 } from "uuid";
import { CloseCircleTwoTone } from "@ant-design/icons";

import { AdminLayout } from "../../components";

export async function getServerSideProps(context) {
    const content = {
        misc: {
            swiper: [
                { _id: v4(), value: "/imgs/placeholder.jpg" },
                { _id: v4(), value: "/imgs/blank-blue.jpg" },
                { _id: v4(), value: "/imgs/empty.png" },
            ],
        },
    };

    return {
        props: { content }, // will be passed to the page component as props
    };
}

export default function AdminPage({ content }) {
    return (
        <AdminLayout className="">
            <section className="w-full h-full gap-4 sm:flex sm:h-96 md:h-120 xl:h-144 2xl:h-216 ">
                <div className="sm:basis-3/5 h-96 sm:h-full w-full center border-2 "></div>
                <div className="my-12 h-120 sm:h-full sm:my-0 sm:basis-2/5 border-2 "></div>
            </section>
        </AdminLayout>
    );
}
