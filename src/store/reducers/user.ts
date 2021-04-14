import { USER_STATE } from '../actions/user'

export type USER_STATE_TYPE = {
    username: string;
    password?: string;
    token?: string;
    email?: string;
    role?: string;
    created_date?: string;
    user_id?: string;
    updatedUsername?: string;
};

const userState: USER_STATE_TYPE = {
    username: window.localStorage.getItem('username') || '',
    token: window.localStorage.getItem('token') || '',
    email: '',
    created_date: '',
    user_id: ''
};

type ACTION_TYPE = {
    type: string;
    userState: USER_STATE_TYPE
};

const userReducer = (state = userState, action: ACTION_TYPE) => {
    switch (action.type) {
        case USER_STATE:
            return { ...state, ...action.userState };
        default:
            return state;
    }
};

export default userReducer;