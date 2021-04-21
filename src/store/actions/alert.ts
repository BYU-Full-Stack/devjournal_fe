import { ALERT_STATE_TYPE } from '../reducers/alert'

export const ADD_ALERT = "ADD_ALERT";
export const GET_ALERTS = "GET_ALERTS";
export const DELETE_ALERT = "DELETE_ALERT";

export const addAlertAction = (alert: ALERT_STATE_TYPE) => {
    return { type: ADD_ALERT, alert };
};

export const getAlertsAction = () => {
    return { type: GET_ALERTS }
}

export const deleteAlertAction = ({ id, alerts }: { id: string, alerts: ALERT_STATE_TYPE[] }) => {
    return { type: DELETE_ALERT, id, alerts }
}