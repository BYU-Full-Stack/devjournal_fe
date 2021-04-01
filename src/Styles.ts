import styled, { createGlobalStyle } from 'styled-components'

export const theme: { [key: string]: string } = {
    'bg-dark': '#212121',
    'black': '#121212',
    'purple': '#bf91f6',
    'orange-deep': '#fd8e32',
    'orange-hover': '#ffdcb7',
    'green-deep': '#00b589',
    'green-hover': '#b5eadb',
    'blue-deep': '#4657ce',
    'blue-hover': '#a4ade9',
    'turq': '#21bdca',
    'turq-hover': '#b3eced',
    'red-deep': '#fc4422',
    'red-hover': '#fe8062',
    'white': '#f7f7f7',
    'gray-light': '#e5e5e5'
};

export const GlobalStyles = createGlobalStyle`          

    body {
        background-color: ${theme['bg-dark']};
        
        font-family: 'Roboto', sans-serif;
        // font-family: 'Satisfy', cursive;
        // font-family: 'Playball', cursive;
        // font-family: 'Dancing Script', cursive;
        // font-family: 'Lobster', cursive;
        
        // font-family: 'Ubuntu', sans-serif;
        // font-family: 'Open Sans', sans-serif;
    }

    html, body {
        min-height: 100% !important;
        height: 100%;
        overflow-x: hidden;
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
    xOverflow?: string;
    height?: string;
    align?: string;
};

export const FlexContainer = styled.section`
    display: flex;
    flex-wrap: ${(props: StyleProps) => props.wrap || 'no-wrap'};
    flex-direction: ${(props: StyleProps) => props.direction || 'row'};
    margin: ${({ margin = '0' }: StyleProps) => margin};
    justify-content: ${({ justify = 'flex-start' }: StyleProps) => justify};
    color: ${({ color = theme['white'] }: StyleProps) => color};
    height: ${({ height = '100%' }: StyleProps) => height};
`;

export const FlexCol = styled.section`
    width: ${(props: StyleProps) => props.width || ''};
    justify-content: ${(props: StyleProps) => props.justify || 'flex-start'};
    max-width: ${({ maxWidth = '' }: StyleProps) => maxWidth};
    margin: ${({ margin = 'none' }: StyleProps) => margin};
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
    text-align: ${({ align = 'left' }: StyleProps) => align};
`;

export const PrettyH2 = styled(H2)`
    font-family: 'Dancing Script', cursive;
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
    :disabled {
        border-color: ${theme['red-deep']};
        color: ${theme['white']};
        cursor: not-allowed;
    }
`;