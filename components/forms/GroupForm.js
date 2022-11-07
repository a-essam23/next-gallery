import { Button, Checkbox, Form, Input, Switch } from "antd";
import { CropDragger } from "../../components";

export default function GroupForm({
    options: {
        previewFile,
        aspectRatio = 1 / 1,
        fileList,
        onFinish,
        content = { name: null },
        isDisabled,
        onCheckChange = () => {},
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
                label="Group name"
                initialValue={content.name}
            >
                <Input required placeholder="Ex: models, projects, molds" />
            </Form.Item>
            <Form.Item label="Watermark">
                <Switch className="bg-sky-600" onChange={onCheckChange} />
            </Form.Item>
            <Form.Item label="Group Image" name="Key" className="">
                <CropDragger
                    isDisabled={isDisabled}
                    aspectRatio={aspectRatio}
                    fileList={fileList}
                    onChange={onChange}
                    previewFile={previewFile}
                />
            </Form.Item>
            <Form.Item className="">
                <Button type="primary" danger size="large" htmlType="submit">
                    {isDisabled ? "UPDATE" : "ADD"} GROUP
                </Button>
            </Form.Item>
        </Form>
    );
}
