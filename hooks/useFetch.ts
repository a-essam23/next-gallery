import axios from "@services/axios";
import { AxiosRequestConfig } from "axios";
import { useState } from "react";

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);

    const get = async (url: string) => {
        setIsLoading(true);
        const payload = await axios.get(url);
        setIsLoading(false);
        return payload;
    };

    const post = async (url: string, data: {}, config?: AxiosRequestConfig) => {
        setIsLoading(true);
        const payload = await axios.post(url, data, config);
        setIsLoading(false);
        return payload;
    };

    const update = async (
        url: string,
        data: {},
        config?: AxiosRequestConfig
    ) => {
        setIsLoading(true);
        const payload = await axios.update(url, data, config);
        setIsLoading(false);
        return payload;
    };

    const deleteOne = async (url: string) => {
        setIsLoading(true);
        const payload = await axios.delete(url);
        setIsLoading(false);
        return payload;
    };

    return { get, post, deleteOne, update, isLoading };
};

export default useFetch;
