import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'
import { theme } from '../Styles'

import {
    IconProp,
    SizeProp
} from '@fortawesome/fontawesome-svg-core'

type props = {
    icon: IconProp;
    size?: SizeProp;
    onClick?: MouseEventHandler<any>;
}

type IconStyleProps = {
    vAlign?: string;
    hcolor?: string;
    margin?: string;
    color?: string;

    fontSize?: string;
    position?: string;
    left?: string;
    right?: string;
    top?: string;
};

const StyledIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
    vertical-align: ${({ vAlign = 'middle' }: IconStyleProps) => vAlign};
    margin: ${({ margin = '0 4px' }: IconStyleProps) => margin};
    transition: color .3s ease-out;
    color: ${({ color = 'white' }: IconStyleProps) => theme[color]};
    
    &:hover {
        color: ${({ hcolor = 'orange-deep' }: IconStyleProps) => theme[hcolor]};
    }

    ${({ fontSize = '' }: IconStyleProps) => fontSize && css`
            font-size: ${fontSize};
        `}

    ${({ position = '' }: IconStyleProps) => position && css`
            position: ${position};
        `}
    ${({ top = '' }: IconStyleProps) => top && css`
            top: ${top};
        `}
    ${({ right = '' }: IconStyleProps) => right && css`
            right: ${right};
        `}
`;

export default function Icon({ icon, color = 'white', size = '2x', onClick = (() => null), ...rest }: props & IconStyleProps) {
    return <StyledIcon icon={icon} color={color} size={size} onClick={onClick} {...rest} />;
};