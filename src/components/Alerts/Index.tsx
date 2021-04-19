
import { ALERT_STATE_TYPE } from '../../store/reducers/alert'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAlertAction } from '../../store/actions/alert'
import { RootState } from '../../store'

import Alert from './Alert'

import styled from 'styled-components'

const AlertsContainer = styled.section`
    overflow-x: hidden;
    z-index: -1000;
`;


const Alerts = () => {
    const alerts = useSelector((state: RootState) => state.alertsReducer);
    const dispatch = useDispatch();

    const removeAlert = (id: string) => {

        dispatch(
            deleteAlertAction({ id, alerts })
        )
    };

    return (
        <AlertsContainer>
            {
                // @ts-ignore
                alerts.map(({ id, ...rest }: ALERT_STATE_TYPE, idx: number) =>
                    <Alert
                        top={`${50 * (idx + 1) + 50 * (idx)}px`}
                        key={idx}
                        id={id}
                        dismiss={() => removeAlert(id)}
                        {...rest}
                    />
                )
            }
        </AlertsContainer>
    )
}

export default Alerts;