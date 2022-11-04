import { Button, Form, Input } from "antd";

export default function LoginForm({ onFinish }) {
    return (
        <Form size="middle" layout="vertical" className="" onFinish={onFinish}>
            <div className="text-3xl font-bold pb-6">Login</div>
            <Form.Item name="email" label="Email" className="font-bold">
                <Input autoComplete="email" className="rounded" required />
            </Form.Item>
            <Form.Item name="password" label="Password" className="font-bold">
                <Input
                    type="password"
                    required
                    autoComplete="current-password"
                />
            </Form.Item>
            <Button
                className="mb-4 rounded"
                type="primary"
                htmlType="submit"
                danger
                size="large"
            >
                Login
            </Button>
        </Form>
    );
}
