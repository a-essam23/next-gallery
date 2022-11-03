import { Button, Form, Input, Select } from "antd";
import { CropDragger } from "../../components";

export default function ModelForm({
    options: {
        previewFile,
        aspectRatio = 1 / 1,
        selectedCollection,
        fileList,
        onFinish,
        content = { name: null, collection: null },
        isDisabled,
    },
    onChange,
}) {
    return (
        <Form
            onFinish={onFinish}
            layout="vertical"
            className="px-4 pt-2 2xl:pt-16 "
            size="middle"
        >
            <Form.Item
                name="name"
                label="Model code"
                initialValue={content.name}
            >
                <Input required placeholder="Ex: AA, BB, CA" />
            </Form.Item>
            <Form.Item
                name="size"
                label="Image dimensions"
                initialValue={content.size}
            >
                <Input required placeholder="Ex: 24x62" />
            </Form.Item>
            <Form.Item
                name="folder"
                label="Collection"
                initialValue={content.collection}
            >
                <Select>
                    <Select.Option value={content.collection}>
                        {content.collection.toUpperCase()}
                    </Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Image">
                <CropDragger
                    isDisabled={isDisabled}
                    fileList={fileList}
                    onChange={onChange}
                    previewFile={previewFile}
                    aspectRatio={aspectRatio}
                />
            </Form.Item>
            <Form.Item className="">
                <Button type="primary" danger size="large" htmlType="submit">
                    {isDisabled ? "UPDATE" : "ADD"} IMAGE
                </Button>
            </Form.Item>
        </Form>
    );
}
