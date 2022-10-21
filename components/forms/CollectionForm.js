import { Button, Form, Input, Select } from "antd";
import { useRouter } from "next/router";
import { CropDragger } from "../../components";

export default function CollectionForm({
    options: { previewFile, fileList, aspectRatio, selectedGroup = null },
    onChange,
    onFinish,
}) {
    const router = useRouter();

    return (
        <Form
            onFinish={onFinish}
            layout="vertical"
            className="px-4 pt-2 2xl:pt-16 "
            size="middle"
        >
            <Form.Item name="name" label="Collection name">
                <Input required placeholder="Ex: AA, BB, CA" />
            </Form.Item>
            <Form.Item name="group" label="Group" initialValue={selectedGroup}>
                <Select>
                    {selectedGroup && (
                        <Select.Option value={selectedGroup}>
                            {selectedGroup.toUpperCase()}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item label="Collection Image">
                <CropDragger
                    aspectRatio={aspectRatio}
                    fileList={fileList}
                    onChange={onChange}
                    previewFile={previewFile}
                />
            </Form.Item>
            <Form.Item className="">
                <Button type="primary" danger size="large" htmlType="submit">
                    ADD COLLECTION
                </Button>
            </Form.Item>
        </Form>
    );
}
