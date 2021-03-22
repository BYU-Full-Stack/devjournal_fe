import { POST, GET, defaultReqOptions as options, PUT } from './index'
import { USER_STATE_TYPE } from '../store/reducers/user'
const { REACT_APP_API_DOMAIN: API_URL, REACT_APP_API_BASE_PATH: API_BASE } = process.env;


export const login = async (user: USER_STATE_TYPE) => {
    try {
        const { headers: {
            authorization: auth = 'Bearer '
        } = {} } = await POST(`${API_URL}login`, user);
        return auth;
    } catch (err) {
        //    TODO: handle errors better than this
        console.log(err);
    }
};

export const getUser = async (username: string = '', token: string = '') => {

    const customOptions: typeof options = { ...options };
    customOptions.headers.Authorization = `Bearer ${token}`;

    try {
        // @ts-ignore
        const { data: { email, created_date, user_id, password } = {} } = await GET(`${API_URL}${API_BASE}${username}`, customOptions);
        return { email, created_date, user_id, password };
    } catch (err) {
        //    TODO: handle errors better than this
        console.log(err);
    }
}

export const updateUser = async (user: USER_STATE_TYPE, token: string = '') => {
    const customOptions: typeof options = { ...options };
    customOptions.headers.Authorization = `Bearer ${token}`;

    try {
        const resp = await PUT(`${API_URL}${API_BASE}${user.username}`, {
            ...user, password: `pass${user.username}`
        }, customOptions);
        console.log('update resp', resp);
    } catch (err) {
        //    TODO: handle errors better than this
        console.log(err);
    }
};
