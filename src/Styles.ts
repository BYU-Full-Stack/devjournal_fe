import styled, { createGlobalStyle } from 'styled-components'

export const theme = {
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
