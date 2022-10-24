import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

export default function LoginForm({ onFinish, errMsg = "" }) {
    return (
        <Form
            size="large"
            layout="vertical"
            className="p-8 bg-slate-100 "
            onFinish={onFinish}
        >
            <FormItem name="email" label="EMAIL" required className="font-bold">
                <Input required />
            </FormItem>
            <FormItem
                name="password"
                label="PASSWORD"
                className="font-bold"
                required
            >
                <Input type="password" required />
            </FormItem>
            <div className="text-red-500">{errMsg}</div>
            <Button className="my-4" type="primary" htmlType="submit" danger>
                Log in
            </Button>
        </Form>
    );
}
