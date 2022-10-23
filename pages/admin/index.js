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
        <AdminLayout className="border-2">
            <Select
                defaultValue={content?.misc?.swiper}
                mode="multiple"
                className="w-8/12 h-full"
                tagRender={(props) => {
                    const { label, value, closable, onClose } = props;
                    return (
                        <Tag
                            className="flex flex-col items-end "
                            closable={closable}
                            onClose={onClose}
                            icon={
                                <img
                                    src={value || label.props.value}
                                    className="order-1 w-20 h-20"
                                />
                            }
                        ></Tag>
                    );
                }}
            >
                {content?.misc?.swiper &&
                    content.misc.swiper.map((el, i) => {
                        return (
                            <Select.Option
                                key={el._id}
                                className="w-40 h-40 items-center border-b-2"
                            >
                                <img src={el.value} alt={i} className="" />
                            </Select.Option>
                        );
                    })}
            </Select>
        </AdminLayout>
    );
}
