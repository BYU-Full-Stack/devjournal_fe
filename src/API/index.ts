import axios from 'axios'

type options = {
    headers: {
        'Content-Type': string,
        'Authorization'?: string
    };
}
export const defaultReqOptions: options = {
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

export const GET = async (url = "", options = defaultReqOptions) => {
    try {
        return await axios.get(url, options);
    } catch (err) {
        //    TODO: handle errors better than this
        console.log(err.toString());
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