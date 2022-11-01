import { useState } from "react";
import { postOne, updateOne } from "../services";

const useFetch = () => {
    //// DIFFERENT STATES FOR EVERY HANDLER
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState(null);

    // const handleDelete = async ({ type, name }) => {
    //     setIsLoading(true);
    //     const { data, error } = await deleteOne("", type, name);
    //     setIsLoading(false);
    //     if (error) {
    //         setMsg({ content: error, status: "fail" });
    //     } else {
    //         setMsg({ content: "Added!", status: "success" });
    //     }
    //     return { data, error };
    // };

    const handleUpload = async (formData, type) => {
        setIsLoading(true);
        const { data, error } = await postOne("", type, formData);
        if (error) {
            setMsg({ content: error, status: "fail" });
        } else {
            setMsg({ content: "Added!", status: "success" });
        }
        setIsLoading(false);
        return { data, error };
    };

    const handleUpdate = async (formData, type, name) => {
        setIsLoading(true);
        const { data, error } = await updateOne("", type, formData, name);
        setIsLoading(false);
        if (error) {
            setMsg({ content: error, status: "fail" });
        } else {
            setMsg({ content: "Updated!", status: "success" });
        }
        return { data, error };
    };

    // const methods = {
    //     updateOne: handleUpdate,
    //     uploadOne: handleUpload,
    //     deleteOne: handleDelete,
    // };

    // const handler = methods[method];

    // if (!handler) {
    //     return {
    //         data: null,
    //         error: "No method specified!",
    //         isLoading: false,
    //         msg: {},
    //     };
    // }
    // const result = handler({ type, name, data });
    return { isLoading, msg, handleUpload, handleUpdate };
};

export default useFetch;
