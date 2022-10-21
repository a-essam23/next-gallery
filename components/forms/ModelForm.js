import { Button, Form, Input, Select } from "antd";
import { CropDragger } from "../../components";

export default function ModelForm({
    options: { previewFile, selectedCollection, fileList },
    onChange,
    onFinish,
}) {
    return (
        <Form
            onFinish={onFinish}
            layout="vertical"
            className="px-4 pt-2 2xl:pt-16 "
            size="middle"
        >
            <Form.Item name="name" label="Model code">
                <Input required placeholder="Ex: AA, BB, CA" />
            </Form.Item>
            <Form.Item name="size" label="Image dimensions">
                <Input required placeholder="Ex: 24x62" />
            </Form.Item>
            <Form.Item
                name="folderName"
                label="Collection"
                initialValue={selectedCollection}
            >
                <Select>
                    <Select.Option value={selectedCollection}>
                        {selectedCollection.toUpperCase()}
                    </Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Image">
                <CropDragger
                    fileList={fileList}
                    onChange={onChange}
                    previewFile={previewFile}
                />
            </Form.Item>
            <Form.Item className="">
                <Button type="primary" danger size="large" htmlType="submit">
                    ADD IMAGE
                </Button>
            </Form.Item>
        </Form>
    );
}
