import { useEffect, useState } from "react";
import { useAuth } from "../context";
import {
    deleteOne,
    getAll,
    login,
    postOne,
    register,
    updateOne,
} from "../services";

const useFetch = () => {
    //// DIFFERENT STATES FOR EVERY HANDLER
    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState(null);
    // const [response, setResponse] = useState(null);
    const { user, addUser, removeUser } = useAuth();
    const token = user?.token;

    const handleUpload = async (formData, type) => {
        setIsLoading(true);
        const { data, error } = await postOne("", type, formData, token);
        if (error) {
            setMsg({ content: error.message, status: "fail" });
        } else {
            setMsg({ content: "Added!", status: "success" });
        }
        setIsLoading(false);
        return { data, error };
    };

    const handleUpdate = async (formData, type, name) => {
        setIsLoading(true);
        const { data, error } = await updateOne(
            "",
            type,
            formData,
            name,
            token
        );
        setIsLoading(false);
        if (error) {
            setMsg({ content: error.message, status: "fail" });
        } else {
            setMsg({ content: "Updated!", status: "success" });
        }
        return { data, error };
    };

    const handleDelete = async (type, name) => {
        setIsLoading(true);
        const { data, error } = await deleteOne("", type, name, token);
        setIsLoading(false);
        if (error) {
            setMsg({ content: error.message, status: "fail" });
        } else {
            setMsg({ content: "Deleted!", status: "success" });
        }
        return { data, error };
    };

    const handleLogin = async (formData) => {
        setIsLoading(true);
        const { data, error } = await login(formData);
        console.log(data, error);
        setIsLoading(false);
        if (error) {
            setMsg({ content: error.message, status: "fail" });
            return false;
        } else {
            setMsg({ content: "Logged in... redirecting", status: "success" });
            addUser({ ...data.data.user, token: data.token });
            return true;
        }
    };

    const handleRegister = async (formData) => {
        setIsLoading(true);
        const { data, error } = await register(formData);
        setIsLoading(false);
        if (error) {
            setMsg({ content: error.message, status: "fail" });
            return false;
        } else {
            setMsg({ content: "Registered... redirecting", status: "success" });
            addUser({ ...data.data.user, token: data.token });
            return true;
        }
    };

    const handleGetAll = async (type) => {
        setIsLoading(true);
        const { data, error } = await getAll("", type, token);
        setIsLoading(false);
        if (error) {
            setMsg({ content: error.message, status: "fail" });
        } else {
            setMsg(null);
        }
        return { data, error };
    };

    return {
        isLoading,
        msg,
        handleUpload,
        handleUpdate,
        handleDelete,
        handleLogin,
        handleRegister,
        handleGetAll,
    };
};

export default useFetch;
