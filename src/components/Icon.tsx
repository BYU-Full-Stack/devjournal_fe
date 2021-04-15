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
    spin?: boolean;
    testid?: string;
}

type IconStyleProps = {
    vAlign?: string;
    hcolor?: string;
    margin?: string;
    color?: string;
    paddingLeft?: string;

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
    padding-left: ${({ paddingLeft = 'unset' }: IconStyleProps) => paddingLeft};
    transition: color .3s ease-out;
    color: ${({ color = 'white' }: IconStyleProps) => theme[color]};
    z-index: 1;

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

export default function Icon({ icon, color = 'white', hcolor = undefined, size = '2x', onClick = (() => null), spin = false, testid, ...rest }: props & IconStyleProps) {
    return <StyledIcon hcolor={hcolor} icon={icon} color={color} size={size} onClick={onClick} spin={spin} data-testid={testid} {...rest} />;
};