import { USER_STATE } from '../actions/user'

export type USER_STATE_TYPE = {
    username: string;
    token: string;
};

const userState = {
    username: '',
    token: ''
};

type ACTION_TYPE = {
    type: string;
};

const userReducer = (state = userState, action: ACTION_TYPE) => {
    switch (action.type) {
        case USER_STATE:
            // @ts-ignore
            return { ...state, ...action.userState };
        default:
            return state;
    }
};

export default userReducer;