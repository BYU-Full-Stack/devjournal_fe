import { ADD_ALERT, DELETE_ALERT } from '../actions/alert'

export type ALERT_STATE_TYPE = {
    id: string;
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
    id?: string;
};

const alertReducer = (state = alertState, action: ACTION_TYPE) => {
    switch (action.type) {
        case ADD_ALERT:
            return [...state, action.alert];
        case DELETE_ALERT:
            return state.filter(({ id }: ALERT_STATE_TYPE) => id !== action.id)
        default:
            return state;
    }
};

export default alertReducer;