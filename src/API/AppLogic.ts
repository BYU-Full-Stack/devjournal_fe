import { POST, GET, DELETE, defaultReqOptions as options, PUT } from './index'
import { USER_STATE_TYPE } from '../store/reducers/user'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { userStateAction } from '../store/actions/user'
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
        throw err;
    }
}

export const getUsers = async (token: string = '') => {

    const customOptions: typeof options = { ...options };
    customOptions.headers.Authorization = `Bearer ${token}`;

    try {
        // @ts-ignore
        const { data: users = [] } = await GET(`${API_URL}${API_BASE}user/all`, customOptions);
        return users;
    } catch (err) {
        //    TODO: handle errors better than this
        console.log(err);
        return [];
    }
}

export const updateUser = async (username: string, field: string, updatedUser: USER_STATE_TYPE) => {
    const customOptions: typeof options = { ...options };
    customOptions.headers.Authorization = `Bearer ${updatedUser.token}`;

    try {
        await PUT(`${API_URL}${API_BASE}${username}/${field}`, updatedUser, customOptions);
    } catch (err) {
        //    TODO: handle errors better than this
        throw err;
    }
};

export const deleteUser = async (username: string, userId: string, token: string) => {
    const customOptions: typeof options = { ...options };
    customOptions.headers.Authorization = `Bearer ${token}`;

    try {
        await DELETE(`${API_URL}${API_BASE}${username}/${userId}`, customOptions);
    } catch (err) {
        //    TODO: handle errors better than this
        console.log(err.response.data);
        throw err;
    }
};


export const useUser = () => {
    const userState = useSelector((state: RootState) => state.userReducer);

    const dispatch = useDispatch();
    const setUser = (user: USER_STATE_TYPE) => {
        if (user.token) {
            window.localStorage.setItem('token', user.token);
        }
        dispatch(
            userStateAction(user)
        );
    }
    return [userState, setUser];
}