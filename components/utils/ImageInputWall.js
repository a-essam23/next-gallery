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
    onRemove = true,
    onUpload = true,
}) {
    const [fileList, setFileList] = useState(images);

    const onUploadHandler = (file, fileList) => {};

    const onRemoveHandler = (id) => {
        setFileList(
            fileList.filter((file) => {
                console.log(file.id !== id);
                return file.id !== id;
            })
        );
    };

    return (
        <div className={`p-4 flex gap-4 ${className}`}>
            {fileList.map((file) => {
                return (
                    <div className="w-max h-max relative" key={v4()}>
                        <FontAwesomeIcon
                            icon={faCancel}
                            className="absolute rounded-full p-0 right-1 top-1 text-red-600 cursor-pointer"
                            size="xl"
                            onClick={() => {
                                onRemoveHandler(file.id);
                            }}
                        />
                        <img
                            className="w-36 h-32 object-cover"
                            src={file.image}
                            alt={file.name}
                        />
                    </div>
                );
            })}
            <Dragger
                accept="image/png, image/gif, image/jpeg"
                listType="picture-card"
                showUploadList={false}
                maxCount={size}
                beforeUpload={onUploadHandler}
            >
                {fileList.length < 5 && (
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
