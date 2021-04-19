
import React from 'react'
import { StyleProps, theme } from '../../Styles'
import styled from 'styled-components'

const SyledButton = styled.button`
    border-radius: 4px;
    background-color: ${({ bgColor = 'bg-dark' }: StyleProps) => theme[bgColor]};
    color: ${({ color = 'white' }: StyleProps) => theme[color]};
    border: ${({ border = 'transparent 2px solid' }: StyleProps) => border};
    width: ${({ width = 'unset' }: StyleProps) => width};
    padding: ${({ padding = '.4em 1em' }: StyleProps) => padding};
    transition: all .4s ease-out;
    cursor: pointer;
    &:hover {
        border: ${({ hoverBorder = 'turq 2px solid' }: StyleProps) => {
        const borderParts = hoverBorder.split(' ');
        return hoverBorder ? `${theme[borderParts[0]]} ${borderParts[1]} ${borderParts[2]}` : '';
    }}
    }
    :disabled {
        border-color: ${theme['red-deep']};
        color: ${theme['white']};
        cursor: not-allowed;
    }
`;

const Button = (props: StyleProps & React.HTMLProps<HTMLButtonElement>, ref: React.Ref<HTMLButtonElement>) => {
    const { children, ...rest } = props;
    return <SyledButton ref={ref}>dd</SyledButton>
};

export default React.forwardRef<HTMLButtonElement>(Button);