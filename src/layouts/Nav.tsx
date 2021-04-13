import { FlexContainer, FlexCol } from '../Styles'
import { theme, StyledLink } from '../Styles'
import styled from 'styled-components'
import logo from '../logo.svg';

const StyledLogo = styled.img`
    max-width: 50px;
    height: auto;
    margin: 4px;
`;

const LogoText = styled.h1`
    font-family: 'Dancing Script', cursive;
    position: absolute;
    margin-top: -3em;
    top: 3.5em;
    text-align: center;
    left: .6em;
    color: ${theme['black']};
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${theme['black']};;
`;

export default function Nav() {
    return (
        <FlexContainer>
            <FlexCol width='100px'><StyledLogo src={logo} /><LogoText>Dev<br></br>Journal</LogoText></FlexCol>
            <FlexCol>
                <StyledLink to="/">Home</StyledLink>
                <StyledLink to="/about">About</StyledLink>
                <StyledLink to="/journals">Journals</StyledLink>
                <StyledLink to="/account">User Details</StyledLink>
                <StyledLink to="/user">All Users</StyledLink>
                <StyledLink to="/register">Register</StyledLink>
            </FlexCol>

        </FlexContainer>
    );
}