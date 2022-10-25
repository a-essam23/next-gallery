import { Button, Form, Input } from "antd";

export default function LoginForm({ onFinish, errMsg = "" }) {
    return (
        <Form
            size="large"
            layout="vertical"
            className="p-8  "
            onFinish={onFinish}
        >
            <Form.Item
                name="email"
                label="EMAIL"
                required
                className="font-bold"
            >
                <Input required />
            </Form.Item>
            <Form.Item
                name="password"
                label="PASSWORD"
                className="font-bold"
                required
            >
                <Input type="password" required />
            </Form.Item>
            <Button className="my-4" type="primary" htmlType="submit" danger>
                Log in
            </Button>
        </Form>
    );
}
