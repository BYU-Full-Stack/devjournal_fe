import { USER_STATE_TYPE } from '../reducers/user'

export const USER_STATE = "USER_STATE";

export const userStateAction = (userState: USER_STATE_TYPE) => {
    return { type: USER_STATE, userState };
};