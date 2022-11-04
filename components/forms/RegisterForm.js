import { Button, Form, Input } from "antd";

export default function RegisterForm({ onFinish }) {
    return (
        <Form size="middle" layout="vertical" className="" onFinish={onFinish}>
            <div className="text-3xl font-bold pb-6">Register</div>
            <Form.Item
                autoComplete="name"
                name="name"
                label="Name"
                required
                className="font-bold"
            >
                <Input className="rounded" required />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                autoComplete="email"
                className="font-bold"
            >
                <Input className="rounded" required />
            </Form.Item>
            <Form.Item name="password" label="Password" className="font-bold">
                <Input
                    autoComplete="new-password"
                    className="rounded"
                    type="password"
                    required
                />
            </Form.Item>
            <Form.Item
                name="passwordConfirm"
                label="Confrim password"
                className="font-bold"
            >
                <Input
                    autoComplete="new-password"
                    className="rounded"
                    type="password"
                    required
                />
            </Form.Item>
            <Button
                className="mb-4 rounded"
                type="primary"
                htmlType="submit"
                danger
                size="large"
            >
                Register
            </Button>
        </Form>
    );
}
