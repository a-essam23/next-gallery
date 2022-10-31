import { useRouter } from "next/router";
import { Card, Checkbox } from "antd";
import { EditTwoTone, DeleteTwoTone, FileAddTwoTone } from "@ant-design/icons";

export default function CollectionWithOptions({
    data: {
        name,
        sizes = {
            original: "/imgs/blank.jpg",
            small: "/imgs/blank.jpg",
        },
        models,
        visible = true,
        group = null,
    },
    onClickAdd,
    onClickEdit,
    onClickDelete,
    onCheck,
}) {
    const router = useRouter();
    return (
        <div className="relative">
            <Card
                cover={
                    <div
                        className="h-96 cursor-pointer"
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
                            className="h-full w-full object-fit  "
                        />
                    </div>
                }
                actions={[
                    <FileAddTwoTone key="Add" onClick={onClickAdd} />,
                    <EditTwoTone key="Edit" onClick={onClickEdit} />,
                    <DeleteTwoTone key="Delete" onClick={onClickDelete} />,
                ]}
            >
                <div className="text-center font-bold"> {name}</div>
                <div className="absolute top-0 left-0 p-2 bg-black opacity-75 ">
                    <span className="text-white">{models?.length || 0}</span>
                </div>
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
