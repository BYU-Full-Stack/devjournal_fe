import { createGlobalStyle } from 'styled-components'

const theme = {
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
    'red-hover': '#fe8062'
}

export const GlobalStyles = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        background-color: ${theme['bg-dark']};
    }
`;
