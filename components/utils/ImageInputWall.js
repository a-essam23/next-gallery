import Dragger from "antd/lib/upload/Dragger";
import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { v4 } from "uuid";

export default function ImageInputWall({
    className = "",
    images = [],
    size = 5,
    onRemove = async (file) => {},
    onUpload = async (file) => {},
    onFinish = (imageList) => {},
}) {
    const [imagesList, setImagesList] = useState(images);

    const onFinishHandler = () => {
        onFinish(imagesList);
    };

    const onUploadHandler = async (file) => {
        const { data, error } = await onUpload(file);
        if (data) setImagesList([...imagesList, data]);
        return false;
    };

    const onRemoveHandler = async (file) => {
        const { data, error } = await onRemove(file);
        if (!error)
            setImagesList(
                imagesList.filter((img) => {
                    return img.name !== file.name;
                })
            );
    };

    return (
        <div className={`p-4 flex gap-4 ${className}`}>
            {imagesList.map((file) => {
                return (
                    <div className="w-max h-max relative" key={v4()}>
                        <FontAwesomeIcon
                            icon={faCancel}
                            className="absolute rounded-full p-0 right-1 top-1 bg-white border-2 text-red-600 cursor-pointer"
                            size="xl"
                            onClick={() => {
                                onRemoveHandler(file);
                            }}
                        />
                        <img
                            className="w-36 h-32 object-cover rounded"
                            src={file?.sizes?.small}
                            alt={file?.name}
                        />
                    </div>
                );
            })}
            <Dragger
                accept="image/png, image/gif, image/jpeg"
                className="rounded"
                listType="picture-card"
                showUploadList={false}
                maxCount={size}
                beforeUpload={onUploadHandler}
            >
                {imagesList.length < 5 && (
                    <div className="w-32 h-20">
                        <p className="ant-upload-drag-icon m-0 p-0">
                            <InboxOutlined />
                        </p>
                        Click or drag file
                    </div>
                )}
            </Dragger>
        </div>
    );
}
