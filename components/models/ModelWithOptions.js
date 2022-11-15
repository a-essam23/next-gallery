import { Card, Checkbox as Switch } from "antd";
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
        onCheck = () => {},
    },
    onClickEdit,
    onClickDelete,
}) {
    const [isActive, setIsActive] = useState(active);
    return (
        <div className={`relative ${isActive ? "" : "brightness-50"}`}>
            <Card
                className="overflow-clip "
                cover={
                    <div className="h-120 xl:h-96 ">
                        <img
                            alt={name}
                            src={sizes.small}
                            className="w-full h-full object-cover"
                        />
                    </div>
                }
                actions={[
                    <EditTwoTone key="Edit" onClick={onClickEdit} />,
                    <DeleteTwoTone
                        key="Delete"
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
                className="absolute top-0 right-0 "
                defaultChecked={active}
                onChange={(checked) => {
                    setIsActive(checked);
                    onCheck(checked);
                }}
            ></Switch>
        </div>
    );
}
