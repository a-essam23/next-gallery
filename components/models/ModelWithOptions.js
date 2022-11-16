import { Card, Switch } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { useState } from "react";

export default function ModelWithOptions({
    data: {
        sizes = {
            original: "/imgs/blank.jpg",
            small: "/imgs/blank.jpg",
        },
        name = null,
        collection = null,
        size = null,
        active = true,
    },
    onClickEdit,
    onClickDelete,
    onCheck = () => {},
}) {
    const [isActive, setIsActive] = useState(active);
    return (
        <div className={`relative ${isActive ? "" : "brightness-50"}`}>
            <Card
                className="overflow-clip "
                cover={
                    <div className="h-72 md:h-120 xl:h-96 ">
                        <img
                            alt={name}
                            src={sizes.small}
                            className="w-full h-full object-cover"
                        />
                    </div>
                }
                actions={[
                    <EditTwoTone
                        title="Edit model"
                        key="Edit-model"
                        onClick={onClickEdit}
                    />,
                    <DeleteTwoTone
                        title="Delete model"
                        key="Delete-model"
                        twoToneColor={"red"}
                        onClick={onClickDelete}
                    />,
                ]}
            >
                <div className="text-center font-bold"> {name}</div>
                <p className="text-center text-red-600">{size}</p>
            </Card>
            <Switch
                name="active"
                className="absolute top-0 right-0 bg-blue-500"
                defaultChecked={active}
                onChange={(checked) => {
                    setIsActive(checked);
                    onCheck(checked);
                }}
            ></Switch>
        </div>
    );
}
