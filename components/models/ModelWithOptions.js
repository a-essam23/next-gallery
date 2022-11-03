import { Card, Checkbox } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

export default function ModelWithOptions({
    data: {
        sizes = {
            original: "/imgs/blank.jpg",
            small: "/imgs/blank.jpg",
        },
        name = null,
        collection = null,
        size = null,
        visible = true,
        onCheck = () => {},
    },
    onClickEdit,
    onClickDelete,
}) {
    return (
        <div className="relative">
            <Card
                className="overflow-clip "
                cover={
                    <div className="h-full w-full ">
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
            <Checkbox
                name="visible"
                className="absolute top-0 right-0 "
                defaultChecked={visible}
                onChange={(e) => {
                    onCheck(e.target.checked);
                }}
            ></Checkbox>
        </div>
    );
}
