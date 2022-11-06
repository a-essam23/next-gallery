import { message } from "antd";
import axios from "axios";

const protocol =
    process.env.NODE_ENV === "development" ? "http://" : "https://";

//// FIX TOO MANY REQUESTS ERROR !

export const getAll = async (hostname = null, type = null, token) => {
    let payload = { data: null, error: null };
    const host = hostname ? protocol + hostname : "";

    if (!type) {
        payload.error = "Bad request: no type or hostname";
        return payload;
    }

    try {
        const res = await axios.get(
            `${host}/api/v1/image?genre=${type}&fields=-images,-__v,-Key,-comments,-folders,-folders,-genre,-updatedAt&sort=createdAt`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        payload.data = res?.data?.data?.doc;
        return payload;
    } catch (e) {
        payload.error = {
            status:
                e.response?.data?.error?.statusCode ||
                e.response?.status ||
                500,
            message:
                e.response?.data?.message ||
                e.response?.statusText ||
                "Bad Request: Unhandeled Error",
        };
        return payload;
    }
};

export const getOne = async (
    hostname = null,
    type = null,
    name = null,
    token = null
) => {
    let payload = { data: null, error: null };

    const host = hostname ? protocol + hostname : "";

    if (!type) {
        payload.error = "Bad request: no type or hostname";
        return payload;
    }
    try {
        const res = await axios.get(`${host}/api/v1/${type}/${name}`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        payload.data = res?.data?.data;
        return payload;
    } catch (e) {
        payload.error = {
            status:
                e.response?.data?.error?.statusCode ||
                e.response?.status ||
                500,
            message:
                e.response?.data?.message ||
                e.response?.statusText ||
                "Bad Request: Unhandeled Error",
        };
        return payload;
    }
};

export const updateOne = async (
    hostname = null,
    type = null,
    reqData = {},
    name = null,
    token = null
) => {
    let payload = { data: null, error: null };

    const host = hostname ? protocol + hostname : "";

    if (!type) {
        payload.error = "Bad request: no type or hostname";
        return payload;
    }
    try {
        if (type === "collection") type = "folder";
        if (type === "model") type = "image";

        const res = await axios.patch(
            `${host}/api/v1/${type}/${name}`,
            reqData,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        payload.data = res?.data?.data;
        return payload;
    } catch (e) {
        payload.error = {
            status:
                e.response?.data?.error?.statusCode ||
                e.response?.status ||
                500,
            message:
                e.response?.data?.message ||
                e.response?.statusText ||
                "Bad Request: Unhandeled Error",
        };
        return payload;
    }
};

export const postOne = async (
    hostname = null,
    type = null,
    reqData = null,
    token = null
) => {
    let payload = { data: null, error: null, reqData };
    const host = hostname ? protocol + hostname : "";

    if (!type) {
        payload.error = "Bad request: no type or hostname";
        return payload;
    }

    try {
        if (type === "collection") type = "folder";
        if (type === "model") type = "image";
        const res = await axios.postForm(
            `${host}/api/v1/${type}/upload`,
            reqData,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        payload.data = res?.data?.data;
        return payload;
    } catch (e) {
        payload.error = {
            status:
                e.response?.data?.error?.statusCode ||
                e.response?.status ||
                500,
            message:
                e.response?.data?.message ||
                e.response?.statusText ||
                "Bad Request: Unhandeled Error",
        };
        return payload;
    }
};

export const postMany = async (
    hostname = null,
    type = null,
    name = null,
    token = null,
    clientSide = false
) => {};

export const deleteOne = async (
    hostname = null,
    type = null,
    name = null,
    token = null
) => {
    let payload = { data: null, error: null };
    const host = hostname ? protocol + hostname : "";

    if (!type) {
        payload.error = "Bad request: no type or hostname";
        return payload;
    }
    try {
        if (type === "collection") type = "folder";
        if (type === "model") type = "image";
        const res = await axios.delete(`${host}/api/v1/${type}/${name}`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        payload.data = res?.data?.data;
        return payload;
    } catch (e) {
        payload.error = {
            status:
                e.response?.data?.error?.statusCode ||
                e.response?.status ||
                500,
            message:
                e.response?.data?.message ||
                e.response?.statusText ||
                "Bad Request: Unhandeled Error",
        };
        return payload;
    }
};

export const deleteMany = async (
    hostname = null,
    type = null,
    reqData = null,
    token = null
) => {
    let payload = { data: null, error: null, reqData };

    const host = hostname ? protocol + hostname : "";

    if (!type) {
        payload.error = "Bad request: no type or hostname";
        return payload;
    }

    try {
        if (type === "collection") type = "folder";
        if (type === "model") type = "image";
        const res = await axios.postForm(
            `${host}/api/v1/${type}/upload`,
            reqData,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
        payload.data = res?.data?.data;
        return payload;
    } catch (e) {
        payload.error = {
            status:
                e.response?.data?.error?.statusCode ||
                e.response?.status ||
                500,
            message:
                e.response?.data?.message ||
                e.response?.statusText ||
                "Bad Request: Unhandeled Error",
        };
        return payload;
    }
};

export const login = async (reqData) => {
    let payload = { data: null, error: null, reqData };
    // const host = hostname ? protocol + hostname : "";
    try {
        const res = await axios.post(`/api/v1/auth/login`, reqData);
        payload.data = res?.data;
        return payload;
    } catch (e) {
        payload.error = {
            status:
                e.response?.data?.error?.statusCode ||
                e.response?.status ||
                500,
            message:
                e.response?.data?.message ||
                e.response?.statusText ||
                "Bad Request: Unhandeled Error",
        };
        return payload;
    }
};

export const register = async (reqData) => {
    let payload = { data: null, error: null, reqData };
    try {
        const res = await axios.post(`/api/v1/auth/signup`, reqData);
        payload.data = res?.data;
        return payload;
    } catch (e) {
        payload.error = {
            status:
                e.response?.data?.error?.statusCode ||
                e.response?.status ||
                500,
            message:
                e.response?.data?.message ||
                e.response?.statusText ||
                "Bad Request: Unhandeled Error",
        };
        return payload;
    }
};

// group = "api/v1/image?genre=Group&fields=-images,-__v,-Key,-comments";
// folder = "api/v1/image?genre=Folder&fields=-folders";
