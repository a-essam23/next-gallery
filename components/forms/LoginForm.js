import { Button, Form, Input } from "antd";
import { useLang } from "../../context";

export default function LoginForm({ onFinish }) {
    const { langData, dir } = useLang();
    return (
        <Form size="middle" layout="vertical" className="" onFinish={onFinish}>
            <div className="text-3xl font-bold pb-6 capitalize">
                {langData.login}
            </div>
            <div className="font-bold pb-2 capitalize">{langData.name}</div>
            <Form.Item name="name" className="font-bold">
                <Input autoComplete="name" className="rounded" required />
            </Form.Item>
            <div className="font-bold pb-2 capitalize">{langData.password}</div>
            <Form.Item name="password" className="font-bold">
                <Input
                    type="password"
                    required
                    autoComplete="current-password"
                />
            </Form.Item>
            <Button
                className="mb-4 rounded capitalize"
                type="primary"
                htmlType="submit"
                danger
                size="large"
            >
                {langData.login}
            </Button>
        </Form>
    );
}
