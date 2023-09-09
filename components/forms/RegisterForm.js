import { Button, Form, Input } from "antd";
import { useLang } from "../../context";

export default function RegisterForm({ onFinish }) {
    const { langData } = useLang();
    return (
        <Form size="middle" layout="vertical" className="" onFinish={onFinish}>
            <div className="text-3xl font-bold pb-6 capitalize">
                {langData.register}
            </div>
            <div className="font-bold pb-2 capitalize">{langData.name}</div>
            <Form.Item
                autoComplete="username"
                name="name"
                required
                className="font-bold"
            >
                <Input className="rounded" required />
            </Form.Item>
            {/* <div className="font-bold pb-2 capitalize">{langData.email}</div>
            <Form.Item name="email" autoComplete="email" className="font-bold">
                <Input className="rounded" required />
            </Form.Item> */}
            <div className="font-bold pb-2 capitalize">{langData.password}</div>
            <Form.Item name="password" className="font-bold">
                <Input
                    autoComplete="new-password"
                    className="rounded"
                    type="password"
                    required
                />
            </Form.Item>
            <div className="font-bold pb-2 capitalize">
                {langData.confirmPassword}
            </div>
            <Form.Item name="passwordConfirm" className="font-bold">
                <Input
                    autoComplete="new-password"
                    className="rounded"
                    type="password"
                    required
                />
            </Form.Item>
            <Button
                className="mb-4 rounded capitalize"
                type="primary"
                htmlType="submit"
                danger
                size="large"
            >
                {langData.register}
            </Button>
        </Form>
    );
}
