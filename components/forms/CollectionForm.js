import { Button, Form, Input, Select } from "antd";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { CropDragger } from "../../components";

export default function CollectionForm({
    options: {
        content = { name: null, group: null },
        previewFile,
        fileList,
        aspectRatio,
        // selectedGroup = null,
        onFinish,
        isDisabled,
    },
    onChange,
}) {
    const AR = useCallback(() => {
        const ARs = [4 / 5, 3 / 4, 2 / 3, 1 / 1, 5 / 6, 6 / 7, 7 / 8];
        return ARs[Math.floor(Math.random() * ARs.length)];
    }, []);
    console.log(AR());
    return (
        <Form
            onFinish={onFinish}
            layout="vertical"
            className="px-4 pt-2 2xl:pt-16 "
            size="middle"
        >
            <Form.Item
                name="name"
                label="Collection name"
                initialValue={content?.name}
            >
                <Input required placeholder="Ex: AA, BB, CA" />
            </Form.Item>
            <Form.Item name="group" label="Group" initialValue={content.group}>
                <Select>
                    {content.group && (
                        <Select.Option value={content.group}>
                            {content.group.toUpperCase()}
                        </Select.Option>
                    )}
                </Select>
            </Form.Item>
            <Form.Item label="Collection Image">
                <CropDragger
                    isDisabled={isDisabled}
                    aspectRatio={AR()}
                    fileList={fileList}
                    onChange={onChange}
                    previewFile={previewFile}
                />
            </Form.Item>
            <Form.Item className="">
                <Button type="primary" danger size="large" htmlType="submit">
                    {isDisabled ? "UPDATE" : "ADD"} COLLECTION
                </Button>
            </Form.Item>
        </Form>
    );
}
