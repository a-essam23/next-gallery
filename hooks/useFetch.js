import { useState } from "react";

const useFetch = ({ method }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    return { isLoading, data, error };
};
export const handleDelete = async (type, name, setIsLoading, setMsg) => {
    setIsLoading(true);
    const { data, error } = await deleteOne("", type, name);
    setIsLoading(false);
    if (error) {
        setMsg({ content: error, status: "fail" });
    } else {
        setMsg({ content: "Added!", status: "success" });
    }
    return data;
};

export const handleUpload = async (
    formData,
    fileToUpload,
    setIsLoading,
    setMsg
) => {
    setIsLoading(true);
    const { data, error } = await postOne("", content.type, {
        ...formData,
        Key: fileToUpload,
    });
    setIsLoading(false);
    if (error) {
        setMsg({ err: true, content: error });
    } else {
        setMsg({ err: false, content: "Added!" });
    }
    return data;
};
export const handleUpdate = async (
    formData,
    fileToUpload,
    setIsLoading,
    setMsg
) => {
    setIsLoading(true);
    const { data, error } = await updateOne(
        "",
        content.type,
        {
            ...formData,
        },
        content.currentName
    );
    setIsLoading(false);
    if (error) {
        setMsg({ err: true, content: error });
    } else {
        setMsg({ err: false, content: `Updated!` });
    }
    return data;
};
