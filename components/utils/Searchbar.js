import { Button, Form, Input, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useEffect } from "react";
import { v4 } from "uuid";
import { useLang } from "../../hooks";

export default function Searchbar({ onFinish, className, choices = null }) {
    const { langData, isAr } = useLang();
    return (
        <Form
            onFinish={onFinish}
            className={`flex bg-white gap-2 ${className}`}
        >
            <FormItem name="value" className={`w-full`}>
                <Input required size="large" />
            </FormItem>

            {choices && (
                <FormItem initialValue={choices[0]} name="type" className={``}>
                    <Select size="large" className="">
                        {choices.map((choice) => {
                            return (
                                <Select.Option key={v4()} value={choice}>
                                    {langData[choice].toUpperCase()}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </FormItem>
            )}
            <Button
                htmlType="submit"
                size="large"
                type="primary"
                className="bg-blue-600"
            >
                {langData.search.toUpperCase()}
            </Button>
        </Form>
    );
}
