import { Button, Form, Input, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useEffect } from "react";
import { v4 } from "uuid";
import { useLang } from "../../context";

export default function Searchbar({
    onFinish,
    className = "",
    choices = null,
}) {
    const { langData, isAr } = useLang();
    return (
        <Form
            onFinish={onFinish}
            className={`w-full flex gap-2 ${className}`}
            size="large"
        >
            <FormItem name="value" className={`w-full h-20 `}>
                <Input required />
            </FormItem>

            {choices && (
                <FormItem initialValue={choices[0]} name="type" className={``}>
                    <Select className="">
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
                type="primary"
                className="bg-rose-900 hover:bg-rose-700"
            >
                {langData.search.toUpperCase()}
            </Button>
        </Form>
    );
}
