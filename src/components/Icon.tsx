import { KeyboardEventHandler } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MouseEventHandler } from 'react'
import styled, { css } from 'styled-components'
import { theme } from '../Styles'
import { watchButtonPress, KeyDownData } from '../API/AppLogic'

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
    tabindex?: number | undefined;
    keyDownData?: KeyDownData;
}

type IconStyleProps = {
    vertalign?: string;
    hcolor?: string;
    margin?: string;
    color?: string;
    paddingleft?: string;

    fontSize?: string;
    position?: string;
    left?: string;
    right?: string;
    top?: string;
};

const StyledIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
    vertical-align: ${({ vertalign = 'middle' }: IconStyleProps) => vertalign};
    margin: ${({ margin = '0 4px' }: IconStyleProps) => margin};
    padding-left: ${({ paddingleft = 'unset' }: IconStyleProps) => paddingleft};
    transition: color .3s ease-out;
    color: ${({ color = 'white' }: IconStyleProps) => theme[color]};
    z-index: 1;

    &:hover,:focus {
        color: ${({ hcolor = 'orange-deep' }: IconStyleProps) => theme[hcolor]};
    }
    &:focus {
        outline: none;
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

export default function Icon({ icon, color = 'white', keyDownData, tabindex = -1, hcolor = undefined, size = '2x', onClick = (() => null), spin = false, testid, ...rest }: props & IconStyleProps) {
    // @ts-ignore
    return <StyledIcon tabIndex={tabindex} onKeyPress={(e: KeyboardEventHandler) => (tabindex > -1) && watchButtonPress(e, keyDownData)} hcolor={hcolor} icon={icon} color={color} size={size} onClick={onClick} spin={spin} data-testid={testid} {...rest} />;
};