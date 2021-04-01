import { ADD_ALERT, DELETE_ALERT } from '../actions/alert'

export type ALERT_STATE_TYPE = {
    key: string;
    text: string;
    timeout?: number;
    dismissable?: boolean;
    theme?: string;
};

const alertState: ALERT_STATE_TYPE[] = [];

type ACTION_TYPE = {
    type: string;
    alert?: ALERT_STATE_TYPE;
    alerts?: ALERT_STATE_TYPE[];
    key?: string;
};

const alertReducer = (state = alertState, action: ACTION_TYPE) => {
    switch (action.type) {
        case ADD_ALERT:
            return [...state, action.alert];
        case DELETE_ALERT:
            return state.filter(({ key }: ALERT_STATE_TYPE) => key !== action.key)
        default:
            return state;
    }
};

export default alertReducer;