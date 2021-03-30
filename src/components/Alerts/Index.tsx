
import { ALERT_STATE_TYPE } from '../../store/reducers/alert'
import { useDispatch, useSelector } from 'react-redux'
import { alertsStateAction } from '../../store/actions/alert'
import { RootState } from '../../store'

import Alert from './Alert'
import { useCallback } from 'react'

const Alerts = () => {
    const alertsState = useSelector((state: RootState) => state.alertsReducer);
    const dispatch = useDispatch();

    const removeAlert = useCallback((key: string) => {
        const index = alertsState.alerts.findIndex(({ key: alertKey }: ALERT_STATE_TYPE) => alertKey === key);
        dispatch(
            alertsStateAction({
                alerts: [...alertsState.alerts.slice(0, index), ...alertsState.alerts.slice(index + 1)]
            })
        )
    }, [alertsState.alerts]);

    return (
        <>
            {
                alertsState.alerts.map(({ text, timeout, dismissable, key, theme = 'error' }: ALERT_STATE_TYPE, idx: number) =>
                    <Alert top={`${50 * (idx + 1) + 50 * (idx)}px`} theme={theme} text={text} key={idx} timeout={timeout} dismissable={dismissable} dismiss={() => removeAlert(key)} />)
            }
        </>
    )
}

export default Alerts;