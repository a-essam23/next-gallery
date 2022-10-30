import axios from "axios";

export const getAll = async (
    hostname = null,
    type = null,
    clientSide = false
) => {
    let payload = { data: null, error: null };
    if (!type || !(hostname || clientSide)) {
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

export const getOne = async (
    hostname = null,
    type = null,
    name = null,
    clientSide = false
) => {
    let payload = { data: null, error: null };
    if (!type || !(hostname || clientSide)) {
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

export const postOne = async (
    hostname = null,
    type = null,
    reqData = null,
    token = null
) => {
    let payload = { data: null, error: null, reqData };
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    console.log("posting!");
    if (!type) {
        payload.error = "Bad request: no type or hostname";
        return payload;
    }

    console.log(`${protocol}://${hostname}/api/v1/${type}/upload`);
    try {
        const res = await axios.postForm(
            `${protocol}://${hostname}/api/v1/${type}/upload`,
            reqData
        );
        payload.data = res?.data?.data;
        return payload;
    } catch (e) {
        payload.error = e.message;
        return payload;
    }
};

export const postMultiple = async (
    hostname = null,
    type = null,
    name = null,
    token = null,
    clientSide = false
) => {};

// group = "api/v1/image?genre=Group&fields=-images,-__v,-Key,-comments";
// folder = "api/v1/image?genre=Folder&fields=-folders";
