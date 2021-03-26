import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { theme } from '../Styles'

import {
    IconProp,
    SizeProp
} from '@fortawesome/fontawesome-svg-core'

type props = {
    icon: IconProp;
    color?: string;
    size?: SizeProp;
    hColor?: string;
    onClick?: MouseEventHandler<any>;
}

type PointerElementProps = {
    vAlign?: string;
    hColor?: string;
    margin?: string;
    color?: string;
};

const StyledIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
    vertical-align: ${({ vAlign = 'middle' }: PointerElementProps) => vAlign};
    margin: ${({ margin = '0 4px' }: PointerElementProps) => margin};
    transition: color .3s ease-out;
    color: ${({ color = 'white' }: PointerElementProps) => theme[color]};
    &:hover {
        color: ${({ hColor = 'orange-deep' }: PointerElementProps) => theme[hColor]};
    }
`;


export default function Icon({ icon, color = 'white', hColor = undefined, size = '2x', onClick = (() => null) }: props) {
    return <StyledIcon hColor={hColor} icon={icon} color={color} size={size} onClick={onClick} />;
};