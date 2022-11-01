import axios from "axios";

//// SET TOKEN HERE

export const getAll = async (
    hostname = null,
    type = null,
    clientSide = false
) => {
    let payload = { data: null, error: null };
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    if (!type) {
        payload.error = "Bad request: no type or hostname";
        return payload;
    }
    try {
        const res = await axios.get(
            `http:${hostname}/api/v1/image?genre=${type}&fields=-images,-__v,-Key,-comments,-folders,-folders,-genre,-updatedAt&sort=createdAt`
        );
        payload.data = res?.data?.data?.doc;
        return payload;
    } catch (e) {
        payload.error = e.message;
        return payload;
    }
};

export const getOne = async (hostname = null, type = null, name = null) => {
    let payload = { data: null, error: null };
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    if (!type) {
        payload.error = "Bad request: no type or hostname";
        return payload;
    }
    try {
        const res = await axios.get(`http:${hostname}/api/v1/${type}/${name}`);
        payload.data = res?.data?.data;
        return payload;
    } catch (e) {
        payload.error = e.message;
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
    if (!type) {
        payload.error = "Bad request: no type or hostname";
        return payload;
    }
    console.log(`${hostname}/api/v1/${type}/${name}`);
    try {
        if (type === "collection") type = "folder";
        if (type === "model") type = "image";
        const res = await axios.patch(
            `${hostname}/api/v1/${type}/${name}`,
            reqData
        );
        payload.data = res?.data?.data;
        return payload;
    } catch (e) {
        payload.error = e.response?.data?.message;
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

    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    if (!type) {
        payload.error = "Bad request: no type or hostname";
        return payload;
    }

    try {
        if (type === "collection") type = "folder";
        if (type === "model") type = "image";
        const res = await axios.postForm(
            `${hostname}/api/v1/${type}/upload`,
            reqData
        );
        payload.data = res?.data?.data;
        return payload;
    } catch (e) {
        payload.error = e.response?.data?.message;
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
    if (!type) {
        payload.error = "Bad request: no type or hostname";
        return payload;
    }
    try {
        if (type === "collection") type = "folder";
        if (type === "model") type = "image";
        const res = await axios.delete(`${hostname}/api/v1/${type}/${name}`);
        payload.data = res?.data?.data;
        return payload;
    } catch (e) {
        payload.error = e.response?.data?.message;
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

    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    if (!type) {
        payload.error = "Bad request: no type or hostname";
        return payload;
    }

    try {
        if (type === "collection") type = "folder";
        if (type === "model") type = "image";
        const res = await axios.postForm(
            `${hostname}/api/v1/${type}/upload`,
            reqData
        );
        payload.data = res?.data?.data;
        return payload;
    } catch (e) {
        payload.error = e.response?.data?.message;
        return payload;
    }
};

// group = "api/v1/image?genre=Group&fields=-images,-__v,-Key,-comments";
// folder = "api/v1/image?genre=Folder&fields=-folders";
