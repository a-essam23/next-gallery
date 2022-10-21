import { Card, Checkbox } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

export default function ModelWithOptions({
    data: {
        image = null,
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
                cover={
                    <div className="h-full w-full ">
                        <img alt={name} src={image} className="w-full h-full" />
                    </div>
                }
                actions={[
                    <EditTwoTone key="Edit" onClick={onClickEdit} />,
                    <DeleteTwoTone key="Delete" onClick={onClickDelete} />,
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
