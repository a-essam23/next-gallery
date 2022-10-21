import ImgCrop from "antd-img-crop";
import Dragger from "antd/lib/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

export default function CropDragger({
    aspectRatio = 3 / 4,
    fileList,
    onChange,
    previewFile,
    className,
}) {
    return (
        <ImgCrop rotate quality={1} aspect={aspectRatio}>
            <Dragger
                className={className}
                showUploadList={false}
                maxCount={1}
                listType="picture"
                fileList={fileList}
                onChange={onChange}
                beforeUpload={previewFile}
            >
                <p className="ant-upload-drag-icon m-0 p-0">
                    <InboxOutlined />
                </p>
                Click or drag file to this area to upload
            </Dragger>
        </ImgCrop>
    );
}
