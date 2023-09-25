import axios_, { AxiosResponse, AxiosRequestConfig } from "axios";

export interface Payload {
    data?: any;
    error?: {
        message: string;
        status: number;
    };
}

class Axios {
    constructor() {}
    async get(url: string, config?: AxiosRequestConfig) {
        const payload: Payload = { data: undefined, error: undefined };
        try {
            const res: AxiosResponse = await axios_.get(url, {
                ...config,
            });
            payload.data = res.data;
            return payload;
        } catch (e: any) {
            payload.error = {
                status: e.response?.status || 500,
                message:
                    e.response?.data?.message || "Bad Request: Unhandled Error",
            };
            return payload;
        }
    }
    async delete(url: string, config?: AxiosRequestConfig) {
        const payload: Payload = { data: undefined, error: undefined };
        try {
            const res: AxiosResponse = await axios_.delete(url, config);
            payload.data = res.data.data;
            return payload;
        } catch (e: any) {
            payload.error = {
                status: e.response?.status || 500,
                message:
                    e.response?.data?.message || "Bad Request: Unhandled Error",
            };
            return payload;
        }
    }

    async post(url: string, data?: any, config?: AxiosRequestConfig) {
        const payload: Payload = { data: undefined, error: undefined };
        try {
            const res: AxiosResponse = await axios_.post(url, data, config);
            payload.data = res.data.data;
            return payload;
        } catch (e: any) {
            payload.error = {
                status: e.response?.status || 500,
                message:
                    e.response?.data?.message || "Bad Request: Unhandled Error",
            };
            return payload;
        }
    }

    async update(url: string, data?: any, config?: AxiosRequestConfig) {
        const payload: Payload = { data: undefined, error: undefined };
        try {
            const res: AxiosResponse = await axios_.put(url, data, config);
            payload.data = res.data.data;
            return payload;
        } catch (e: any) {
            payload.error = {
                status: e.response?.status || 500,
                message:
                    e.response?.data?.message || "Bad Request: Unhandled Error",
            };
            return payload;
        }
    }
}
// eslint-disable-next-line
export default new Axios();
