import { useRouter } from "next/router";
import { Card, Switch } from "antd";
import { EditTwoTone, DeleteTwoTone, FileAddTwoTone } from "@ant-design/icons";
import { useState } from "react";

export default function CollectionWithOptions({
    data: {
        name,
        sizes = {
            original: "/imgs/blank.jpg",
            small: "/imgs/blank.jpg",
        },
        active = true,
        group = null,
        images = [],
    },
    onClickAdd,
    onClickEdit,
    onClickDelete,
    onCheck = () => {},
}) {
    const router = useRouter();
    const [isActive, setIsActive] = useState(active);
    return (
        <div className={`relative ${isActive ? "" : "brightness-50"}`}>
            <Card
                cover={
                    <div
                        className="h-72 md:h-120 xl:h-96 cursor-pointer"
                        onClick={() => {
                            router.push(
                                `/admin/${
                                    group || router.query.groupId
                                }/${name}`
                            );
                        }}
                    >
                        <img
                            alt={name}
                            src={sizes.small}
                            className="h-full w-full object-fit"
                        />
                    </div>
                }
                actions={[
                    <FileAddTwoTone
                        title="Add new model"
                        key="Add"
                        onClick={onClickAdd}
                        twoToneColor="#8FDE32"
                    />,
                    <EditTwoTone
                        title="Edit collection"
                        key="Edit"
                        onClick={onClickEdit}
                    />,
                    <DeleteTwoTone
                        key="Delete collection"
                        twoToneColor={"red"}
                        onClick={onClickDelete}
                    />,
                ]}
            >
                <div className="text-center font-bold"> {name}</div>
                <div className="absolute top-0 left-0 p-2 bg-black opacity-75 ">
                    <span className="text-white">{images?.length || 0}</span>
                </div>
            </Card>
            <Switch
                name="active"
                className="absolute top-1 right-1 bg-blue-500"
                defaultChecked={active}
                onChange={(checked) => {
                    setIsActive(checked);
                    onCheck(checked);
                }}
            ></Switch>
        </div>
    );
}
