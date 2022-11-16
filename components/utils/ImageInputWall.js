import Dragger from "antd/lib/upload/Dragger";
import { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel } from "@fortawesome/free-solid-svg-icons";
import { useFetch } from "../../hooks";
import { Message, Loading } from "../../components";

export default function ImageInputWall({
    className = "",
    type,
    images = [],
    size = 5,
    onFinish = (imageList) => {},
}) {
    const [imagesList, setImagesList] = useState(images);
    const { handleUpload, handleDelete, msg, isLoading } = useFetch();

    useEffect(() => {
        onFinishHandler();
        // eslint-disable-next-line
    }, [imagesList]);

    const onFinishHandler = () => {
        onFinish(imagesList);
    };

    const onUploadHandler = async (file) => {
        const { data, error } = await handleUpload(
            {
                name: file.name,
                Key: file,
                folder: "main",
                active: false,
            },
            type
        );
        if (!error) {
            setImagesList([...imagesList, data]);
        }
        return false;
    };

    const onRemoveHandler = async (file) => {
        const { data, error } = await handleDelete(type, file.name);
        if (!error) {
            setImagesList(
                imagesList.filter((img) => {
                    return img.name !== file.name;
                }) || []
            );
        }
    };

    return (
        <>
            <Loading isLoading={isLoading} />
            <Message className={"h-max"} options={msg} />
            <div className={`p-4 flex gap-4 ${className}`}>
                {imagesList.map((file, index) => {
                    return (
                        <div
                            className="w-max h-max relative"
                            key={file.name || index}
                        >
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
                    {imagesList.length < size && (
                        <div className="w-32 h-20">
                            <p className="ant-upload-drag-icon m-0 p-0">
                                <InboxOutlined />
                            </p>
                            Click or drag file
                        </div>
                    )}
                </Dragger>
            </div>
        </>
    );
}
