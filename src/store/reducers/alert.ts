import { ALERTS_STATE } from '../actions/alert'

export type ALERTS_STATE_TYPE = {
    alerts: ALERT_STATE_TYPE[];
};

export type ALERT_STATE_TYPE = {
    key: string;
    text: string;
    timeout?: number;
    dismissable?: boolean;
    theme?: string;
};

const alertState: ALERTS_STATE_TYPE = {
    alerts: []
};

type ACTION_TYPE = {
    type: string;
    alertsState: ALERTS_STATE_TYPE;
};

const alertReducer = (state = alertState, action: ACTION_TYPE) => {
    switch (action.type) {
        case ALERTS_STATE:
            return { ...state, ...action.alertsState };
        default:
            return state;
    }
};

export default alertReducer;