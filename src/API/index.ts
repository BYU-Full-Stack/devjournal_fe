import axios from 'axios'

export const defaultReqOptions = {
    headers: {
        'Content-Type': 'application/json'
    },
};

export const POST = async (url = "", body = {}, options = defaultReqOptions) => {
    try {
        return await axios.post(url, body, options);
    } catch (err) {
        //    TODO: handle errors better than this
        console.log(err);
        throw err;
    }
};

export const PUT = async (url = "", body = {}, options = defaultReqOptions) => {
    try {
        return await axios.put(url, body, options);
    } catch (err) {
        //    TODO: handle errors better than this
        console.log(err);
        throw err;
    }
};

export const GET = async (url = "") => {
    try {
        return await axios.get(url);
    } catch (err) {
        //    TODO: handle errors better than this
        console.log(err);
        throw err;
    }
};


export const DELETE = async (url = "") => {
    try {
        return await axios.delete(url);
    } catch (err) {
        //    TODO: handle errors better than this
        console.log(err);
        throw err;
    }
};