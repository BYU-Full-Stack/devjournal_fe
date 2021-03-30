import { ALERTS_STATE_TYPE } from '../reducers/alert'

export const ALERTS_STATE = "ALERTS_STATE";

export const alertsStateAction = (alertsState: ALERTS_STATE_TYPE) => {
    return { type: ALERTS_STATE, alertsState };
};