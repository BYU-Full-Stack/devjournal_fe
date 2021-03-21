import styled, { createGlobalStyle, css } from 'styled-components'

export const theme: { [key: string]: string } = {
    'bg-dark': '#212121',
    'black': '#121212',
    'purple': '#bf91f6',
    'orange-deep': '#fd8e32',
    'orange-hover': '#ffdcb7',
    'green-deep': '#00b589',
    'green-hover': '#ffdcb7',
    'blue-deep': '#4657ce',
    'blue-hover': '#a4ade9',
    'turq': '#21bdca',
    'turq-hover': '#fe8062',
    'red-deep': '#fc4422',
    'red-hover': '#fe8062',
    'white': '#f7f7f7'
};

export const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
            // font-family: 'Open Sans', sans-serif;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;800&family=Roboto+Mono:wght@200&display=swap');
            // font-family: 'Roboto Mono', monospace;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;800&family=Roboto+Mono:wght@200&family=Ubuntu:wght@500&display=swap');
            // font-family: 'Ubuntu', sans-serif;

    body {
        background-color: ${theme['bg-dark']};
        font-family: 'Roboto Mono', monospace;
    }

    html, body {
        min-height: 100% !important;
        height: 100%;
        
    }

`;

export const Navbar = styled.section`
    div {
        border-bottom: 3px ${theme['purple']} solid;
        color: ${theme['purple']}
    }
`;

export type StyleProps = {
    color?: string;
    bgColor?: string;
    width?: string;
    maxWidth?: string;
    justify?: string;
    wrap?: string;
    direction?: string;
    display?: string;
    variant?: string;
    margin?: string;
    padding?: string;
    border?: string;
    hoverBorder?: string;
};

export const FlexContainer = styled.section`
    display: flex;
    flex-wrap: ${(props: StyleProps) => props.wrap || 'no-wrap'};
    flex-direction: ${(props: StyleProps) => props.direction || 'row'};
    margin: ${({ margin = '0' }: StyleProps) => margin};
    justify-content: ${({ justify = 'flex-start' }: StyleProps) => justify};
`;

export const FlexCol = styled.section`
    width: ${(props: StyleProps) => props.width || ''};
    justify-content: ${(props: StyleProps) => props.justify || 'flex-start'};
    maxWidth: ${({ maxWidth = '' }: StyleProps) => maxWidth};
`;

export const Input = styled.input`  
    font-family: inherit;
    font-size: 16px;
    border-radius: 0 0 4px 4px;
    height: 1.75rem;
    // min-width: 300px;
    color: ${theme['bg-dark']};
    outline: none;
    padding: 3px 3px 0 6px;
    border: none;
    border-bottom: ${theme['turq']} solid 3px;
`;

export const H1 = styled.h1`
    display: ${({ display = 'block' }: StyleProps) => display}; 
    color: ${({ color = 'white' }: StyleProps) => theme[color]};
`;

export const H2 = styled.h2`
    display: ${({ display = 'block' }: StyleProps) => display}; 
    color: ${({ color = 'white' }: StyleProps) => theme[color]};
`;

export const H3 = styled.h3`
    display: ${({ display = 'block' }: StyleProps) => display}; 
    color: ${({ color = 'white' }: StyleProps) => theme[color]};
`;

export const Button = styled.button`
    border-radius: 4px;
    background-color: ${({ bgColor = 'bg-dark' }: StyleProps) => theme[bgColor]};
    color: ${({ color = 'white' }: StyleProps) => theme[color]};
    border: ${({ border = 'none' }: StyleProps) => border};
    width: ${({ width = 'unset' }: StyleProps) => width};
    padding: ${({ padding = 'unset' }: StyleProps) => padding};
    transition: all .4s ease-out;
    cursor: pointer;
    &:hover {
        border: ${({ hoverBorder = '' }: StyleProps) => {
        const borderParts = hoverBorder.split(' ');
        return hoverBorder ? `${theme[borderParts[0]]} ${borderParts[1]} ${borderParts[2]}` : '';
    }}
    }
`;