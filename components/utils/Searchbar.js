import { Button, Form, Input, Select } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useEffect } from "react";
import { v4 } from "uuid";
import { useLang } from "../../hooks";

export default function Searchbar({ onFinish, className, choices = null }) {
    const { langData, isAr } = useLang();
    return (
        <Form onFinish={onFinish} className="flex pt-8 pb-16 bg-white gap-2">
            <FormItem
                name="value"
                className={`w-full ${isAr ? "order-2" : ""}`}
            >
                <Input required size="large" dir={isAr ? "rtl" : "ltr"} />
            </FormItem>

            <FormItem
                initialValue={choices[0]}
                name="type"
                className={`${isAr ? "order-1" : ""}`}
            >
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
