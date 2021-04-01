
import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { theme } from '../../Styles'

import Icon from '../Icon'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
type AlertProps = {
    text: string;
    dismissable?: boolean;
    timeout?: number;
    dismiss: Function;
    top: string;
    theme: string;
}

type StyledAlertProps = {
    visible?: boolean;
    top: string;
    themecol: string;
}

const StyledAlert = styled.div`
    position: absolute;
    transition: right .5s;
    right: ${({ visible = false }: StyledAlertProps) => visible ? '.5em' : '-50em'};
    font-size: 14px;
    background-color: ${theme['bg-dark']};
    color: ${theme['white']};
    min-width: 200px;
    max-width: 240px;
    height: 50px;
    padding: 1em;
    border-radius: 3px;
    z-index: 10;

    ${({ top = '' }: StyledAlertProps) => top && css`
            top: ${top};
        `}

    ${({ themecol = '' }: StyledAlertProps) => (themecol = (themecol === 'error') ? 'red-deep' : 'green-deep') && css`
        border: 2px solid ${theme[themecol]};
        box-shadow: ${theme[themecol]} 0px 0px 10px;
    `}
`;

const Alert: React.FC<AlertProps> = ({ text, dismissable = true, dismiss, timeout = 4, top = '', theme = 'error' }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // set isVisible to true 100 milliseconds later to achieve css transition
        setTimeout(() => setIsVisible(true), 100);

        // Using setTimeout agaian to achieve css transition
        setTimeout(() => setIsVisible(false), (timeout * 1000) - 200);
        setTimeout(() => dismiss(), timeout * 1000);
    }, []);

    const hide = () => {
        // Using setTimeout agaian to achieve css transition
        setIsVisible(false);
        setTimeout(dismiss, 100);
    };

    return <StyledAlert top={top} themecol={theme} visible={isVisible}>
        {text}
        {dismissable && <Icon hcolor={theme === 'success' ? 'green-deep' : 'red-deep'} position="absolute" top="1px" right="1px" fontSize="18px" icon={faTimes} onClick={hide} />}
    </StyledAlert>
}

export default Alert;