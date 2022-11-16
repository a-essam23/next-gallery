import { useEffect, useState } from "react";
import { useAuth } from "../context";
import {
    deleteOne,
    getAll,
    getOne,
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
        setMsg(null);
        setIsLoading(true);
        console.log(formData);
        const { data, error } = await postOne("", type, formData, token);
        if (error) {
            setMsg({ content: error.message, status: "fail" });
        } else {
            setMsg({ content: "Added!", status: "success" });
        }
        setIsLoading(false);
        return { data, error };
    };

    const handleUpdate = async (formData, type, name, hide = false) => {
        setMsg(null);
        setIsLoading(true);
        const { data, error } = await updateOne({
            hostname: "",
            type,
            reqData: formData,
            name,
            token,
            hide,
        });
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
        setMsg(null);
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
        setMsg(null);
        const { data, error } = await login(formData);
        setIsLoading(false);
        if (error) {
            setMsg({ content: error.message, status: "fail" });
            addUser(null);
            return false;
        } else {
            setMsg({ content: "Logged in... redirecting", status: "success" });
            addUser({ ...data.data.user, token: data.token });
            return true;
        }
    };

    const handleRegister = async (formData) => {
        setIsLoading(true);
        setMsg(null);
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

    const handleGetAll = async (type, filter) => {
        setIsLoading(true);
        setMsg(null);
        const { data, error } = await getAll({
            hostname: "",
            type,
            token,
            filter,
        });
        setIsLoading(false);
        if (error) {
            setMsg({ content: error.message, status: "fail" });
        } else {
            setMsg(null);
        }
        return { data, error };
    };

    const handleGetOne = async (type, name, filter) => {
        setIsLoading(true);
        setMsg(null);
        const { data, error } = await getOne({
            hostname: "",
            type,
            name,
            token,
            filter,
        });
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
        handleGetOne,
        setMsg,
    };
};

export default useFetch;
